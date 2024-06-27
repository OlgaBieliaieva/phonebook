import ContactListItem from "../ContactListItem/ContactListItem";
import css from "./ContactList.module.css";

export default function ContactList({ contacts, linkBtn }) {
  return (
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
              linkBtn={linkBtn}
            />
          );
        }
      )}
    </ul>
  );
}
