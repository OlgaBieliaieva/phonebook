import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import TagSharpIcon from '@mui/icons-material/TagSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import { Link } from 'react-router-dom';
// import { useAuth } from 'hooks/useAuth';

export default function NavMenu() {
  // const { user } = useAuth();
  return (
    <List
      sx={{
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <ListItem
        key={'Home'}
        disablePadding
        sx={{
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link
          to="/"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ListItemButton
            sx={{
              padding: 0,
              maxWidth: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ListItemIcon
              sx={{
                color: '#fff',
                minWidth: '40px',
                maxWidth: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Tooltip title="Home" arrow>
                <HomeSharpIcon />
              </Tooltip>
            </ListItemIcon>
          </ListItemButton>
        </Link>
      </ListItem>

      <ListItem
        key={'Contacts'}
        disablePadding
        sx={{
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link
          to="all"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ListItemButton
            sx={{
              padding: 0,
              maxWidth: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ListItemIcon
              sx={{
                color: '#fff',
                minWidth: '40px',
                maxWidth: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Tooltip title="Contacts" arrow>
                <ContactsSharpIcon />
              </Tooltip>
            </ListItemIcon>
          </ListItemButton>
        </Link>
      </ListItem>

      <ListItem
        key={'Groups'}
        disablePadding
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ListItemButton sx={{ padding: 0, width: '100%' }}>
          <ListItemIcon
            sx={{
              color: '#fff',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tooltip title="Groups" arrow>
              <GroupSharpIcon />
            </Tooltip>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <ListItem
        key={'Tags'}
        disablePadding
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ListItemButton sx={{ padding: 0, width: '100%' }}>
          <ListItemIcon
            sx={{
              color: '#fff',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tooltip title="Tags" arrow>
              <TagSharpIcon />
            </Tooltip>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <ListItem
        key={'Notifications'}
        disablePadding
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ListItemButton sx={{ padding: 0, width: '100%' }}>
          <ListItemIcon
            sx={{
              color: '#fff',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tooltip title="Notifications" arrow>
              <NotificationsSharpIcon />
            </Tooltip>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <ListItem
        key={'Calendar'}
        disablePadding
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ListItemButton sx={{ padding: 0, width: '100%' }}>
          <ListItemIcon
            sx={{
              color: '#fff',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tooltip title="Calendar" arrow>
              <CalendarMonthSharpIcon />
            </Tooltip>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <ListItem
        key={'Support'}
        disablePadding
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ListItemButton sx={{ padding: 0, width: '100%' }}>
          <ListItemIcon
            sx={{
              color: '#fff',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tooltip title="Support" arrow>
              <QuestionMarkSharpIcon />
            </Tooltip>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <ListItem
        key={'Settings'}
        disablePadding
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ListItemButton sx={{ padding: 0, width: '100%' }}>
          <ListItemIcon
            sx={{
              color: '#fff',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tooltip title="Settings" arrow>
              <SettingsSharpIcon />
            </Tooltip>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
