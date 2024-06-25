import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from 'utils/fireStore';
import * as Yup from 'yup';
import { Notify } from 'notiflix';
import { useAuth } from 'hooks/useAuth';
import { addContact } from 'redux/contacts/operations';
import CustomSelect from 'components/CustomSelect/CustomSelect';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import css from './ContactForm.module.css';

const validationSchema = Yup.object().shape({
  avatar: Yup.string(),
  firstName: Yup.string().required("* it's a required field"),
  middleName: Yup.string(),
  lastName: Yup.string().required("* it's a required field"),
  jobTitle: Yup.string(),
  company: Yup.string(),
  phone: Yup.string().required("* it's a required field"),
  email: Yup.string(),
  birthday: Yup.string(),
  note: Yup.string(),
  groups: Yup.array().default([]),
  tags: Yup.array().default([]),
});

const initialValues = {
  avatar: '',
  firstName: '',
  middleName: '',
  lastName: '',
  jobTitle: '',
  company: '',
  phone: '',
  email: '',
  birthday: '',
  note: '',
  groups: [],
  tags: [],
};

export default function ContactForm({
  onClose,
  owner,
  contact = {},
  userGroups,
  userTags,
}) {
  const [avatarURL, setAvatarURL] = useState('');
  const [fileName, setFileName] = useState('');
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleFiles = e => {
    const selectedFile = e.target.files[0];

    if (selectedFile.size < 10000000) {
      const name = selectedFile.name;
      const storageRef = ref(storage, `avatars/${owner}/${name}`);
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
    const newContact = { ...values, avatar: avatarURL, owner: user.id };
    dispatch(addContact(newContact));
    resetForm();
    onClose();
  };

  return (
    <div className={css.formWrapper}>
      <div className={css.formHeader}>
        <h3>Add New Contact</h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form
            className={css.form}
            name="addContactForm"
            id="addContactForm"
            autoComplete="off"
          >
            <fieldset
              className={`${css.formField} ${css.avatarField}`}
              form="addContactForm"
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
              form="addContactForm"
              name="name"
              role="group"
            >
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                />
                <ErrorMessage name="firstName">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="middleName"
                  placeholder="Middle name"
                />
                <ErrorMessage name="middleName">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                />
                <ErrorMessage name="lastName">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
            </fieldset>
            <fieldset
              className={css.formField}
              form="addContactForm"
              name="job"
              role="group"
            >
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="jobTitle"
                  placeholder="Position"
                />
                <ErrorMessage name="jobTitle">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="company"
                  placeholder="Company name"
                />
                <ErrorMessage name="company">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
            </fieldset>
            <fieldset
              className={css.formField}
              form="addContactForm"
              name="contacts"
              role="group"
            >
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="phone"
                  placeholder="Phone"
                />
                <ErrorMessage name="phone">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
            </fieldset>
            <fieldset
              className={css.formField}
              form="addContactForm"
              name="attributes-1"
              role="group"
            >
              <label className={css.formLabel}>
                <Field className={css.formInput} type="date" name="birthday" />
                <ErrorMessage name="birthday">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  as="textarea"
                  name="note"
                  placeholder="Note"
                  rows={7}
                />
                <ErrorMessage name="note">
                  {message => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
            </fieldset>
            <fieldset
              className={css.formField}
              form="addContactForm"
              name="attributes-2"
              role="group"
            >
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  name="groups"
                  component={CustomSelect}
                  placeholder="Select group..."
                  valuesList={userGroups}
                />
              </label>
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  name="tags"
                  component={CustomSelect}
                  placeholder="Select tag..."
                  valuesList={userTags}
                />
              </label>
            </fieldset>
            <button className={css.formBtn} type="submit">
              {contact.id ? 'Update Contact' : 'Add contact'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
