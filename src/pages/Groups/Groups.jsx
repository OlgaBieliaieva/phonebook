import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import useModal from 'hooks/useModal';
import { useAuth } from 'hooks/useAuth';
import { filter } from 'redux/groups/slice';
import { fetchGroups } from 'redux/groups/operations';
import { fetchContacts } from 'redux/contacts/operations';
import { selectFilteredGroups } from 'redux/groups/selectors';
import { selectContacts } from 'redux/contacts/selectors';
import Modal from 'components/Modal/Modal';
import PageHeader from 'components/PageHeader/PageHeader';
import Filter from 'components/Filter/Filter';
import InfoText from 'components/InfoText/InfoText';
import GroupsList from 'components/GroupsList/GroupsList';
import AddGroupForm from 'components/GroupForms/AddGroupForm';
import css from './Groups.module.css';

export default function Groups() {
  const { isModalOpen, toggleModal } = useModal();
  const { user } = useAuth();
  const location = useLocation().pathname.split('/');
  const groups = useSelector(selectFilteredGroups);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups(user.id));
    dispatch(fetchContacts(user.id));
  }, [dispatch, user]);

  const handleFilterChange = e => {
    const { value } = e.target;
    dispatch(filter(value));
  };

  return (
    <>
      <div className={css.groupsWrapper}>
        <PageHeader
          title="All Groups"
          btnTitle="Add Group"
          btnAction={toggleModal}
        >
          <Filter handleFilterChange={handleFilterChange} />
        </PageHeader>
        <div className={css.contentWrapper}>
          {contacts.length > 0 ? (
            <GroupsList groups={groups} />
          ) : (
            <InfoText text="You don't have any group yet" />
          )}
        </div>
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <AddGroupForm
              onClose={toggleModal}
              owner={user.id}
              contacts={contacts}
            />
          </Modal>
        )}
      </div>
      <div className={css.groupDetailsWrapper}>
        {location[location.length - 1] !== 'groups' ? (
          <Outlet />
        ) : (
          <InfoText text="Choose some group for details" />
        )}
      </div>
    </>
  );
}
