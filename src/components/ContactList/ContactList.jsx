import ContactListItem from "../ContactListItem/ContactListItem";
import css from "./ContactList.module.css";

export default function ContactList({ contacts, linkBtn, bg = false }) {
  return (
    <ul className={`${css.contactList} ${bg ? css.grey : ""}`}>
      {contacts?.map(
        ({
          _id,
          avatar,
          firstName,
          middleName,
          lastName,
          position,
          department,
          company,
          phones,
          emails,
        }) => {
          return (
            <ContactListItem
              key={_id}
              id={_id}
              avatar={avatar}
              firstName={firstName}
              middleName={middleName}
              lastName={lastName}
              position={position}
              department={department}
              company={company}
              phones={phones}
              emails={emails}
              linkBtn={linkBtn}
            />
          );
        }
      )}
    </ul>
  );
}
