import { useDispatch } from "react-redux";
import { updateSubscription } from "../../redux/auth/operations";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import css from "./Subscription.module.css";

export default function Subscription({ user, closeModal }) {
  const dispatch = useDispatch();
  const handleSubscribe = (e) => {
    dispatch(
      updateSubscription({ subscriptionType: e.currentTarget.dataset.plan })
    );
    closeModal();
  };
  return (
    <div className={css.contentWrapper}>
      <div className={css.contentHeader}>
        <h3>Subscriptions</h3>
      </div>
      <div className={css.mainContentWrapper}>
        <Grid container spacing={4} className={css.mainContentContainer}>
          <Grid size={{ xs: 12, lg: 6 }} sx={{ width: "100%" }}>
            <Paper>
              <Box sx={{ p: 1 }}>
                <h4 className={css.cardTitle}>Free</h4>
              </Box>
              <Divider />
              <Box sx={{ p: 1, textAlign: "center" }}>
                <span className={css.priceAttribute}>
                  <span className={css.cardPrice}>$0</span>
                  /month
                </span>
              </Box>
              <Divider />
              <Box>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>1000 Contacts</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Up to 50 contact Groups</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Up to 100 custom Tags</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Private Notes</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Real-time Updates</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ClearSharpIcon />
                    </ListItemIcon>
                    <ListItemText>Shared Workspaces</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ClearSharpIcon />
                    </ListItemIcon>
                    <ListItemText>Reminders</ListItemText>
                  </ListItem>
                </List>
              </Box>
              <Box sx={{ p: 3, textAlign: "center" }}>
                <button
                  className={css.cardBtn}
                  type="button"
                  data-plan="Free"
                  onClick={handleSubscribe}
                  disabled={user?.subscription === "Free"}
                >
                  Subscribe
                </button>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper>
              <Box sx={{ p: 1 }}>
                <h4 className={css.cardTitle}>Premium</h4>
              </Box>
              <Divider />
              <Box sx={{ p: 1, textAlign: "center" }}>
                <span className={css.priceAttribute}>
                  <span className={css.cardPrice}>$2</span>
                  /month
                </span>
              </Box>
              <Divider />
              <Box>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>5000 Contacts</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Unlimited contact Groups</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Unlimited custom Tags</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Public and private Notes</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Real-time Updates</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Shared Workspaces</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckSharpIcon sx={{ color: "rgb(130, 130, 250)" }} />
                    </ListItemIcon>
                    <ListItemText>Reminders</ListItemText>
                  </ListItem>
                </List>
              </Box>
              <Box sx={{ p: 3, textAlign: "center" }}>
                <button
                  className={css.cardBtn}
                  type="button"
                  data-plan="Premium"
                  onClick={handleSubscribe}
                  disabled={user?.subscription === "Premium"}
                >
                  Subscribe
                </button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
