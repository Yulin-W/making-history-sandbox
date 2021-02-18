// Import React
import { makeStyles } from '@material-ui/core/styles';

// Import default basemap geojson
import mapAdmin from "../assets/basemap/mapAdmin.json";

const useStyles = makeStyles(theme => ({
    map: {
        zIndex: 0
    },
}));

export default function MapComponent(props) {
    const classes = useStyles();

    return (
        <div>
        </div>
    );
}