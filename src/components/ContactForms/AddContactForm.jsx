import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import { Notify } from "notiflix";
import { useAuth } from "../../hooks/useAuth";
import { addContact } from "../../redux/contacts/operations";
import { updateGroup } from "../../redux/groups/operations";
import { updateTag } from "../../redux/tags/operations";
import addFileToStorage from "../../utils/addFileToStorage";
import removeFileFromStorage from "../../utils/removeFileFromStorage";
import CustomSelect from "../CustomSelect/CustomSelect";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import AlternateEmailSharpIcon from "@mui/icons-material/AlternateEmailSharp";
import "react-phone-input-2/lib/material.css";
import css from "./AddContactForm.module.css";

const validationSchema = Yup.object().shape({
  avatar: Yup.string(),
  firstName: Yup.string().required("* it's a required field"),
  middleName: Yup.string(),
  lastName: Yup.string().required("* it's a required field"),
  position: Yup.string(),
  department: Yup.string(),
  company: Yup.string(),
  phones: Yup.array().of(
    Yup.object().shape({
      type: Yup.string(),
      number: Yup.string(),
    })
  ),
  emails: Yup.array().of(
    Yup.object().shape({
      type: Yup.string(),
      address: Yup.string(),
    })
  ),

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
  position: "",
  department: "",
  company: "",
  phones: [{ type: "", number: "" }],
  emails: [{ type: "", address: "" }],
  birthday: "",
  note: "",
  groups: [],
  tags: [],
};

export default function AddContactForm({ onClose, userGroups, userTags }) {
  const [avatarURL, setAvatarURL] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const folderName = "contactAvatars";

  async function addAvatar(e) {
    // const result = await addFileToStorage(e, folderName, user.id);
    // setAvatarURL(result.url);
    // setFileName(result.name);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarURL(reader.result); // Base64 URL для зображення
        setFileName(file.name); // Ім'я файлу для alt
      };

      reader.readAsDataURL(file);
    }
  }

  function deleteAvatar() {
    // removeFileFromStorage(folderName, user.id, fileName);
    // setAvatarURL("");
    // setFileName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setAvatarURL("");
    setFileName("");
  }

  async function handleSubmit(values, { resetForm }) {
    // const selectedGroups = values.groups.map(
    //   (selectedValue) =>
    //     userGroups.find((group) => group.name === selectedValue).id
    // );
    // const selectedTags = values.tags.map(
    //   (selectedValue) => userTags.find((tag) => tag.name === selectedValue).id
    // );

    // const newContact = {
    //   ...values,
    //   avatar: {
    //     url: avatarURL,
    //     name: fileName,
    //   },
    //   owner: user.id,
    //   groups: selectedGroups,
    //   tags: selectedTags,
    // };

    // await dispatch(addContact(newContact))
    //   .then((result) => updateContactAttributes(result.payload))
    //   .then(() => Notify.success("New contact successfully added"))
    //   .catch((err) => console.log(err));
    // resetForm();
    // onClose();
    console.log(values);
  }

  function updateContactAttributes(createdContact) {
    if (createdContact.groups.length > 0) {
      createdContact.groups
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
      createdContact.tags
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
        {({ values, setFieldValue }) => (
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
                  innerRef={fileInputRef}
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
                  name="position"
                  placeholder="Position"
                />
                <ErrorMessage name="position">
                  {(message) => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="department"
                  placeholder="Department"
                />
                <ErrorMessage name="department">
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
              <FieldArray name="phones">
                {({ remove, push }) => (
                  <>
                    {values.phones.length > 0 &&
                      values.phones.map((phone, index) => (
                        <div key={index} className={css.listItemWrapper}>
                          <label
                            className={css.formLabel}
                            htmlFor={`phones.${index}.type`}
                          >
                            <Field
                              as="select"
                              className={css.formInput}
                              type="text"
                              name={`phones.${index}.type`}
                              placeholder="Phone type"
                            >
                              <option value="mobile">Mobile</option>
                              <option value="work">Work</option>
                              <option value="home">Home</option>
                              <option value="other">Other</option>
                            </Field>
                          </label>
                          <PhoneInput
                            country={"ua"}
                            value={values.phones[index].number}
                            onChange={(value) =>
                              setFieldValue(`phones.${index}.number`, value)
                            }
                            enableSearch={true}
                            inputProps={{
                              name: `phones.${index}.number`,
                            }}
                            specialLabel={false}
                            inputStyle={{
                              borderColor: "#a8aab3",
                              boxShadow: "none",
                            }}
                          />
                          <IconButton onClick={() => remove(index)}>
                            <ClearSharpIcon />
                          </IconButton>
                        </div>
                      ))}
                    <Button
                      startIcon={<LocalPhoneSharpIcon />}
                      onClick={() => push({ type: "", number: "" })}
                    >
                      Add number
                    </Button>
                  </>
                )}
              </FieldArray>
              <FieldArray name="emails">
                {({ remove, push }) => (
                  <>
                    {values.emails.length > 0 &&
                      values.emails.map((email, index) => (
                        <div key={index} className={css.listItemWrapper}>
                          <label
                            className={css.formLabel}
                            htmlFor={`emails.${index}.type`}
                          >
                            <Field
                              as="select"
                              className={css.formInput}
                              type="text"
                              name={`emails.${index}.type`}
                              placeholder="Email type"
                            >
                              <option value="work">Work</option>
                              <option value="personal">Personal</option>
                              <option value="other">Other</option>
                            </Field>
                          </label>
                          <label className={css.formLabel}>
                            <Field
                              className={css.formInput}
                              type="email"
                              name={`emails.${index}.address`}
                              placeholder="Email"
                            />
                            <ErrorMessage name={`emails.${index}.address`}>
                              {(message) => (
                                <p className={css.errorText}>{message}</p>
                              )}
                            </ErrorMessage>
                          </label>
                          <IconButton onClick={() => remove(index)}>
                            <ClearSharpIcon />
                          </IconButton>
                        </div>
                      ))}
                    <Button
                      startIcon={<AlternateEmailSharpIcon />}
                      onClick={() => push({ type: "", address: "" })}
                    >
                      Add email
                    </Button>
                  </>
                )}
              </FieldArray>
              {/* <label className={css.formLabel}>
                <Field
                  className={css.formInput}
                  type="text"
                  name="phone"
                  placeholder="Phone"
                />
                <ErrorMessage name="phone">
                  {(message) => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label> */}
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
