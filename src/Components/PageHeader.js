import { makeStyles, Paper, Card, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
     root: {
          backgroundColor: "#fdfdff",
     },
     PageHeader: {
          padding: theme.spacing(4),
          display: "flex",
          marginBottom: theme.spacing(2),
     },
     pageIcon: {
          display: "inline-block",
          padding: theme.spacing(3),
          color: "#3c44b1",
          //   borderRadius: "1px solid #000000 !important",
     },
     pageTitle: {
          paddingLeft: theme.spacing(4),
          "& .MuiTypography-subtitle2": {
               opacity: "0.6",
          },
     },
}));

export default function PageHeader(props) {
     const classes = useStyles();
     const { title, subTitle, icon } = props;
     return (
          <Paper elevation={0} square className={classes.root}>
               <div className={classes.PageHeader}>
                    <Card className={classes.pageIcon}>{icon}</Card>
                    <div className={classes.pageTitle}>
                         <Typography variant="h6" component="div">
                              {title}
                         </Typography>
                         <Typography variant="subtitle2" component="div">
                              {subTitle}
                         </Typography>
                    </div>
               </div>
          </Paper>
     );
}
