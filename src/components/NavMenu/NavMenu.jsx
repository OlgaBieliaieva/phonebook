import { Link } from "react-router-dom";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import {
  ContactsSharp as ContactsIcon,
  GroupSharp as GroupIcon,
  TagSharp as TagIcon,
  NotificationsSharp as NotificationsIcon,
  CalendarMonthSharp as CalendarIcon,
  QuestionMarkSharp as HelpIcon,
  SettingsSharp as SettingsIcon,
  HomeSharp as HomeIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import css from "./NavMenu.module.css";

export default function NavMenu() {
  const { isModalOpen, toggleModal } = useModal();
  const theme = useTheme();

  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Contacts", path: "contacts", icon: <ContactsIcon /> },
    { label: "Groups", path: "groups", icon: <GroupIcon /> },
    { label: "Tags", action: toggleModal, icon: <TagIcon /> },
    {
      label: "Notifications",
      action: toggleModal,
      icon: <NotificationsIcon />,
    },
    { label: "Calendar", action: toggleModal, icon: <CalendarIcon /> },
    { label: "Support", action: toggleModal, icon: <HelpIcon /> },
    { label: "Settings", action: toggleModal, icon: <SettingsIcon /> },
  ];

  return (
    <>
      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            {item.path ? (
              <Link to={item.path} style={{ width: "100%" }}>
                <ListItemButton
                  sx={{
                    color: theme.palette.text.primary,
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.palette.text.primary,
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip title={item.label} arrow>
                      {item.icon}
                    </Tooltip>
                  </ListItemIcon>
                </ListItemButton>
              </Link>
            ) : (
              <ListItemButton
                onClick={item.action}
                sx={{
                  color: theme.palette.text.primary,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.text.primary,
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title={item.label} arrow>
                    {item.icon}
                  </Tooltip>
                </ListItemIcon>
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>

      {isModalOpen && (
        <Modal onClose={toggleModal} onOpen={toggleModal}>
          <div className={css.modalContent}>
            <p>This feature is under development</p>
          </div>
        </Modal>
      )}
    </>
  );
}
