import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  // deleteObject,
} from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";
import * as Yup from "yup";
import { Notify } from "notiflix";
import { useAuth } from "../../hooks/useAuth";
import { addContact } from "../../redux/contacts/operations";
import { updateGroup } from "../../redux/groups/operations";
import { updateTag } from "../../redux/tags/operations";
// import addFileToStorage from "../../utils/addFileTostorage";
import removeFileFromStorage from "../../utils/removeFileFromStorage";
import CustomSelect from "../CustomSelect/CustomSelect";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import css from "./AddContactForm.module.css";

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

let initialValues = {
  avatar: "",
  firstName: "",
  middleName: "",
  lastName: "",
  jobTitle: "",
  company: "",
  phone: "",
  email: "",
  birthday: "",
  note: "",
  groups: [],
  tags: [],
};

export default function AddContactForm({ onClose, userGroups, userTags }) {
  const [avatarURL, setAvatarURL] = useState("");
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const { user } = useAuth();

  async function addAvatar(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile.size < 10000000) {
      const name = selectedFile.name;
      const storageRef = ref(storage, `contactAvatars/${user.id}/${name}`);
      uploadBytesResumable(storageRef, selectedFile).then((snapshot) =>
        getDownloadURL(snapshot.ref).then((url) => {
          setAvatarURL(url);
          setFileName(name);
        })
      );
    } else {
      Notify.failure(
        `Зображення ${selectedFile.name} занадто велике, оберіть інше зображення`
      );
    }
    // const avatarProps = await addFileToStorage(e, "contactAvatars", user.id);
    // if (avatarProps?.url) {
    //   setAvatarURL(avatarProps.url);
    //   setFileName(avatarProps.name);
    // }
  }

  function deleteAvatar() {
    removeFileFromStorage("contactAvatars", user.id, fileName);
    setAvatarURL("");
    setFileName("");
  }

  async function handleSubmit(values, { resetForm }) {
    const selectedGroups = values.groups.map(
      (selectedValue) =>
        userGroups.find((group) => group.name === selectedValue).id
    );
    const selectedTags = values.tags.map(
      (selectedValue) => userTags.find((tag) => tag.name === selectedValue).id
    );

    const newContact = {
      ...values,
      avatar: {
        url: avatarURL,
        name: fileName,
      },
      owner: user.id,
      groups: selectedGroups,
      tags: selectedTags,
    };

    await dispatch(addContact(newContact))
      .then((result) => updateContactAttributes(result.payload))
      .catch((err) => console.log(err));
    resetForm();
    onClose();
  }

  function updateContactAttributes(createdContact) {
    if (createdContact.groups.length > 0) {
      return createdContact.groups
        .map((groupId) => userGroups.find((group) => group.id === groupId))
        .map((targetGroup) =>
          dispatch(
            updateGroup({
              id: targetGroup.id,
              members: [...targetGroup.members, createdContact.id],
            })
          )
        );
    }
    if (createdContact.tags.length > 0) {
      return createdContact.tags
        .map((tagId) => userTags.find((tag) => tag.id === tagId))
        .map((targetTag) =>
          dispatch(
            updateTag({
              id: targetTag.id,
              members: [...targetTag.members, createdContact.id],
            })
          )
        );
    }
  }

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
                  onChange={addAvatar}
                />
              </label>
              <div>
                {avatarURL && (
                  <Button startIcon={<DeleteIcon />} onClick={deleteAvatar}>
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
