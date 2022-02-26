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
import Map from "./Map";
import Fab from "@mui/material/Fab";
import { Modal } from "@mui/material";
import Slider from "./Slider";

const fabStyle = {
  position: "absolute",
  bottom: 60,
  right: 60,
};

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState(null);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "events"));
      const col = await getDocs(q);

      setMarkers(
        col.docs.map((doc) => {
          const data = doc.data();
          return {
            lat: data.latlng[0],
            lng: data.latlng[1],
            data: data
          };
        })
      );
    })();
  }, []);

  console.log(selectedMarker)

  return (
    <>
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
      <Slider />
      <Map markers={markers} setSelectedMarker={setSelectedMarker} />
      
      <Fab
        sx={fabStyle}
        color="secondary"
        aria-label="add"
        onClick={() => navigate("/add")}
      >
        <AddIcon />
      </Fab>

      <Modal
        open={!!selectedMarker}
        onClose={() => setSelectedMarker(null)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            width: 400,
          }}
        >
          <h2 id="parent-modal-title">{selectedMarker?.title}</h2>
          <img
            src={selectedMarker?.imgurl}
            loading="lazy"
            alt="img"
            style={{width: "100%", borderRadius: "10px"}}
          />
          <p id="parent-modal-description">
            {selectedMarker?.desc}
          </p>
        </Box>
      </Modal>
    </>
  );
}
export default Dashboard;
