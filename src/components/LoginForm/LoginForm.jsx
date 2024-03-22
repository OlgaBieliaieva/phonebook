import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from 'redux/operations';
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

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;

    if (
      form.elements.email.value !== '' &&
      form.elements.password.value !== ''
    ) {
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
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
