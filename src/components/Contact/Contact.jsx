import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import TagSharpIcon from '@mui/icons-material/TagSharp';
import PhoneEnabledSharpIcon from '@mui/icons-material/PhoneEnabledSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import SpeakerNotesSharpIcon from '@mui/icons-material/SpeakerNotesSharp';
import { Tooltip } from '@mui/material';
import { Avatar } from '@mui/material';
import css from './Contact.module.css';

export default function Contact({ contact }) {
  return (
    <div className={css.contactWrapper}>
      <div className={css.mainInfoWrapper}>
        <ul className={css.toolsList}>
          <li>
            <Tooltip>
              <button className={css.toolsBtn}>
                <EditSharpIcon className={css.btnIcon} />
              </button>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <button className={css.toolsBtn}>
                <DeleteForeverSharpIcon className={css.btnIcon} />
              </button>
            </Tooltip>
          </li>
        </ul>
        <div className={css.mainInfo}>
          <Avatar className={css.avatar}>
            <img src={contact.avatar} alt={contact.firstName} />
          </Avatar>
          <p
            className={css.contactName}
          >{`${contact.firstName} ${contact.middleName} ${contact.lastName}`}</p>
          <p
            className={css.contactRole}
          >{`${contact.jobTitle} | ${contact.company}`}</p>
        </div>
        <ul>
          <li>
            <GroupSharpIcon />
            <ul>
              {contact.groups.map(group => (
                <li>{group}</li>
              ))}
            </ul>
          </li>
          <li>
            <TagSharpIcon />
            <ul>
              {contact.tags.map(tag => (
                <li>{tag}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <ul className={css.fullInfoWrapper}>
        <li className={css.infoItem}>
          <PhoneEnabledSharpIcon />
          <p className={css.itemContent}>{contact.phone}</p>
        </li>
        <li className={css.infoItem}>
          <EmailSharpIcon />
          <p className={css.itemContent}>{contact.email}</p>
        </li>
        <li className={css.infoItem}>
          <CakeSharpIcon />
          <p className={css.itemContent}>{contact.birthday}</p>
        </li>
        <li className={css.infoItem}>
          <SpeakerNotesSharpIcon />
          <p className={css.itemContent}>{contact.note}</p>
        </li>
      </ul>
    </div>
  );
}
