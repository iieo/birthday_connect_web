
import React, { useContext, useState } from "react";
import Center from "../components/utils/Center";
import { Avatar, Box, Button, Divider, TextField } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { UserContext } from "../firebase/UserManagement";
import { User } from "../firebase/user";

interface Props {}


const ProfilePage = ({}: Props) => {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState<Dayjs | null>(dayjs("2022-04-17"));
    const user : User | null = useContext(UserContext);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = async () => { 
      if (!user) {
        console.error("User not found");
        return;
      }
      user.name = name;
      if (birthday) {
        user.birthday = birthday;
      }
      await user.saveProfile();
    };

    return (
      <Center>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 200, height: 200 }} />
          <Divider sx={{ my: 2 }} />
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              sx={{ mt: 2 }}
              label="Your Birthday"
              value={birthday}
              onChange={(newValue) => setBirthday(newValue)}
              format="LL"
            />
          </LocalizationProvider>
          <Button
            sx={{ mt: 2, width: "100%", backgroundColor: "#ed4247" }}
            size="large"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Center>
    );
};

export default ProfilePage;
