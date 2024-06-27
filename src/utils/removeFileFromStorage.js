import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebaseConfig";

export default function removeFileFromStorage(folder, owner, fileName) {
  const storageRef = ref(storage, `${folder}/${owner}/${fileName}`);
  deleteObject(storageRef);
}
