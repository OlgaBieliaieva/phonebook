import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import useModal from 'hooks/useModal';
import { useAuth } from 'hooks/useAuth';
import { filter } from 'redux/contacts/slice';
import { fetchContacts } from 'redux/contacts/operations';
import { fetchGroups } from 'redux/groups/operations';
import { fetchTags } from 'redux/tags/operations';
import { selectFilteredContacts } from 'redux/contacts/selectors';
import { selectGroups } from 'redux/groups/selectors';
import { selectTags } from 'redux/tags/selectors';
import Modal from 'components/Modal/Modal';
import PageHeader from 'components/PageHeader/PageHeader';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import AddContactForm from 'components/ContactForms/AddContactForm';
import InfoText from 'components/InfoText/InfoText';
import css from './Contacts.module.css';

export default function Contacts() {
  const contacts = useSelector(selectFilteredContacts);
  const groups = useSelector(selectGroups);
  const tags = useSelector(selectTags);
  const dispatch = useDispatch();
  const { isModalOpen, toggleModal } = useModal();
  const { user } = useAuth();
  const location = useLocation().pathname.split('/');

  useEffect(() => {
    dispatch(fetchContacts(user.id));
    dispatch(fetchGroups(user.id));
    dispatch(fetchTags(user.id));
  }, [dispatch, user]);

  const handleFilterChange = e => {
    const { value } = e.target;
    dispatch(filter(value));
  };

  return (
    <>
      <div className={css.contactsWrapper}>
        <PageHeader
          title="All Contacts"
          btnTitle="Add Contact"
          btnAction={toggleModal}
        >
          <Filter handleFilterChange={handleFilterChange} />
        </PageHeader>
        <div className={css.contentWrapper}>
          {contacts.length > 0 ? (
            <ContactList
              contacts={contacts}
              linkBtn={true}
              currentUser={user}
            />
          ) : (
            <InfoText text="You don't have any contact yet" />
          )}
        </div>
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <AddContactForm
              onClose={toggleModal}              
              userGroups={groups}
              userTags={tags}
            />
          </Modal>
        )}
      </div>
      <div className={css.contactDetailsWrapper}>
        {location[location.length - 1] !== 'all' ? (
          <Outlet />
        ) : (
          <InfoText text="Choose some contact for details" />
        )}
      </div>
    </>
  );
}
