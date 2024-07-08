import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectContacts } from "../../redux/contacts/selectors";
import { selectGroups } from "../../redux/groups/selectors";
import PageHeader from "../../components/PageHeader/PageHeader";
import Group from "../../components/Group/Group";
import MembersInfo from "../../components/MembersInfo/MembersInfo";
import ContactList from "../../components/ContactList/ContactList";
import css from "./GroupDetails.module.css";

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
    <div className={css.groupDetailsWrapper}>
      <PageHeader btnTitle="<<-Back" btnAction={goBack} title="Group Details" />
      <Group
        group={groups.find((group) => group.id === targetGroupId)}
        contacts={contacts}
      />
      <MembersInfo
        title="Group members"
        group={groups.find((group) => group.id === targetGroupId)}
      >
        <ContactList
          contacts={contacts.filter((contact) =>
            contact.groups.includes(targetGroupId)
          )}
          linkBtn={false}
          bg="grey"
        />
      </MembersInfo>
    </div>
  );
}
