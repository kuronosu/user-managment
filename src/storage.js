import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { storage } from "./firebase";

// const mountainsRef = ref(storage, 'images/mountains.jpg');

export async function uploadAvatar(id, file, prevAvatarUrl) {
  if (prevAvatarUrl) {
    await deleteImage(prevAvatarUrl);
  }
  const ext = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
  const storageRef = ref(storage, `avatares/${id}.${ext}`);
  const snapshot = await uploadBytes(storageRef, file);
  return [await getDownloadURL(snapshot.ref), snapshot.ref];
}

export async function deleteImage(url) {
  const storageRef = ref(storage, url);
  return await deleteObject(storageRef);
}
