import { useState } from "react";
import { Link } from "react-router-dom";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import { Avatar, useTheme, Typography } from "@mui/material";
import PhoneEnabledSharpIcon from "@mui/icons-material/PhoneEnabledSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import css from "./ContactListItem.module.css";

export default function ContactListItem({
  id,
  avatar,
  firstName,
  middleName,
  lastName,
  position,
  department,
  company,
  phones,
  emails,
  linkBtn,
}) {
  const [targetBtn, setTargetBtn] = useState("");
  const { isModalOpen, toggleModal } = useModal();
  const theme = useTheme();

  const showContact = (e) => {
    setTargetBtn(e.currentTarget.name);
    toggleModal();
  };

  return (
    <li
      className={css.contactItem}
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Avatar className={css.avatar}>
        {avatar.url ? (
          <img src={avatar.url} alt={firstName} />
        ) : (
          <span>{firstName.slice(0, 1)}</span>
        )}
      </Avatar>
      <div className={css.descriptionWrapper}>
        <Typography
          variant="subtitle1"
          className={css.contactName}
        >{`${firstName} ${
          middleName ? middleName : ""
        } ${lastName}`}</Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className={css.contactRole}
        >{`${position || "position"} | ${department ? `${department} | ` : ""}${
          company || "company"
        }`}</Typography>
      </div>
      <ul className={css.btnList}>
        <li>
          <button
            className={css.listItemBtn}
            id={id}
            name="phone"
            type="button"
            onClick={showContact}
          >
            <PhoneEnabledSharpIcon className={css.btnIcon} />
          </button>
        </li>
        <li>
          <button
            className={css.listItemBtn}
            id={id}
            name="mail"
            type="button"
            onClick={showContact}
          >
            <EmailSharpIcon className={css.btnIcon} />
          </button>
        </li>
        {linkBtn && (
          <li>
            <Link to={id} className={css.listItemBtn}>
              <VisibilitySharpIcon className={css.btnIcon} />
            </Link>
          </li>
        )}
      </ul>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <div className={css.modalContentWrapper}>
            <div className={css.modalTitleWrapper}>
              <Typography variant="h3">{`${firstName} ${
                middleName ? middleName : ""
              } ${lastName}`}</Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className={css.contactRole}
              >{`${position || "position"} | ${
                department ? `${department} | ` : ""
              }${company || "company"}`}</Typography>
            </div>
            <ul className={css.contactDetails}>
              {targetBtn === "phone"
                ? phones.map((phone, index) => (
                    <li key={index} className={css.detailsItem}>
                      <PhoneEnabledSharpIcon />
                      <a href={`tel:${phone.number}`}>{phone.number}</a>
                      <Typography variant="body2" color="text.secondary">
                        {phone.type}
                      </Typography>
                    </li>
                  ))
                : emails.map((email, index) => (
                    <li key={index} className={css.detailsItem}>
                      <EmailSharpIcon />
                      <a href={`mailto:${email.address}`}>
                        {email.address || "email is not specified"}
                      </a>
                      <Typography variant="body2" color="text.secondary">
                        {email.type}
                      </Typography>
                    </li>
                  ))}
            </ul>
          </div>
        </Modal>
      )}
    </li>
  );
}
