// useFirestore.ts
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  where,
  doc,
  getCountFromServer,
  Query,
  DocumentData,
  CollectionReference,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

interface DataType {
  id?: string;
  name?: string;
  [key: string]: any;
}

const useFirestore = (collectionName: string, initialPageSize: number = 10) => {
  const [data, setData] = useState<DataType[]>([]);
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
  const fetchData = async (page: number) => {
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
      setData(docsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Go to specific page
  const goToPage = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  // Add a new document
  const addDocument = async (newData: DataType) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...newData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setData([...data, { ...newData, id: docRef.id }]);
      calculateTotalPages(); // Recalculate total pages after adding a document
      console.log({ docRef });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Update an existing document
  const updateDocument = async (id: string, updatedData: Partial<DataType>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { ...updatedData, updatedAt: serverTimestamp() });
      setData(
        data.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      setData(data.filter((item) => item.id !== id));
      calculateTotalPages(); // Recalculate total pages after deleting a document
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  useEffect(() => {
    calculateTotalPages();
    fetchData(currentPage);
  }, [collectionName, pageSize, currentPage, filters]);

  return {
    data,
    loading,
    addDocument,
    updateDocument,
    deleteDocument,
    goToPage,
    currentPage,
    totalPages,
    setFilters,
    setPageSize,
  };
};

export default useFirestore;
