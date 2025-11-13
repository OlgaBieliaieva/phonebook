import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  console.log(theme);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.elements.email.value && form.elements.password.value) {
      dispatch(
        login({
          email: form.elements.email.value,
          password: form.elements.password.value,
        })
      );
      form.reset();
    }
  };

  return (
    <Grid
      component="section"
      container
      sx={{
        width: "100%",
        justifyContent: "center",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 2,
        boxShadow: theme.shadows[3],
        p: 4,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          my: 2,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            name="email"
            id="email"
            label="Email Address"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Sign In
          </Button>

          <Grid container justifyContent="center">
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
