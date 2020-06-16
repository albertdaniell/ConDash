import { makeStyles, useTheme } from "@material-ui/core/styles";
const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
     backgroundColor:'red'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  textInput: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    marginTop: 10,
  },
  textHead: {
    textAlign: "left",
    marginBottom: 40,
  },
  textHead2: {
    textAlign: "left",
    marginBottom: 20,
    fontSize: 17,
    marginTop: 30,
  },
  textInputLabel: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 10,
    fontWeight: "bold",
  },
  submitBtn: {
    marginTop: 20,
  },
  imageDiv: {
    width: 200,
    height: 200,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
}));
