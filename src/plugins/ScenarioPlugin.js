import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';

// Import scenarios
import scen356BC from "../assets/scenario/356BC-Birth-of-Alexander.json";
import scen1206 from "../assets/scenario/1206-Rise-of-Mongolia.json";
import scen1444 from "../assets/scenario/1444-Battle-of-Varna.json";
import scen1936 from "../assets/scenario/1936-Coming-of-the-Storm.json"

// Import community scenarios; this is where to import; put the files in src/assets/communityScenario, import them here, then add them to the scenarios dictionary below
import scen1914 from "../assets/communityScenario/1914-WWI.json";
import scen2021 from "../assets/communityScenario/2021-Modern-Map-made-by-DawnbreakZ-edited-by-yunus3663.json";

// Import json scenarios, keys should be names that will be displayed for the scenario
const scenarios = {
    "356BC Birth of Alexander": scen356BC,
    "1206 Rise of Mongolia": scen1206,
    "1444 Battle of Varna": scen1444,
    "1936 Coming of the Storm": scen1936,
};

const comScenarios = {
    "1914 WWI": scen1914,
    "2021 Modern Map made by DawnbreakZ edited by yunus3663": scen2021,
}

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