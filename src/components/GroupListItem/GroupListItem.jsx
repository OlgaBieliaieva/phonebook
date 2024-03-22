import { Link } from 'react-router-dom';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import css from './GroupListItem.module.css';

export default function GroupListItem({ group, contactsInGroup }) {
  return (
    <li className={css.groupItem}>
      <Link to={group} className={css.groupItemLink}>
        <div className={css.groupItemNameWrapper}>
          <GroupsSharpIcon className={css.groupItemIcon} />
          <p>{group}</p>
        </div>
        <p className={css.groupItemChip}>{contactsInGroup.length}</p>
      </Link>
    </li>
  );
}
