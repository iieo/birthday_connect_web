
  

  import { useState } from "react";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { signInWithPopup } from "firebase/auth";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { useNavigate } from "react-router-dom";
  import { auth, Providers } from "../../config/firebase";
  import { Button, TextField, Typography } from "@mui/material";
  import GoogleIcon from "@mui/icons-material/Google";
  import Center from "../utils/Center";

  interface Props {
    action: string;
  }

  const AuthContainer = (props: Props) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const signInWithGoogle = () => {
      setDisabled(true);
      signInWithPopup(auth, Providers.google)
        .then(() => {
          setDisabled(false);
          console.info("TODO: navigate to authenticated screen");
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
          setDisabled(false);
        });
    };

    const signInWithEmail = () => {
      setDisabled(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setDisabled(false);
          console.info("TODO: navigate to authenticated screen");
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
          setDisabled(false);
        });
    };

    const signUpWithEmail = () => {
      setDisabled(true);
      if (password !== passwordRepeat) {
        setErrorMessage("Passwords do not match");
        setDisabled(false);
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setDisabled(false);
          console.info("TODO: navigate to authenticated screen");
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
          setDisabled(false);
        });
    };

    return (
      <Center height={"auto"}>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {props.action !== "login" && (
          <TextField
            label="Repeat Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        )}
        <Button
          sx={{ mt: 2 }}
          size="large"
          disabled={disabled}
          variant="contained"
          onClick={props.action === "login" ? signInWithEmail : signUpWithEmail}
        >
          {props.action === "login" ? "Sign In With Email" : "Sign Up With Email"}
        </Button>
        <Button
          sx={{ mt: 2 }}
          startIcon={<GoogleIcon />}
          size="large"
          disabled={disabled}
          variant="contained"
          onClick={signInWithGoogle}
        >
          Sign In With Google
        </Button>
        <Typography sx={{ mt: 2 }} color={"red"}>
          {errorMessage}
        </Typography>
      </Center>
    );
  };

  export default AuthContainer;
