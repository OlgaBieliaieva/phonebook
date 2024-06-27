import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
// MUI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();

export default function SignupForm() {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const newUser = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
      avatar: form.elements.name.value.slice(0, 1),
    };

    dispatch(register({ ...newUser }));
    form.reset();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        component={'section'}
        container
        sx={{
          width: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            my: 4,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
              type="text"
              name="name"
              id="name"
              label="Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              name="email"
              id="email"
              label="Email Address"
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Link to="/">Already have an account? Sign In</Link>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
