import { useState } from 'react';
import { Link } from 'react-router-dom';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal/Modal';
import { Avatar } from '@mui/material';
import PhoneEnabledSharpIcon from '@mui/icons-material/PhoneEnabledSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import css from './ContactListItem.module.css';

export default function ContactListItem({
  id,
  avatar,
  firstName,
  middleName,
  lastName,
  jobTitle,
  company,
  phone,
  email,
  linkBtn,
}) {
  const [targetBtn, setTargetBtn] = useState('');
  const { ref, onOpen, onClose } = useModal();

  const showContact = e => {
    setTargetBtn(e.currentTarget.name);
    onOpen();
  };

  return (
    <li className={css.contactItem} key={id}>
      <Avatar>
        <img src={avatar} alt={firstName} />
      </Avatar>
      <div className={css.descriptionWrapper}>
        <p
          className={css.contactName}
        >{`${firstName} ${middleName} ${lastName}`}</p>
        <p className={css.contactRole}>{`${jobTitle} | ${company}`}</p>
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

      <Modal ref={ref} onClose={onClose} onOpen={onOpen}>
        <div className={css.modalContentWrapper}>
          <p>{`${firstName} ${middleName} ${lastName}`}</p>
          <div className={css.contactDetails}>
            {targetBtn === 'phone' ? (
              <PhoneEnabledSharpIcon />
            ) : (
              <EmailSharpIcon />
            )}

            {targetBtn === 'phone' ? <p>{phone}</p> : <p>{email}</p>}
          </div>
        </div>
      </Modal>
    </li>
  );
}
