import React, { useDebugValue } from "react";
import { makeStyles } from '@material-ui/core/styles';
import plugins from "../appPlugins.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Scrollbars from 'react-custom-scrollbars';
import Slide from '@material-ui/core/Slide';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

// Import retract button custom component
import RetractButton from './RetractButton.js';

const useStyles = makeStyles((theme) => ({
    pluginMenuContainer: {
        position: "absolute",
        right: 0,
        bottom: 80,
        zIndex: 1,
        minWidth: 140, // At least 150px adding in padding
        width: "12%",
        minHeight: 170, // At least 180px adding in padding
        height: "60%",
        display: "flex",
        justifyContent: "flex-start",
        flexFlow: "column",
        alignItems: "stretch",
        padding: 3,
        transform: "translate(0%, -50%)",
        borderTopStyle: "ridge",
        borderBottomStyle: "ridge",
        borderLeftStyle: "ridge",
        borderColor: theme.palette.border,
        backgroundImage: theme.palette.backgroundImage.main,
        WebkitBorderImage: theme.palette.borderImage
    },
    accordionContainer: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    accordionSummary: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    accordionDetails: {
        padding: 0,
    },
    accordionHelp: {
        marginLeft: 5,
    }
}));

export default function PluginMenuComponent(props) {
    const classes = useStyles();
    const [display, setDisplay] = React.useState(true);
    let accordionItems = [];
    for (const [name, value] of Object.entries(plugins)) {
        const Plugin = value.component;
        accordionItems.push(
            <Accordion defaultExpanded key={name} square>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionSummary} IconButtonProps={{ size: "small" }}>
                    <Typography variant="body2">{name}</Typography>
                    <Tooltip
                        title={value.help}
                    >
                        <div className={classes.accordionHelp}>
                            <HelpOutlineIcon fontSize="small"/>
                        </div>
                    </Tooltip>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <Plugin app={props.app} />
                </AccordionDetails>
            </Accordion>
        );
    }
    return (
        <Slide direction="left" in={display} unmountOnExit={false} mountOnEnter={false}>
            <div className={classes.pluginMenuContainer} id="plugin_menu">
                <Scrollbars>
                    <div className={classes.accordionContainer}>
                        {accordionItems}
                    </div>
                </Scrollbars>
                <RetractButton direction="right" top={"50%"} left={-6} checked={display} onClick={() => setDisplay(!display)} />
            </div>
        </Slide>
    );
}