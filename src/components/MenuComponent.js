import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import saveScenario from '../scripts/saveScenario.js';

const useStyles = makeStyles((theme) => ({
    menuContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 25,
        width: 150,
        zIndex: 1,
        backgroundColor: theme.palette.background.default,
        borderBottomRightRadius: 50,
        display: "flex",
        flexFlow: "row",
        justifyContent: "flex-start",
        alignContent: "center"
    },
    menuButton: {
        fontSize: 12,
        margin: 0,
        padding: 0,
    }
}));

export default function MenuComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.menuContainer}>
            <Button size="small" className={classes.menuButton} onClick={() => {saveScenario(props.data);}}>Save</Button>
            <Button size="small" className={classes.menuButton}>Load</Button>
        </div>
    );
}