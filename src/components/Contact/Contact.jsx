import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Confirm } from "notiflix";
import { format } from "date-fns";
import removeFileFromStorage from "../../utils/removeFileFromStorage";
import useModal from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import { updateGroup } from "../../redux/groups/operations";
import { updateTag } from "../../redux/tags/operations";
import addFileToStorage from "../../utils/addFileTostorage";
import Modal from "../Modal/Modal";
import EditContactForm from "../ContactForms/EditContactForm";
import { Tooltip, Avatar } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import GroupSharpIcon from "@mui/icons-material/GroupSharp";
import TagSharpIcon from "@mui/icons-material/TagSharp";
import PhoneEnabledSharpIcon from "@mui/icons-material/PhoneEnabledSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import CakeSharpIcon from "@mui/icons-material/CakeSharp";
import SpeakerNotesSharpIcon from "@mui/icons-material/SpeakerNotesSharp";
import AddIcon from "@mui/icons-material/Add";

import css from "./Contact.module.css";

export default function Contact({ contact, userGroups, userTags }) {
  const [avatarURL, setAvatarURL] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModalOpen, toggleModal } = useModal();
  const { user } = useAuth();
  const folderName = "contactAvatars";
  const birthdayArray = contact.birthday ? contact.birthday.split("-") : "";

  const formattedGroups = contact.groups.map(
    (groupId) => userGroups.find((group) => group.id === groupId).name
  );
  const formattedTags = contact.tags.map(
    (tagId) => userTags.find((tag) => tag.id === tagId).name
  );

  async function handleUpdateAvatar(e) {
    const result = await addFileToStorage(e, folderName, user.id, contact.id);
    setAvatarURL(result.url);
    dispatch(
      updateContact({
        ...contact,
        avatar: { url: result.url, name: contact.id },
      })
    );
  }
  function handleDeleteAvatar() {
    removeFileFromStorage(folderName, user.id, contact.avatar.name);
    setAvatarURL("");

    dispatch(updateContact({ ...contact, avatar: { url: "", name: "" } }));
  }

  function handleDelete(id) {
    const data = { userId: user.id, contactId: id };
    Confirm.show(
      "Delete Contact",
      "Do you really want to delete this contact?",
      "Yes",
      "No",
      function okCb() {
        dispatch(deleteContact(data));
        navigate(-1);
        removeFromMembers(contact);
        removeFileFromStorage("contactAvatars", user.id, contact.avatar.name);
      }
    );
  }

  function removeFromMembers(deletedContact) {
    if (deletedContact.groups.length > 0) {
      return deletedContact.groups
        .map((groupId) => userGroups.find((group) => group.id === groupId))
        .map((targetGroup) => {
          const targetGroupMembers = [...targetGroup.members];
          const index = targetGroupMembers.indexOf(deletedContact.id);
          targetGroupMembers.splice(index, 1);

          return dispatch(
            updateGroup({
              id: targetGroup.id,
              members: [...targetGroupMembers],
            })
          );
        });
    }
    if (deletedContact.tags.length > 0) {
      return deletedContact.tags
        .map((tagId) => userTags.find((tag) => tag.id === tagId))
        .map((targetTag) => {
          const targetTagMembers = [...targetTag.members];
          const index = targetTagMembers.indexOf(deletedContact.id);
          targetTagMembers.splice(index, 1);

          return dispatch(
            updateTag({
              id: targetTag.id,
              members: [...targetTagMembers],
            })
          );
        });
    }
  }

  return (
    <>
      <div className={css.contactWrapper}>
        <div className={css.mainInfoWrapper}>
          <ul className={css.toolsList}>
            <li>
              <Tooltip title="edit">
                <button
                  type="button"
                  name="edit"
                  className={css.toolsBtn}
                  onClick={toggleModal}
                >
                  <EditSharpIcon className={css.btnIcon} />
                </button>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="delete">
                <button
                  type="button"
                  name="delete"
                  className={css.toolsBtn}
                  onClick={() => handleDelete(contact.id)}
                >
                  <DeleteForeverSharpIcon className={css.btnIcon} />
                </button>
              </Tooltip>
            </li>
          </ul>
          <div className={css.mainInfo}>
            <Avatar className={css.avatar}>
              {contact.avatar.url || avatarURL ? (
                <img
                  src={avatarURL ? avatarURL : contact.avatar.url}
                  alt={contact.firstName}
                />
              ) : (
                <span>{`${contact.firstName.slice(
                  0,
                  1
                )}${contact.lastName.slice(0, 1)}`}</span>
              )}
            </Avatar>
            {contact.avatar.url || avatarURL ? (
              <Tooltip title="remove">
                <button
                  type="button"
                  name="remove"
                  className={`${css.toolsBtn} ${css.absolute}`}
                  onClick={() => handleDeleteAvatar()}
                >
                  <DeleteForeverSharpIcon className={css.btnIcon} />
                </button>
              </Tooltip>
            ) : (
              <Tooltip title="add avatar">
                <label
                  type="button"
                  name="delete"
                  className={`${css.toolsBtn} ${css.absolute}`}
                >
                  <AddIcon className={css.btnIcon} />
                  <input
                    type="file"
                    accept="image/*"
                    className={css.visuallyHidden}
                    onChange={handleUpdateAvatar}
                  ></input>
                </label>
              </Tooltip>
            )}

            <p
              className={css.contactName}
            >{`${contact.firstName} ${contact.middleName} ${contact.lastName}`}</p>
            <p className={css.contactRole}>{`${
              contact.jobTitle || "position"
            } | ${contact.company || "company"}`}</p>
          </div>
          <ul className={css.contactAttributesList}>
            <li className={css.contactAttribute}>
              <GroupSharpIcon />
              <ul className={css.contactAttributeItemsList}>
                {userGroups.map(
                  (group, index) =>
                    group.members.includes(contact.id) && (
                      <li key={index} className={css.contactAttributeItem}>
                        {group.name}
                      </li>
                    )
                )}
              </ul>
            </li>
            <li className={css.contactAttribute}>
              <TagSharpIcon />
              <ul className={css.contactAttributeItemsList}>
                {userTags.map(
                  (tag, index) =>
                    tag.members.includes(contact.id) && (
                      <li key={index} className={css.contactAttributeItem}>
                        {tag.name}
                      </li>
                    )
                )}
              </ul>
            </li>
          </ul>
        </div>
        <ul className={css.fullInfoWrapper}>
          <li className={css.infoItem}>
            <PhoneEnabledSharpIcon />
            <a className={css.itemContent} href={`tel:${contact.phone}`}>
              {contact.phone}
            </a>
          </li>
          <li className={css.infoItem}>
            <EmailSharpIcon />
            <a className={css.itemContent} href={`mailto:${contact.email}`}>
              {contact.email || ""}
            </a>
          </li>
          <li className={css.infoItem}>
            <CakeSharpIcon />
            <p className={css.itemContent}>
              {birthdayArray
                ? format(
                    new Date(
                      Number(birthdayArray[0]),
                      Number(birthdayArray[1] - 1),
                      Number(birthdayArray[2])
                    ),
                    "dd MMMM yyyy"
                  )
                : ""}
            </p>
          </li>
          <li className={css.infoItem}>
            <SpeakerNotesSharpIcon />
            <p className={css.itemContent}>{contact.note}</p>
          </li>
        </ul>
      </div>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <EditContactForm
            onClose={toggleModal}
            contact={{
              ...contact,
              groups: [...formattedGroups],
              tags: [...formattedTags],
            }}
            userGroups={userGroups}
            userTags={userTags}
          />
        </Modal>
      )}
    </>
  );
}
