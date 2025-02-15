import { useState, useRef } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import css from "./Avatar.module.css";

export default function CustomAvatar() {
  const [avatarURL, setAvatarURL] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const addAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarURL(reader.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteAvatar = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setAvatarURL("");
    setFileName("");
  };

  return (
    <>
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
    </>
  );
}
