import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from 'utils/firebaseConfig';
import { Notify } from 'notiflix';

export default function addFileToStorage(e, folder, owner) {
  const selectedFile = e.target.files[0];

  if (selectedFile.size < 10000000) {
    const name = selectedFile.name;
    const storageRef = ref(storage, `${folder}/${owner}/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          return { url, name };
          // setAvatarURL(url);
          // setFileName(name);
        });
      }
    );
  } else {
    Notify.failure(
      `Зображення ${selectedFile.name} занадто велике, оберіть інше зображення`
    );
  }
}
