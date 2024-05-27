// useFirestore.ts
import { db } from "@/lib/firebase/client";
import { FilterType, SortByType } from "@/types/firebaseHook";
import { isNumberInput } from "@/utils/numbers";
import {
  CollectionReference,
  DocumentData,
  Query,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../useAuth";
import { OptionsType } from "@/types/field";

interface DataType {
  id?: string;
  name?: string;
  [key: string]: any;
}

const useFirestore = (
  collectionName: string,
  initialPageSize: number = 10,
  isData: boolean = false
) => {
  const { user, isPageLoading } = useAuth();
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const [allData, setAllData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [filters, setFilters] = useState<FilterType>({});
  const [sortBy, setSortBy] = useState<SortByType>({
    createdAt: "desc",
  });

  useEffect(() => {
    if (!isPageLoading && !user) {
      route.push("/signin");
    }
  }, [user, isPageLoading]);

  const returnQuery = (filters: { [key: string]: string | number }) => {
    let q:
      | Query<DocumentData, DocumentData>
      | CollectionReference<DocumentData, DocumentData> = collection(
      db,
      collectionName
    );

    for (const [field, value] of Object.entries(filters)) {
      if (!!value) {
        switch (field) {
          case "gender":
            q = query(q, where(field, "==", value));
            break;
          case "nameSearch":
            q = query(q, where(field, "array-contains", value));
            break;
          case "nameAndPhone":
            if (isNumberInput(value + "")) {
              q = query(
                q,
                where("phone", ">=", value),
                where("phone", "<=", value + "\uf8ff")
              );
            } else {
              q = query(q, where("nameSearch", "array-contains", value));
            }
            break;
          default:
            break;
        }
      }
    }

    return q;
  };

  // Calculate total number of pages
  const calculateTotalPages = async (
    filters: { [key: string]: string | number } = {}
  ) => {
    const q = returnQuery(filters);

    const countSnapshot = await getCountFromServer(q);
    const totalItems = countSnapshot.data().count;

    setTotalPages(Math.ceil(totalItems / pageSize));
  };

  const getDataSelected = async () => {
    let q = returnQuery({});
    q = query(q, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const docsData: OptionsType[] = querySnapshot.docs.map((doc) => ({
      value: doc.id,
      label: doc.data().name,
    }));
    return docsData;
  };

  // Fetch data from Firestore based on page number
  const getDocuments = async (
    page: number,
    filters: { [key: string]: string | number } = {}
  ) => {
    setLoading(true);
    try {
      const offset = (page - 1) * pageSize;

      let q = returnQuery(filters);
      const [fieldPath, directionStr] = Object.entries(sortBy)[0];
      q = query(q, orderBy(fieldPath, directionStr), limit(offset + pageSize));

      const querySnapshot = await getDocs(q);
      const docsData = querySnapshot.docs.slice(offset).map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllData(docsData);

      return docsData;
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Go to specific page
  const goToPage = (page: number) => {
    setCurrentPage(page);
    getDocuments(page);
  };

  // Add a new document
  const addDocument = async (data: DataType) => {
    try {
      const newData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addDoc(collection(db, collectionName), newData);
      calculateTotalPages(); // Recalculate total pages after adding a document
      setOpen(false);
      getDocuments(currentPage);
      toast.success("You added a document successfully");
      return newData;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Update an existing document
  const updateDocument = async (id: string, updatedData: Partial<DataType>) => {
    try {
      const newData = { ...updatedData, updatedAt: serverTimestamp() };
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, newData);
      getDocuments(currentPage);
      setOpen(false);
      toast.success("You updated a document successfully");
      return newData;
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      setAllData(allData.filter((item) => item.id !== id));
      calculateTotalPages(); // Recalculate total pages after deleting a document
      toast.success("You deleted a document successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // Get a document by ID
  const getDocumentById = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as DataType;
      } else {
        console.error("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      return null;
    }
  };

  useEffect(() => {
    if (totalPages > 0) {
      setCurrentPage((prev) => (prev > totalPages ? totalPages : prev));
    } else {
      setCurrentPage(1);
    }
  }, [totalPages]);

  useEffect(() => {
    calculateTotalPages(filters);
    if (isData) {
      getDocuments(currentPage, filters);
    }
  }, [collectionName, pageSize, currentPage, filters, sortBy]);

  return {
    allData,
    loading,
    addDocument,
    updateDocument,
    deleteDocument,
    setFilters,
    setPageSize,
    getDocuments,
    getDocumentById,
    open,
    setOpen,
    setSortBy,
    getDataSelected,
    setAllData,
    pagination: {
      goToPage,
      currentPage,
      totalPages,
    },
  };
};

export default useFirestore;
