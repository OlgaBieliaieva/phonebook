import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useModal from 'hooks/useModal';
import { deleteContact } from 'redux/operations';
import Modal from 'components/Modal/Modal';
import ContactForm from 'components/ContactForm/ContactForm';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import TagSharpIcon from '@mui/icons-material/TagSharp';
import PhoneEnabledSharpIcon from '@mui/icons-material/PhoneEnabledSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import SpeakerNotesSharpIcon from '@mui/icons-material/SpeakerNotesSharp';
import { Tooltip } from '@mui/material';
import { Avatar } from '@mui/material';
import css from './Contact.module.css';

export default function Contact({ contact }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ref, onOpen, onClose } = useModal();

  function handleEdit() {
    onOpen();
  }

  function handleDelete(id) {
    dispatch(deleteContact(id));
    navigate(-1);
  }

  return (
    <>
      <div className={css.contactWrapper}>
        <div className={css.mainInfoWrapper}>
          <ul className={css.toolsList}>
            <li>
              <Tooltip>
                <button
                  type="button"
                  name="edit"
                  className={css.toolsBtn}
                  onClick={handleEdit}
                >
                  <EditSharpIcon className={css.btnIcon} />
                </button>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
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
              <img src={contact.avatar} alt={contact.firstName} />
            </Avatar>
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
      <Modal ref={ref} onClose={onClose} onOpen={onOpen}>
        <ContactForm onClose={onClose} contact={contact} />
      </Modal>
    </>
  );
}
