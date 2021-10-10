import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';

// Import scenarios
import scenarios from "../assets/scenario/scenarios.js";
import comScenarios from "../assets/communityScenario/comScenarios.js";

// Setup styles
const useStyles = makeStyles((theme) => ({
    scenarioContainer: {
        backgroundColor: theme.palette.background.paper,
        width: "calc(100% - 10px)", // This subtraction corresponds to the padding of the parent
        padding: 5,
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    scenarioSelect: {
        fontSize: 12,
        width: "calc(100% - 10px)",
    }
}));

// Load file 
function ScenarioPluginComponent(props) {
    const classes = useStyles();
    const [selectedScenario, setSelectedScenario] = React.useState(Object.keys(scenarios)[0]);
    return (
        <div id="scenario" className={classes.scenarioContainer}>
            <Select
                value={selectedScenario}
                className={classes.scenarioSelect}
                onChange={e => {setSelectedScenario(e.target.value);}}
            >
                <ListSubheader>Base Scenarios</ListSubheader>
                {Object.keys(scenarios).map(key => <MenuItem key={key} value={key}>
                    {key}
                </MenuItem>)}
                <ListSubheader>Community-made Scenarios</ListSubheader>
                {Object.keys(comScenarios).map(key => <MenuItem key={key} value={key}>
                    {key}
                </MenuItem>)}
            </Select>
            <Button size="small" onClick={() => {
                // Load save from appropriate dictionary based on what dictionary the key is in TODO: this is not the most efficient way to do it IMO, better to use I gess some label for quicker access
                if (selectedScenario in scenarios) {
                    props.app.loadSave(scenarios[selectedScenario]);
                } else {
                    props.app.loadSave(comScenarios[selectedScenario]);
                }
            }}>Load</Button>
        </div>
    );
}

const initState = scenarioData => {
    return null;
};

const ScenarioPluginDict = {
    component: ScenarioPluginComponent,
    initState: initState,
    help: "For loading several premade scenarios.",
    functions: {}
};

export default ScenarioPluginDict;