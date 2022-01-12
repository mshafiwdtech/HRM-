import {
  Dashboard,
  ShowChart,
  Settings,
  LiveHelp,
  PeopleAlt,
} from "@material-ui/icons";

const sideMenu = () => {
  return [
    {
      name: "Dashboard",
      Icon: Dashboard,
      route: "/",
      accessibility: ["Super Admin", "admin", "ordinaryUser"],
    },
    {
      name: "Applicants",
      Icon: ShowChart,
      route: "/leads",
      accessibility: ["Super Admin", "admin", "ordinaryUser"],
    },
    {
      name: "Settings",
      Icon: Settings,
      route: "/settings",
      accessibility: ["Super Admin","Admin"],    //["admin", "ordinaryUser"],
    },
    {
      name: "Users",
      Icon: PeopleAlt,
      route: "/Users",
      accessibility: ["Super Admin","Admin"], //["admin", "ordinaryUser"]
    },
   
  ];
};

export default sideMenu;
