import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';
import { Notify } from 'notiflix';

export default async function addFileToStorage(e, folder, owner) {
  const selectedFile = e.target.files[0];

  if (selectedFile.size < 10000000) {
    const name = selectedFile.name;
    const storageRef = ref(storage, `${folder}/${owner}/${name}`);
    uploadBytesResumable(storageRef, selectedFile).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) => {
        return { url, name };
        // setAvatarURL(url);
        // setFileName(name);
      })
    );
          
          // setAvatarURL(url);
          // setFileName(name);
    //     });
    //   }
    // );
  } else {
    Notify.failure(
      `Зображення ${selectedFile.name} занадто велике, оберіть інше зображення`
    );
  }
}
