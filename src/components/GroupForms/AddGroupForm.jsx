import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from 'utils/firebaseConfig';
import * as Yup from 'yup';
import { Notify } from 'notiflix';
import { useAuth } from 'hooks/useAuth';
import { addGroup } from 'redux/groups/operations';
import CustomSelect from 'components/CustomSelect/CustomSelect';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import css from './AddGroupForm.module.css';

const validationSchema = Yup.object().shape({
  avatar: Yup.string(),
  name: Yup.string().required("* it's a required field"),
  description: Yup.string(),
  members: Yup.array().default([]),
});

let initialValues = {
  avatar: '',
  name: '',
  description: '',
  members: [],
};

export default function AddGroupForm({ onClose, owner, contacts }) {
  const [avatarURL, setAvatarURL] = useState('');
  const [fileName, setFileName] = useState('');
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleFiles = async e => {
    const selectedFile = e.target.files[0];

    if (selectedFile.size < 10000000) {
      const name = selectedFile.name;
      const storageRef = ref(storage, `groups/${owner}/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            setAvatarURL(url);
            setFileName(name);
          });
        }
      );
    } else {
      Notify.failure(
        `Зображення ${selectedFile.name} занадто велике, оберіть інше зображення`
      );
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    const selectedMembers = values.members.map(
      member =>
        contacts.find(
          contact =>
            contact.firstName === member.split(' ')[0] &&
            contact.lastName === member.split(' ')[1]
        ).id
    );
    const newGroup = {
      ...values,
      avatar: avatarURL,
      owner: user.id,
      members: selectedMembers,
    };
    console.log(newGroup);
    const result = dispatch(addGroup(newGroup));
    // console.log(result);
    // result.then(data=> addGroups).catch(err=> console.log(err))

  };

  return (
    <div className={css.formWrapper}>
      <div className={css.formHeader}>
        <h3>Add New Group</h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form
            className={css.form}
            name="addGroupForm"
            id="addGroupForm"
            autoComplete="off"
          >
            <fieldset
              className={`${css.formField} ${css.avatarField}`}
              form="addGroupForm"
              name="avatar"
              role="group"
            >
              <label className={`${css.formLabel} ${css.avatarLabel}`}>
                {avatarURL ? (
                  <Avatar
                    src={avatarURL}
                    alt={fileName}
                    className={css.avatarPreview}
                  />
                ) : (
                  <AddPhotoAlternateIcon className={css.avatarIcon} />
                )}
                <Field
                  className={`${css.formInput} ${css.visuallyHidden}`}
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFiles}
                />
              </label>
              <div>
                {avatarURL && (
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => setAvatarURL('')}
                  >
                    Remove image
                  </Button>
                )}
              </div>
            </fieldset>
            <fieldset
              className={css.formField}
              form="addGroupForm"
              name="mainInfo"
              role="group"
            >
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage name="name">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="description"
                  placeholder="Description"
                />
                <ErrorMessage name="description">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  name="members"
                  component={CustomSelect}
                  placeholder="Select contacts..."
                  valuesList={contacts}
                />
              </label>
            </fieldset>
            <button className={css.formBtn} type="submit">
              Add group
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
