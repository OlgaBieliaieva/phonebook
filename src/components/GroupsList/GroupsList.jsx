import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectFilteredContacts } from 'redux/selectors';
import GroupListItem from 'components/GroupListItem/GroupListItem';
import css from './GroupsList.module.css';

export default function GroupsList({ groups }) {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <ul className={css.groupsList}>
      {groups.map((group, index) => (
        <GroupListItem
          key={index}
          group={group}
          contactsInGroup={[
            ...contacts.filter(contact => contact.groups.includes(group)),
          ]}
        />
      ))}
    </ul>
  );
}
