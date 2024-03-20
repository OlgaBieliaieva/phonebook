import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectFilteredContacts } from 'redux/selectors';
import PageHeader from 'components/PageHeader/PageHeader';
import Contact from 'components/Contact/Contact';
import css from './ContactDetails.module.css';

export default function ContactDetails() {
  const contacts = useSelector(selectFilteredContacts);
  const location = useLocation();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className={css.contactDetailsWrapper}>
      <PageHeader
        title="Contact Details"
        btnTitle="<<-Back"
        btnAction={goBack}
      />
      <Contact
        contact={contacts.find(
          contact =>
            contact.id ===
            location.pathname.split('/')[
              location.pathname.split('/').length - 1
            ]
        )}
      />
    </div>
  );
}
