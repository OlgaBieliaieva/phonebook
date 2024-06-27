import GroupListItem from 'components/GroupListItem/GroupListItem';
import css from './GroupsList.module.css';

export default function GroupsList({ groups }) {
  return (
    <ul className={css.groupsList}>
      {groups.map((group, index) => (
        <GroupListItem
          key={index}
          group={group}          
        />
      ))}
    </ul>
  );
}
