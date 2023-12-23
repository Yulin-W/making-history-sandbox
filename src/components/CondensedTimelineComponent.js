// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Scrollbars from 'react-custom-scrollbars-2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CondensedTimelineAddButton from "./CondensedTimelineAddButton.js";
import CondensedTimelineDeleteButton from "./CondensedTimelineDeleteButton.js"

// Import retract button custom component
import RetractButton from './RetractButton.js';

const useStyles = makeStyles((theme) => ({
    condensedTimelineContainer: {
      position: "absolute",
      left: 0,
      bottom: 309, // This value should be such that the event box touches the play bar
      minWidth: 140,
      width: "20%",
      height: 400,
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
      WebkitBorderImage: theme.palette.borderImage,
    },
    tableHeading: {
      fontSize: 14,
      overflowWrap: "break-word",
      hyphens: "auto",
      padding: 5,
    },
    tableCell: {
      fontSize: 10,
      overflowWrap: "anywhere",
      padding: 5,
    },
    dateColumn: {
      width: 80,
    },
    eventColumn: {
    },
    notCurrentTableEntry: {
      opacity: 1,
      border: 7,
      borderLeftStyle: "none",
    },
    currentTableEntry: {
      border: 7,
      borderColor: theme.palette.tableRowFocusColor,
      borderLeftStyle: "solid",
    },
    tableEntry: {
      position: "relative",
      height: 25,
    },
    tableEnd: {
      position: "relative",
      height: 10,
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
                      <TableRow key={"table_head"}>
                        <TableCell key={"date_cell_head"} className={classes.tableHeading + ' ' + classes.dateColumn}>Date</TableCell>
                        <TableCell key={"event_cell_head"} className={classes.tableHeading + ' ' + classes.eventColumn} align="left">Event</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.scenarioData.map((entry, index) => (
                        <TableRow
                          id={"table_row_" + index}
                          key={"table_row_" + index}
                          className={
                            classes.tableEntry + " " +
                            (index === props.activeEntry ? classes.currentTableEntry : classes.notCurrentTableEntry)
                          }
                          hover={true}
                          onClick={() => {props.updateActiveEntry(index)}}
                        >
                          <TableCell key={"date_cell_" + index} className={classes.tableCell + ' ' + classes.dateColumn}>
                            {entry.date}
                          </TableCell>
                          <TableCell key={"event_cell_" + index} className={classes.tableCell + ' ' + classes.eventColumn} align="left">
                            {entry.event}
                          </TableCell>
                          <CondensedTimelineDeleteButton themeDict={props.themeDict} deleteEntry={props.deleteEntry} index={index} disabled={props.oneEntryLeft}/>
                          <CondensedTimelineAddButton themeDict={props.themeDict} addEntry={props.addEntry} index={index}/>
                        </TableRow>
                      ))}
                      <TableRow key={"table_end"} className={classes.tableEnd}>
                          <TableCell key={"date_cell_table_end"}/>
                          <TableCell key={"event_cell_table_end"}/>
                      </TableRow>
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