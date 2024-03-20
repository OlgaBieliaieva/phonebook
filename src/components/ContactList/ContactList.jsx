import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operations';
// import { deleteContact } from 'redux/operations';
import { selectFilteredContacts } from 'redux/selectors';
import ContactListItem from 'components/ContactListItem/ContactListItem';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const removeContact = e => {
  //   const contactId = e.target.id;
  //   dispatch(deleteContact(contactId));
  // };

  return (
    <>
      <ul className={css.contactList}>
        {contacts?.map(
          ({
            id,
            avatar,
            firstName,
            middleName,
            lastName,
            jobTitle,
            company,
            phone,
            email,
          }) => {
            return (
              <ContactListItem
                key={id}
                id={id}
                avatar={avatar}
                firstName={firstName}
                middleName={middleName}
                lastName={lastName}
                jobTitle={jobTitle}
                company={company}
                phone={phone}
                email={email}
              />
            );
          }
        )}
      </ul>
    </>
  );
}
