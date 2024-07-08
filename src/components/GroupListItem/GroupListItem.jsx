import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import GroupsSharpIcon from "@mui/icons-material/GroupsSharp";
import css from "./GroupListItem.module.css";

export default function GroupListItem({ group }) {
  return (
    <li className={css.groupItem}>
      <Link to={group.id} className={css.groupItemLink}>
        <div className={css.groupItemNameWrapper}>
          <Avatar className={css.avatar}>
            {group.avatar.url ? (
              <img src={group.avatar.url} alt={group.name} />
            ) : (
              <GroupsSharpIcon className={css.groupItemIcon} />
            )}
          </Avatar>
          <div className={css.descriptionWrapper}>
            <p className={css.groupName}>{group.name}</p>
            <p className={css.groupDescription}>{group.description}</p>
          </div>
        </div>
        <p className={css.groupItemChip}>{group.members.length}</p>
      </Link>
    </li>
  );
}
