// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Scrollbars from 'react-custom-scrollbars';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Import retract button custom component
import RetractButton from './RetractButton.js';

const useStyles = makeStyles((theme) => ({
    condensedTimelineContainer: {
        position: "absolute",
        left: 0,
        bottom: 309, // This value should be such that the event box touches the play bar
        minWidth: 140,
        width: "20%",
        height: 500,
        zIndex: 1,
        display: "flex",
        flexFlow: "column",
        alignItems: "stretch",
        padding: 5,
        borderRightStyle: "ridge",
        borderTopStyle: "ridge",
        borderBottomStyle: "ridge",
        borderColor: theme.palette.border,
        backgroundImage: theme.palette.backgroundImage.main,
        WebkitBorderImage: theme.palette.borderImage
    },
    tableHeading: {
      fontSize: 14,
      overflowWrap: "break-word",
      hyphens: "auto",
      padding: 5,
    },
    tableCell: {
      fontSize: 11,
      overflowWrap: "break-word",
      hyphens: "auto",
      padding: 5,
    },
    dateColumn: {
      maxWidth: 70,
      minWidth: 70,
    },
    notCurrentTableEntry: {
      opacity: 0.5,
    },
    currentTableEntry: {
      border: 7,
      borderColor: theme.palette.tableRowFocusColor,
      borderLeftStyle: "solid",
    }
}));

function CondensedTimelineComponent(props) {
    const classes = useStyles();
    const [display, setDisplay] = React.useState(true);

    return (
        <Slide direction="right" in={display} unmountOnExit={false} mountOnEnter={false}>
            <div className={classes.condensedTimelineContainer} id="condensed_timeline">
              <Scrollbars>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeading + ' ' + classes.dateColumn}>Date</TableCell>
                        <TableCell className={classes.tableHeading} align="left">Event</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.scenarioData.map((entry, index) => (
                        <TableRow
                          className={index == props.activeEntry ? classes.currentTableEntry : classes.notCurrentTableEntry}
                        >
                          <TableCell key={index + "DateCell"} className={classes.tableCell + ' ' + classes.dateColumn}>
                            {entry.date}
                          </TableCell>
                          <TableCell key={index + "EventCell"} className={classes.tableCell} align="left">
                            {entry.event}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbars>
              <RetractButton direction="left" top={"50%"} left={"calc(100% + 6px)"} checked={display} onClick={() => setDisplay(!display)} />
            </div>
        </Slide>
    );
}

export default React.memo(CondensedTimelineComponent);