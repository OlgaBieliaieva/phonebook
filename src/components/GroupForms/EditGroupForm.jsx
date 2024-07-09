import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateContact } from "../../redux/contacts/operations";
import { updateGroup } from "../../redux/groups/operations";
import CustomSelect from "../CustomSelect/CustomSelect";
import css from "./EditGroupForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("* it's a required field"),
  description: Yup.string(),
  members: Yup.array().default([]),
});

export default function EditGroupForm({ onClose, group, contacts }) {
  const dispatch = useDispatch();
  const { avatar, createdAt, id, owner, ...initialValues } = group;

  async function handleSubmit(values, { resetForm }) {
    const selectedMembers = values.members.map(
      (selectedValue) =>
        contacts.find(
          (contact) =>
            contact.firstName === selectedValue.split(" ")[0] &&
            contact.lastName === selectedValue.split(" ")[1]
        ).id
    );

    const updatedGroup = {
      ...values,
      members: selectedMembers,
      id,
    };

    await dispatch(updateGroup(updatedGroup))
      .then((result) => updateContactGroups(result.payload))
      .catch((err) => console.log(err));
    resetForm();
    onClose();
  }

  function updateContactGroups(updatedGroup) {
    let updatedGroups = [];
    contacts.map((contact) => {
      if (
        contact.groups.includes(updatedGroup.id) &&
        updatedGroup.members.includes(contact.id)
      ) {
        return group;
      }
      if (
        contact.groups.includes(updatedGroup.id) &&
        !updatedGroup.members.includes(contact.id)
      ) {
        const targetIndex = contact.groups.indexOf(updatedGroup.id);

        updatedGroups = [...contact.groups];
        updatedGroups.splice(targetIndex, 1);

        return dispatch(
          updateContact({
            id: contact.id,
            groups: updatedGroups,
          })
        );
      }
      if (
        !contact.groups.includes(updatedGroup.id) &&
        updatedGroup.members.includes(contact.id)
      ) {
        updatedGroups = [...contact.groups];
        updatedGroups.push(updatedGroup.id);

        return dispatch(
          updateContact({
            id: contact.id,
            groups: updatedGroups,
          })
        );
      }
      return null;
    });
  }

  return (
    <div className={css.formWrapper}>
      <div className={css.formHeader}>
        <h3>Edit Group</h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form
            className={css.form}
            name="editGroupForm"
            id="editGroupForm"
            autoComplete="off"
          >
            <fieldset
              className={css.formField}
              form="editGroupForm"
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
            </fieldset>
            <fieldset
              className={css.formField}
              form="editGroupForm"
              name="members"
              role="group"
            >
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
              Update Group
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
