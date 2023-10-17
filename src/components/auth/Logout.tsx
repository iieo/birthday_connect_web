import React, { useState } from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

interface Props {
  navigateTo?: string;
}

const Logout = ({ navigateTo = "/login" }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    setDisabled(true);
    try {
      await signOut(auth);
      navigate(navigateTo);
    }catch(error){
        console.error(error);
        setDisabled(false);
    }
  };

  return (
    <div>
      <Button color="inherit" disabled={disabled} onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
