import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
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

export async function getUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (e) {
    throw e;
  }
}

export async function updateUser(id, user) {
  try {
    const docRef = await updateDoc(doc(db, "users", id), user);
    return docRef.id;
  } catch (e) {
    throw e;
  }
}

export async function deleteUser(id) {
  try {
    const docRef = await deleteDoc(doc(db, "users", id));
    return docRef.id;
  } catch (e) {
    throw e;
  }
}
