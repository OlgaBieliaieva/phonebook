import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectContacts } from "../../redux/contacts/selectors";
import { selectGroups } from "../../redux/groups/selectors";
import PageHeader from "../../components/PageHeader/PageHeader";
import ContactList from "../../components/ContactList/ContactList";

export default function GroupDetails() {
  const contacts = useSelector(selectContacts);
  const groups = useSelector(selectGroups);
  const location = useLocation();
  const navigate = useNavigate();

  const targetGroupId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  function goBack() {
    navigate(-1);
  }

  return (
    <div>
      <PageHeader
        btnTitle="<<-Back"
        btnAction={goBack}
        title={groups.find((group) => group.id === targetGroupId).name}
      />
      <ContactList
        contacts={contacts.filter((contact) =>
          contact.groups.includes(
            groups.find((group) => group.id === targetGroupId).name
          )
        )}
        linkBtn={false}
      />
    </div>
  );
}
