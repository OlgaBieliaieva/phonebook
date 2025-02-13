import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import { logout, statusUpdate } from "../../redux/auth/operations";
import Modal from "../Modal/Modal";
import Profile from "../Profile/Profile";
import Subscription from "../Subscription/Subscription";
//MUI
import {
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Box,
  MenuList,
  FormControl,
  Select,
} from "@mui/material";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import SubscriptionsSharpIcon from "@mui/icons-material/SubscriptionsSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import css from "./UserMenu.module.css";

const statusEmojis = {
  workday: "💻",
  "day off": "🌞",
  vacation: "🌴",
  "sick day": "🤧",
  "not specified": "🤷‍♂️",
};

export default function UserMenu() {
  const dispatch = useDispatch();
  const { user, statusList } = useAuth();
  const { isModalOpen, toggleModal } = useModal();
  const [modalContent, setModalContent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState(user.status);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleStatusChange = (event) => {
    setUpdatedStatus(event.target.value);
    dispatch(statusUpdate(event.target.value));
  };

  const handleOpenProfile = () => {
    setAnchorEl(null);
    setModalContent(<Profile user={user} closeModal={toggleModal}/>);
    toggleModal();
  };

  const handleOpenSubscription = () => {
    setAnchorEl(null);
    setModalContent(<Subscription user={user} closeModal={toggleModal}/>);
    toggleModal();
  };

  return (
    <>
      <Stack direction="column" spacing={2} alignItems="center">
        <Tooltip title="Profile menu" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{ width: 32, height: 32 }}
            >
              {user?.name.slice(0, 1)}
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="profile-menu"
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                minWidth: 220,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiButtonBase-root:hover": {
                  cursor: "auto",
                  backgroundColor: "transparent",
                },
                "& .MuiAvatar-root": {
                  width: 48,
                  height: 48,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 16,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <span
              className={`${css.subscriptionBadge} ${
                user?.subscription === "Free"
                  ? css.freeSubscription
                  : css.premiumSubscription
              }`}
            >
              {user?.subscription}
            </span>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              <Avatar src={user?.avatar} alt={user?.name}>
                {user?.name.slice(0, 1)}
              </Avatar>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <span className={css.mainContent}>{user?.name}</span>
                <span className={css.secondaryContent}>{user?.email}</span>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className={css.secondaryContent}>Status:</span>
                <FormControl sx={{ minWidth: 143 }}>
                  <Select
                    id="status-select"
                    variant="standard"
                    value={updatedStatus}
                    onChange={handleStatusChange}
                  >
                    {statusList.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item}
                      >{`${statusEmojis[item]} ${item}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </MenuItem>
          <MenuItem
            sx={{
              p: 0,
            }}
          >
            <Divider
              sx={{
                width: "100%",
              }}
            />
          </MenuItem>
          <MenuItem
            sx={{
              p: 0,
            }}
          >
            <MenuList
              sx={{
                width: "100%",
                "& .MuiButtonBase-root:hover": {
                  cursor: "pointer",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <MenuItem onClick={handleOpenProfile}>
                <ListItemIcon>
                  <AccountCircleSharpIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleOpenSubscription}>
                <ListItemIcon>
                  <SubscriptionsSharpIcon fontSize="small" />
                </ListItemIcon>
                Subscriptions
              </MenuItem>
              <MenuItem onClick={() => dispatch(logout())}>
                <ListItemIcon>
                  <LogoutSharpIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </MenuList>
          </MenuItem>
        </Menu>
      </Stack>
      {isModalOpen && (
        <Modal onClose={toggleModal} onOpen={toggleModal}>
          {modalContent}
        </Modal>
      )}
    </>
  );
}
