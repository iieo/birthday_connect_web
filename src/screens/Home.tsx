import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../components/auth/Logout";
import Center from "../components/utils/Center";
import { Avatar, Box, Card, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { UserContext } from "../firebase/UserManagement";
import { User } from "../firebase/user";
import dayjs from "dayjs";

interface Props {}

const Home = ({}: Props) => {
  const user = useContext(UserContext)

  const createListItem = (friend: User) => (
    <ListItem
      key={friend.birthday.toISOString() + friend.name + Math.random()}
      sx={{
        backgroundColor: "#ed4247",
        width: "100%",
        borderRadius: 2,
        my: 1,
      }}
    >
      <ListItemAvatar>
        <Avatar></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h6" color="#f7f7f7">
            {friend.name}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="#f7f7f7">
            {friend.birthday.format("DD.MM.YYYY")}
          </Typography>
        }
      />
    </ListItem>
  );

  const getNextBirthday = () => {
    const sortedFriends = user?.friends.sort((a, b) => a.birthday.diff(b.birthday));
    return sortedFriends && sortedFriends.length > 0 ? sortedFriends[0] : null;
  }

  return (
    <div style={{ display: "flex", width: "100%", height: "93.2vh" }}>
      <Box
        sx={{
          backgroundColor: "#f7f7f7",
          display: "flex",
          alignItems: "center",
          width: "50%",
          padding: 2,
        }}
      >
        <List sx={{ width: "100%" }}>{user?.friends.map(createListItem)}</List>
      </Box>
      <Box
        sx={{
          backgroundColor: "#ed4247",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          padding: 4,
        }}
      >
        <div style={{ width: "100%", padding: 2, backgroundColor: "#ed4247" }}>
          <Typography variant="h3" color="#f7f7f7" sx={{ flexGrow: 1 }}>
            Next birthday:
          </Typography>
          <Typography variant="h5" color="#f7f7f7" sx={{ flexGrow: 1 }}>
            {getNextBirthday()?.name ?? "No friends added yet"}
          </Typography>
          <Typography variant="h5" color="#f7f7f7" sx={{ flexGrow: 1 }}>
            {getNextBirthday()?.birthday.format("DD.MM.YYYY") ?? ""}
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default Home;
