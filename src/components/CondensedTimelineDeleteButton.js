import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    deleteIconButtonContainerCondensedTimeline: {
        position: "absolute",
        right: 0,
        bottom: 0,
        padding: 0,
        zIndex: 1,
        transform: "scale(0.8)"
    },
    deleteIconButtonCondensedTimeline: {
        padding: 0,
        zIndex: 2,
        color: theme.palette.text.secondary,
    },
}));

export default function CondensedTimelineDeleteButton(props) {
    const classes = useStyles();
    return (
        <td>
            <div className={classes.deleteIconButtonContainerCondensedTimeline}>
                <IconButton size="small" className={classes.deleteIconButtonCondensedTimeline} disabled={props.disabled} onClick={(e) => { props.deleteEntry(props.index); e.stopPropagation();}}>
                    {/*This is the fake button for visuals only*/}
                    <ClearIcon></ClearIcon>
                </IconButton>
            </div>
        </td>
    );
}