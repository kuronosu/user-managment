import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export async function createUser(user) {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    return docRef.id;
  } catch (e) {
    throw e;
  }
}

export function observeUsers(next, error) {
  return onSnapshot(query(collection(db, "users"), orderBy("firstName")), {
    next: (querySnapshot) =>
      next(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
    complete: () => console.log("complete"),
    error: error,
  });
}

export async function updateUser(id, user) {
  try {
    await updateDoc(doc(db, "users", id), user);
  } catch (e) {
    throw e;
  }
}

export async function deleteUser(id) {
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (e) {
    throw e;
  }
}
