import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Notify } from "notiflix";
import { useAuth } from "../../hooks/useAuth";
import { addGroup } from "../../redux/groups/operations";
import { updateContact } from "../../redux/contacts/operations";
import addFileToStorage from "../../utils/addFileTostorage";
import removeFileFromStorage from "../../utils/removeFileFromStorage";
import CustomSelect from "../CustomSelect/CustomSelect";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import css from "./AddGroupForm.module.css";

const validationSchema = Yup.object().shape({
  avatar: Yup.string(),
  name: Yup.string().required("* it's a required field"),
  description: Yup.string(),
  members: Yup.array().default([]),
});

let initialValues = {
  avatar: "",
  name: "",
  description: "",
  members: [],
};

export default function AddGroupForm({ onClose, owner, contacts }) {
  const [avatarURL, setAvatarURL] = useState("");
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const { user } = useAuth();
  const folderName = "groupAvatars";

  async function addAvatar(e) {
    const result = await addFileToStorage(e, folderName, user.id);
    setAvatarURL(result.url);
    setFileName(result.name);
  }

  function deleteAvatar() {
    removeFileFromStorage(folderName, user.id, fileName);
    setAvatarURL("");
    setFileName("");
  }

  async function handleSubmit(values, { resetForm }) {
    const selectedMembers = values.members.map(
      (member) =>
        contacts.find(
          (contact) =>
            contact.firstName === member.split(" ")[0] &&
            contact.lastName === member.split(" ")[1]
        ).id
    );
    const newGroup = {
      ...values,
      avatar: {
        url: avatarURL,
        name: fileName,
      },
      owner: user.id,
      members: selectedMembers,
    };

    await dispatch(addGroup(newGroup))
      .then((result) => updateContacts(result.payload))
      .then(() => Notify.success("New group successfully added"))
      .catch((err) => console.log(err));
    resetForm();
    onClose();
  }

  function updateContacts(createdGroup) {
    if (createdGroup.members.length > 0) {
      createdGroup.members
        .map((memberId) => contacts.find((contact) => contact.id === memberId))
        .map((targetContact) =>
          dispatch(
            updateContact({
              id: targetContact.id,
              groups: [...targetContact.groups, createdGroup.id],
            })
          )
        );
    }
  }

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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
                  {(message) => <p className={css.errorText}>{message}</p>}
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
