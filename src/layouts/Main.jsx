import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuList from "../company/sideMenu";
import Drawer from "@material-ui/core/Drawer";
import AppMeta from "../company/appMeta.json";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LogoD from '../assets/logod.png'
import ProfileAvatar from "./ProfileAvatar";
const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflowY: 'hidden'
  },
  link: {
    textDecoration: "none",
    color: "#626262",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  logoutIcon: {
    marginLeft: "auto",
    display: "flex",
  },
  dialog: {
    position: "absolute",
    left: 10,
    top: 10,
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { firstName, role } = JSON.parse(localStorage.getItem("epitomeUser"));


  return (
    <div className={classes.root} style={{backgroundColor:"#ECF1F9",minHeight:"100vh"}}>
      <CssBaseline />
      <AppBar
        style={{backgroundColor:'green'}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <h2 style={{color:'white',alignSelf:'center',justifyContent:'center',margin:5,}}>HRM</h2>
          {/* <img src={LogoD} alt="" /> */}
          <div className={classes.logoutIcon}>
            <div style={{ margin: 15 }}>
              {role ? <Typography variant="h6" style={{color:"white"}}>{role}</Typography> : null}
            </div>

            <ProfileAvatar />
            <div style={{ marginTop: 15 }}>
              {firstName ? <Typography variant="h6" style={{color:"white"}}>{firstName}</Typography> : null}
            </div>
          </div>
        </Toolbar>
      </AppBar>

     <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List >
          {MenuList().map(({ name, Icon, route, accessibility }, index) => (
            name==='Users' || name==='Settings' ? accessibility.find((item)=>item===role)===undefined ? null :
            <Link key={name} className={classes.link} to={route}>
              <ListItem button key={name}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={name} /> 
                </ListItem>
            </Link> :
            <Link key={name} className={classes.link} to={route}>
            <ListItem button key={name}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={name} /> 
              </ListItem>
          </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
