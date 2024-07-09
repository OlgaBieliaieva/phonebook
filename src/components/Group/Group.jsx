import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Notify, Confirm } from "notiflix";
import useModal from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { updateGroup, deleteGroup } from "../../redux/groups/operations";
import { updateContact } from "../../redux/contacts/operations";
import addFileToStorage from "../../utils/addFileToStorage";
import removeFileFromStorage from "../../utils/removeFileFromStorage";
import Modal from "../Modal/Modal";
import EditGroupForm from "../GroupForms/EditGroupForm";

// MUI
import { Tooltip, Avatar } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import AddIcon from "@mui/icons-material/Add";

import css from "./Group.module.css";

export default function Group({ group, contacts }) {
  const [avatarURL, setAvatarURL] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModalOpen, toggleModal } = useModal();
  const { user } = useAuth();
  const folderName = "groupAvatars";
  const formattedMembers = group.members
    .map((contactId) => contacts.find((contact) => contact.id === contactId))
    .map((contact) => `${contact.firstName} ${contact.lastName}`);

  async function handleUpdateAvatar(e) {
    const result = await addFileToStorage(e, folderName, user.id, group.id);
    setAvatarURL(result.url);
    dispatch(
      updateGroup({
        ...group,
        avatar: { url: result.url, name: group.id },
      })
    );
  }
  function handleDeleteAvatar() {
    removeFileFromStorage(folderName, user.id, group.avatar.name);
    setAvatarURL("");

    dispatch(updateGroup({ ...group, avatar: { url: "", name: "" } }));
  }
  function handleDelete(id) {
    const data = { userId: user.id, groupId: id };
    Confirm.show(
      "Delete group",
      "Do you really want to delete this group?",
      "Yes",
      "No",
      function okCb() {
        dispatch(deleteGroup(data));
        navigate(-1);
        removeFromContacts(id);
        removeFileFromStorage("groupAvatars", user.id, group.avatar.name);
        Notify.success("New group removed successfully");
      }
    );
  }
  function removeFromContacts(id) {
    if (group.members.length > 0) {
      return group.members
        .map((contactId) =>
          contacts.find((contact) => contact.id === contactId)
        )
        .map((targetContact) => {
          const targetContactGroups = [...targetContact.groups];
          const index = targetContactGroups.indexOf(id);
          targetContactGroups.splice(index, 1);
          return dispatch(
            updateContact({
              id: targetContact.id,
              groups: [...targetContactGroups],
            })
          );
        });
    }
  }
  return (
    <>
      <div className={css.groupWrapper}>
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
                  onClick={() => handleDelete(group.id)}
                >
                  <DeleteForeverSharpIcon className={css.btnIcon} />
                </button>
              </Tooltip>
            </li>
          </ul>
          <div className={css.mainInfo}>
            <Avatar className={css.avatar}>
              {group.avatar.url || avatarURL ? (
                <img
                  src={avatarURL ? avatarURL : group.avatar.url}
                  alt={group.name}
                />
              ) : (
                <span>{`${group.name.slice(0, 1)}`}</span>
              )}
            </Avatar>
            {group.avatar.url || avatarURL ? (
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

            <p className={css.groupName}>{group.name}</p>
            <p className={css.groupDesc}>{group.description}</p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <EditGroupForm
            onClose={toggleModal}
            group={{ ...group, members: [...formattedMembers] }}
            contacts={contacts}
          />
        </Modal>
      )}
    </>
  );
}
