import { makeStyles } from "@material-ui/core";
import React from "react";

// withStyle  & makeStyles

const useStyles = makeStyles({
          SideMenu: {
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    left: "0",
                    width: "320px",
                    height: "100%",
                    backgroundColor: "#253053",
          },
});

export default function SideMenu() {
          const classes = useStyles();

          return <div className={classes.SideMenu}></div>;
}
