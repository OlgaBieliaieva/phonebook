import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAvatar } from "../../redux/auth/operations";

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

export default function Profile({ user }) {
  const [avatarURL, setAvatarURL] = useState(user.avatar || null);
  const { id, status, subscription, avatar, ...initialValues } = user;
  const dispatch = useDispatch();

  function handleSubmit(values, { resetForm }) {
    console.log(values);
  }

  function handleAddAvatar(e) {
    const file = e.target.files[0];
    if (file) {
      dispatch(addAvatar(file)).then(({ payload: { user } }) => {
        setAvatarURL(user.avatar);
      });
    }
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
                  <AddPhotoAlternateIcon className={css.avatarIcon} />
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
                    //   onClick={deleteAvatar}
                  >
                    Remove image
                  </Button>
                )}
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
}
