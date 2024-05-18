// checkDocumentExists.ts
import { db } from "@/lib/firebase/client";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Conditions {
  [field: string]: any;
}

const checkFieldExists = async (
  collectionName: string,
  obj?: Conditions
): Promise<boolean> => {
  if (!obj) return false;

  const arr = Object.entries(obj)[0];
  if (!arr.length) return false;

  const q = query(collection(db, collectionName), where(arr[0], "==", arr[1]));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export default checkFieldExists;
