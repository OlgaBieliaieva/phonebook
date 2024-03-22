import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectFilteredContacts } from 'redux/selectors';
import PageHeader from 'components/PageHeader/PageHeader';
import ContactList from 'components/ContactList/ContactList';

export default function GroupDetails() {
  const contacts = useSelector(selectFilteredContacts);
  const location = useLocation();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <div>
      <PageHeader
        title={
          location.pathname.split('/')[location.pathname.split('/').length - 1]
        }
        btnTitle="<<-Back"
        btnAction={goBack}
      />
      <ContactList
        contacts={contacts.filter(contact =>
          contact.groups.includes(
            location.pathname.split('/')[
              location.pathname.split('/').length - 1
            ]
          )
        )}
        linkBtn={false}
      />
    </div>
  );
}
