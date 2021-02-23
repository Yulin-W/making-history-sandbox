import { makeStyles } from '@material-ui/core/styles';
import plugins from "../appPlugins.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Scrollbars from 'react-custom-scrollbars';

const useStyles = makeStyles((theme) => ({
    pluginMenuContainer: {
        position:"absolute",
        right: 0,
        top: "50%",
        zIndex: 1,
        minWidth: 190, // At least 200px adding in padding
        width: "12%",
        minHeight: 240, // At least 250px adding in padding
        height: "70%",
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
        paddingRight: 12,
    },
    accordionSummary: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    accordionDetails: {
        padding: 0,
    },
}));

export default function PluginMenuComponent(props) {
    const classes = useStyles();
    let accordionItems = [];
    for (const [name, value] of Object.entries(plugins)) {
        const Plugin = value.component;
        accordionItems.push(
            <Accordion defaultExpanded key={name} square>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} className={classes.accordionSummary} IconButtonProps={{size:"small"}}>
                    <Typography>{name}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <Plugin app={props.app}/>
                </AccordionDetails>
            </Accordion>
        );
    }
    return (
        <div className={classes.pluginMenuContainer}>
            <Scrollbars>
                <div className={classes.accordionContainer}>
                    {accordionItems}
                </div>
            </Scrollbars>
        </div>
    );
}