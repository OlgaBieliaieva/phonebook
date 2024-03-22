import { Outlet, useLocation } from 'react-router-dom';
import useModal from 'hooks/useModal';
import { useAuth } from 'hooks/useAuth';
import Modal from 'components/Modal/Modal';
import PageHeader from 'components/PageHeader/PageHeader';
import GroupsList from 'components/GroupsList/GroupsList';
import PermContactCalendarSharpIcon from '@mui/icons-material/PermContactCalendarSharp';
import css from './Groups.module.css';

export default function Groups() {
  const { ref, onOpen, onClose } = useModal();
  const { user } = useAuth();
  const location = useLocation().pathname.split('/');

  return (
    <>
      <div className={css.contactsWrapper}>
        <PageHeader
          title="All Groups"
          btnTitle="Add Group"
          btnAction={onOpen}
        ></PageHeader>
        <GroupsList groups={user.groups} />
        <Modal ref={ref} onClose={onClose} onOpen={onOpen}>
          <div className={css.modalContent}>
            <p>This feature is under development</p>
          </div>
        </Modal>
      </div>
      <div className={css.contactDetailsWrapper}>
        {location[location.length - 1] !== 'groups' ? (
          <Outlet />
        ) : (
          <div className={css.welcomePage}>
            <PermContactCalendarSharpIcon className={css.welcomePageIcon} />
            <p>{user.name}&#44;</p>
            <p>choose some group for details</p>
          </div>
        )}
      </div>
    </>
  );
}
