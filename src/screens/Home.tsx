import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../components/auth/Logout";
import Center from "../components/utils/Center";

interface Props {}

const Home = ({}: Props) => {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Center>
      <Link to="/profile">Go to Profile</Link>
      <br />
      <Link to="/list">Go to List</Link>
      <br />
      <Logout />
    </Center>
  );
};

export default Home;
