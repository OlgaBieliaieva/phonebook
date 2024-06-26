import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateContact } from 'redux/contacts/operations';
import CustomSelect from 'components/CustomSelect/CustomSelect';
import css from './AddContactForm.module.css';

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
  contact = {},
  userGroups,
  userTags,
}) {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const updatedContact = { ...values };
    dispatch(updateContact(updatedContact));
    resetForm();
    onClose();
  };

  return (
    <div className={css.formWrapper}>
      <div className={css.formHeader}>
        <h3>Edit Contact</h3>
      </div>
      <Formik
        initialValues={contact}
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
              Update Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
