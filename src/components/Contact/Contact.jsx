import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from 'utils/fireStore';
import { Notify, Confirm } from 'notiflix';
import useModal from 'hooks/useModal';
import { useAuth } from 'hooks/useAuth';
import { deleteContact, updateContact } from 'redux/contacts/operations';
import Modal from 'components/Modal/Modal';
import EditContactForm from 'components/ContactForms/EditContactForm';
import { Tooltip } from '@mui/material';
import { Avatar } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import TagSharpIcon from '@mui/icons-material/TagSharp';
import PhoneEnabledSharpIcon from '@mui/icons-material/PhoneEnabledSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import SpeakerNotesSharpIcon from '@mui/icons-material/SpeakerNotesSharp';
import AddIcon from '@mui/icons-material/Add';

import css from './Contact.module.css';

export default function Contact({ contact, userGroups, userTags }) {
  const [avatarURL, setAvatarURL] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModalOpen, toggleModal } = useModal();
  const { user } = useAuth();

  function handleDelete(id) {
    const data = { userId: user.id, contactId: id };
    Confirm.show(
      'Delete Contact',
      'Do you really want to delete this contact?',
      'Yes',
      'No',
      function okCb() {
        dispatch(deleteContact(data));
        navigate(-1);
      }
    );
  }

  function handleUpdateAvatar(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile.size < 10000000) {
      const storageRef = ref(storage, `avatars/${user.id}/${contact.id}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            setAvatarURL(url);

            const newContact = { ...contact, avatar: url };
            dispatch(updateContact(newContact));
            setAvatarURL('');
          });
        }
      );
    } else {
      Notify.failure(
        `Зображення ${selectedFile.name} занадто велике, оберіть інше зображення`
      );
    }
  }
  function handleDeleteAvatar() {
    setAvatarURL('');
    dispatch(updateContact({ ...contact, avatar: '' }));
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
              {contact.avatar || avatarURL ? (
                <img
                  src={avatarURL ? avatarURL : contact.avatar}
                  alt={contact.firstName}
                />
              ) : (
                <span>{`${contact.firstName.slice(
                  0,
                  1
                )}${contact.lastName.slice(0, 1)}`}</span>
              )}
            </Avatar>
            {contact.avatar || avatarURL ? (
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
            <p
              className={css.contactRole}
            >{`${contact.jobTitle} | ${contact.company}`}</p>
          </div>
          <ul className={css.contactAttributesList}>
            <li className={css.contactAttribute}>
              <GroupSharpIcon />
              <ul className={css.contactAttributeItemsList}>
                {contact.groups.map((group, index) => (
                  <li key={index} className={css.contactAttributeItem}>
                    {group}
                  </li>
                ))}
              </ul>
            </li>
            <li className={css.contactAttribute}>
              <TagSharpIcon />
              <ul className={css.contactAttributeItemsList}>
                {contact.tags.map((tag, index) => (
                  <li key={index} className={css.contactAttributeItem}>
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <ul className={css.fullInfoWrapper}>
          <li className={css.infoItem}>
            <PhoneEnabledSharpIcon />
            <p className={css.itemContent}>{contact.phone}</p>
          </li>
          <li className={css.infoItem}>
            <EmailSharpIcon />
            <p className={css.itemContent}>{contact.email}</p>
          </li>
          <li className={css.infoItem}>
            <CakeSharpIcon />
            <p className={css.itemContent}>{contact.birthday}</p>
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
            contact={contact}
            userGroups={userGroups}
            userTags={userTags}
          />
        </Modal>
      )}
    </>
  );
}
