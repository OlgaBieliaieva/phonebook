import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../redux/auth/operations";
//MUI
import { Stack, Avatar, IconButton, Tooltip } from "@mui/material";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

export default function UserMenu() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Avatar>{user?.avatar}</Avatar>
      <Tooltip title="Exit" arrow>
        <IconButton
          type="button"
          onClick={() => dispatch(logout())}
          sx={{ color: "#fff", marginTop: 0 }}
        >
          <LogoutSharpIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
