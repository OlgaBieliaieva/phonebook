import { Outlet, useLocation } from 'react-router-dom';
import useModal from 'hooks/useModal';
import { useAuth } from 'hooks/useAuth';
import Modal from 'components/Modal/Modal';
import PageHeader from 'components/PageHeader/PageHeader';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import PermContactCalendarSharpIcon from '@mui/icons-material/PermContactCalendarSharp';
import css from './Contacts.module.css';

export default function Contacts() {
  const { ref, onOpen, onClose } = useModal();
  const { user } = useAuth();
  const location = useLocation().pathname.split('/');

  return (
    <>
      <div className={css.contactsWrapper}>
        <PageHeader
          title="All Contacts"
          btnTitle="Add Contact"
          btnAction={onOpen}
        >
          <Filter />
        </PageHeader>
        <ContactList />
        <Modal ref={ref} onClose={onClose} onOpen={onOpen}>
          <ContactForm onClose={onClose} />
        </Modal>
      </div>
      <div className={css.contactDetailsWrapper}>
        {location[location.length - 1] !== 'all' ? (
          <Outlet />
        ) : (
          <div className={css.welcomePage}>
            <PermContactCalendarSharpIcon className={css.welcomePageIcon}/>
            <p>{user.name}&#44;</p>
            <p>choose some contact for details</p>
          </div>
        )}
      </div>
    </>
  );
}
