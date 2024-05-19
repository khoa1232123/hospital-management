// useFirestore.ts
import { db } from "@/lib/firebase/client";
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
import { useEffect, useState } from "react";
import { TableRow } from "@mui/material";

interface DataType {
  id?: string;
  name?: string;
  [key: string]: any;
}

interface KeyConfig {
  name: string;
  align: "left" | "right" | "center" | "inherit" | "justify";
}

const useFirestore = (
  collectionName: string,
  initialPageSize: number = 10,
  isData: boolean = false
) => {
  const [open, setOpen] = useState(false);
  const [allData, setAllData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [filters, setFilters] = useState<{ [key: string]: string | number }>(
    {}
  );

  // Calculate total number of pages
  const calculateTotalPages = async () => {
    let q:
      | Query<DocumentData, DocumentData>
      | CollectionReference<DocumentData, DocumentData> = collection(
      db,
      collectionName
    );
    for (const [field, value] of Object.entries(filters)) {
      q = query(
        q,
        where(field, ">=", value),
        where(field, "<=", value + "\uf8ff")
      );
    }

    const countSnapshot = await getCountFromServer(q);
    const totalItems = countSnapshot.data().count;
    setTotalPages(Math.ceil(totalItems / pageSize));
  };

  // Fetch data from Firestore based on page number
  const getDocuments = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * pageSize;
      let q:
        | Query<DocumentData, DocumentData>
        | CollectionReference<DocumentData, DocumentData> = collection(
        db,
        collectionName
      );
      for (const [field, value] of Object.entries(filters)) {
        q = query(
          q,
          where(field, ">=", value),
          where(field, "<=", value + "\uf8ff")
        );
      }
      q = query(q, orderBy("createdAt"), limit(offset + pageSize));

      const querySnapshot = await getDocs(q);
      const docsData = querySnapshot.docs
        .slice(offset)
        .map((doc) => ({ ...doc.data(), id: doc.id }));
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
      const docRef = await addDoc(collection(db, collectionName), newData);
      setAllData([...allData, { ...newData, id: docRef.id }]);
      calculateTotalPages(); // Recalculate total pages after adding a document
      setOpen(false);
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
      setAllData(
        allData.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );
      setOpen(false);
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
    calculateTotalPages();
    if (isData) {
      getDocuments(currentPage);
    }
  }, [collectionName, pageSize, currentPage, filters]);

  return {
    allData,
    loading,
    addDocument,
    updateDocument,
    deleteDocument,
    goToPage,
    currentPage,
    totalPages,
    setFilters,
    setPageSize,
    getDocuments,
    getDocumentById,
    open,
    setOpen,
  };
};

export default useFirestore;
