import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Scrollbars from 'react-custom-scrollbars';

const useStyles = makeStyles((theme) => ({
    legendContainer: {
        height: 200,
        width: "100%",
    }
}));

export default function LegendComponent(props) {
    const classes = useStyles();
    
    return (
        <div className={classes.legendContainer}>
            <Scrollbars>
                <Grid container direction="column" justify="flex-start" wrap="wrap">
                    <div>Hello world</div>
                </Grid>
            </Scrollbars>
        </div>
    );
}