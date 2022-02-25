import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import Map from './Map'
import Fab from '@mui/material/Fab';

const fabStyle = {
  position: 'absolute',
  bottom: 60,
  right: 60,
};

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [drawer, setDrawer] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const addData = async () => {
    try {
      const res = await addDoc(collection(db, "events"), {
        title: "Dyn added",
      });
      console.log(res);
      alert("Added with success");
    } catch (err) {
      console.error(err);
      alert("An error occured while adding data");
    }
  };

  //useEffect(() => {
  //  if (loading) return;
  //  if (!user) return navigate("/");
  //  //fetchUserName();
  //}, [user, loading]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
            <Box
              sx={{
                width: 250, //anchor === "top" || anchor === "bottom" ? "auto" : 250,
              }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              {!user ? (
                <List>
                  <ListItem button onClick={() => navigate("/login")}>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                </List>
              ) : (
                <>
                  <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map(
                      (text, index) => (
                        <ListItem button key={text}>
                          <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItem>
                      )
                    )}
                  </List>
                  <Divider />
                  <List>
                    <ListItem button onClick={() => logout()}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </>
              )}
            </Box>
          </Drawer>
          <Typography variant="title" color="inherit">
            Conflict Map
          </Typography>
        </Toolbar>
      </AppBar>
      <Map />
      <Fab sx={fabStyle} color="secondary" aria-label="add" onClick={() => navigate("/add")}>
        <AddIcon />
      </Fab>
    </div>
  );
}
export default Dashboard;
