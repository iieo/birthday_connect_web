import Home from "../screens/Home";
import Login from "../screens/Login";
import BirthdayList from "../screens/BirthdayList";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "",
    component: Home,
    name: "Home Screen",
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Screen",
    protected: false,
  },
  {
    path: "list",
    component: BirthdayList,
    name: "Birthday List Screen",
    protected: true,
  }
];

export default routes;
