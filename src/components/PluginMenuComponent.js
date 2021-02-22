import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    pluginMenuContainer: {
        position:"absolute",
        right: 0,
        top: "50%",
        zIndex: 1,
        minWidth: 190, // At least 200px adding in padding
        width: "20%",
        minHeight: 240, // At least 250px adding in padding
        height: "60%",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexFlow: "column",
        alignItems: "stretch",
        padding: 5,
        transform: "translate(0%, -50%)",
    }
}));

export default function PluginMenuComponent(props) {
    const classes = useStyles();
    console.log(props.api.state.activeEntry);
    return (
        <div>
            <div className={classes.pluginMenuContainer}>
            </div>
        </div>
    );
}