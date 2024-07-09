import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateContact } from "../../redux/contacts/operations";
import { updateGroup } from "../../redux/groups/operations";
import { updateTag } from "../../redux/tags/operations";
import CustomSelect from "../CustomSelect/CustomSelect";
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

export default function EditContactForm({
  onClose,
  contact,
  userGroups,
  userTags,
}) {
  const dispatch = useDispatch();
  const { avatar, createdAt, id, owner, ...initialValues } = contact;

  async function handleSubmit(values, { resetForm }) {
    const selectedGroups = values.groups.map(
      (selectedValue) =>
        userGroups.find((group) => group.name === selectedValue).id
    );
    const selectedTags = values.tags.map(
      (selectedValue) => userTags.find((tag) => tag.name === selectedValue).id
    );

    const updatedContact = {
      ...values,
      groups: selectedGroups,
      tags: selectedTags,
      id,
    };

    await dispatch(updateContact(updatedContact))
      .then((result) => updateContactAttributes(result.payload))
      .catch((err) => console.log(err));
    resetForm();
    onClose();
  }

  function updateContactAttributes(updatedContact) {
    let updatedMembers = [];
    userGroups.map((group) => {
      if (
        group.members.includes(updatedContact.id) &&
        updatedContact.groups.includes(group.id)
      ) {
        return group;
      }
      if (
        group.members.includes(updatedContact.id) &&
        !updatedContact.groups.includes(group.id)
      ) {
        const targetIndex = group.members.indexOf(updatedContact.id);

        updatedMembers = [...group.members];
        updatedMembers.splice(targetIndex, 1);

        return dispatch(
          updateGroup({
            id: group.id,
            members: updatedMembers,
          })
        );
      }
      if (
        !group.members.includes(updatedContact.id) &&
        updatedContact.groups.includes(group.id)
      ) {
        updatedMembers = [...group.members];
        updatedMembers.push(updatedContact.id);

        return dispatch(
          updateGroup({
            id: group.id,
            members: updatedMembers,
          })
        );
      }
      return null;
    });

    userTags.map((tag) => {
      if (
        tag.members.includes(updatedContact.id) &&
        updatedContact.tags.includes(tag.id)
      ) {
        return tag;
      }
      if (
        tag.members.includes(updatedContact.id) &&
        !updatedContact.tags.includes(tag.id)
      ) {
        const targetIndex = tag.members.indexOf(updatedContact.id);

        updatedMembers = [...tag.members];
        updatedMembers.splice(targetIndex, 1);

        return dispatch(
          updateTag({
            id: tag.id,
            members: updatedMembers,
          })
        );
      }
      if (
        !tag.members.includes(updatedContact.id) &&
        updatedContact.tags.includes(tag.id)
      ) {
        updatedMembers = [...tag.members];
        updatedMembers.push(updatedContact.id);

        return dispatch(
          updateTag({
            id: tag.id,
            members: updatedMembers,
          })
        );
      }
      return null;
    });
  }

  return (
    <div className={css.formWrapper}>
      <div className={css.formHeader}>
        <h3>Edit Contact</h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form
            className={css.form}
            name="editContactForm"
            id="editContactForm"
            autoComplete="off"
          >
            <fieldset
              className={css.formField}
              form="editContactForm"
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
              form="editContactForm"
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
              form="editContactForm"
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
              form="editContactForm"
              name="attributes"
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
              Update Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
