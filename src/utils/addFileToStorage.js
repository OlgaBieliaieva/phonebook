import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { Notify } from "notiflix";

export default async function addFileToStorage(e, folder, owner, contact) {
  const selectedFile = e.target.files[0];
  let url = "";
  let name = "";

  if (selectedFile.size < 10000000) {
    const fileName = selectedFile.name;

    const storageRef = ref(
      storage,
      `${folder}/${owner}/${contact ? contact : fileName}`
    );
    await uploadBytesResumable(storageRef, selectedFile).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((fileUrl) => {
        url = fileUrl;
        name = fileName;
      })
    );

    return { url, name };
  } else {
    Notify.failure(`Image ${selectedFile.name} is too large, choose some else`);
  }
}
