import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  addAvatar,
  deleteAvatar,
  updateProfile,
} from "../../redux/auth/operations";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import css from "./Profile.module.css";

const validationSchema = Yup.object().shape({
  avatar: Yup.string(),
  name: Yup.string().required("* it's a required field"),
  email: Yup.string().required("* it's a required field"),
});

export default function Profile({ user, closeModal }) {
  const [avatarURL, setAvatarURL] = useState(user.avatar || null);
  const { id, status, subscription, avatar, ...initialValues } = user;
  const dispatch = useDispatch();

  function handleSubmit(values, { resetForm }) {
    dispatch(updateProfile(values));
    closeModal();
  }

  function handleAddAvatar(e) {
    const file = e.target.files[0];
    if (file) {
      dispatch(addAvatar(file)).then(({ payload: { user } }) => {
        setAvatarURL(user.avatar);
      });
    }
  }

  function handleDeleteAvatar() {
    dispatch(deleteAvatar()).then(({ payload: { user } }) => {
      setAvatarURL(user.avatar);
    });
  }

  return (
    <div className={css.formWrapper}>
      <div className={css.formHeader}>
        <h3>Your profile</h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form
            className={css.form}
            name="profileForm"
            id="profileForm"
            autoComplete="off"
          >
            <fieldset
              className={`${css.formField} ${css.avatarField}`}
              form="profileForm"
              name="avatar"
              role="group"
            >
              <label className={`${css.formLabel} ${css.avatarLabel}`}>
                {avatarURL ? (
                  <Avatar
                    src={avatarURL}
                    alt={user.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                ) : (
                  <AddPhotoAlternateIcon
                    className={css.avatarIcon}
                    sx={{
                      width: 80,
                      height: 80,
                      color: "rgb(192, 192, 192)",
                    }}
                  />
                )}
                <Field
                  className={`${css.formInput} ${css.visuallyHidden}`}
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleAddAvatar}
                />
              </label>
              <div>
                {avatarURL && (
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteAvatar}
                  >
                    Remove image
                  </Button>
                )}
              </div>
            </fieldset>
            <fieldset
              className={css.formField}
              form="profileForm"
              name="name"
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
                  name="email"
                  placeholder="Email"
                  disabled
                />
                <ErrorMessage name="email">
                  {(message) => <p className={css.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
            </fieldset>
            <button className={css.formBtn} type="submit">
              Update profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
