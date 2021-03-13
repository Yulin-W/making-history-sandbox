import React from 'react';

const steps = [
    {
        target: 'body',
        content: 
        <React.Fragment>
            <p>FAQ: Removing borders: set region border width to 0 in theme panel on the right</p>
            <hr/>
            <p>Welcome to Making History Sandbox! Click next for the tutorial.</p>
            <hr/>
            <p>***NEW FEATURES***</p>
            <p>Adding markers to the map with tooltips (can open multiple at the same time) and custom colors, see side panel</p>
            <p>Map region theme customizability, including region border thickness (polyStrokeWeight), fill opacity, etc.</p>
            <hr/>
            <p>If you are willing to share you scenario, feel free to send it to Yulin-W@outlook.com. If you want attribution, send the name you want as well.</p>
            <hr/>
            <p>Making custom regions: <a href="https://github.com/Yulin-W/making-history-sandbox/blob/main/customRegionTutorial.md" target="_blank">Custom Region Tutorial</a></p>
            <hr/>
            <p>See acknowledgements at the end of the tutorial</p>
            <p><a href="https://github.com/Yulin-W/making-history-sandbox">Github</a></p>
        </React.Fragment>,
        placement: 'center'
    },
    {
        target: '#colorbar',
        content: 'Choose your color using the various methods provided, for instance the slider or the RGB input.'
    },
    {
        target: '#toolbar',
        content: 'Use erase for removing colors, lasso for mass colouring, and pick for picking colors from the map.'
    },
    {
        target: '#map',
        content: 'This is the map. To color/erase color, click the region. Or, if lasso is used, click and hold to select regions.',
    },
    {
        target: '.leaflet-control-layers',
        content: 'This is where you change the background map and switch on/off the regions.'
    },
    {
        target: '#timeline_bar',
        content: 'This is the timeline. To add a timepoint, click the + in intended position. The added timepoint will inherit the region colors of the preceding timepoint. To go to a timepoint, click on it.',
    },
    {
        target: '#timeline_event',
        content: 'This is where you edit the date label and event description of the timepoint. Clear empties the date/event entry (not the map colors though). Delete removes the current timepoint.',
    },
    {
        target: '#plugin_menu',
        content: "This is where additional functionalities are, we'll just mention a few.",
    },
    {
        target: '#theme_panel',
        content: 'Adjust various theming options here; notably, polyStrokeWeight decides region border width, and poly in general refers to the polygons of the map.',
    },
    {
        target: '#geojson_loader',
        content: 'Load your custom region file or save here, for tutorial see https://github.com/Yulin-W/making-history-sandbox/blob/main/customRegionTutorial.md',
    },
    {
        target: '#menu',
        content: 'This is the menu bar. I guess there is not much to say.'
    },
    {
        target: 'body',
        content: <React.Fragment>
            <p>Acknowledgements</p>
            <p>"mapAdmin.json" (geojson basemap for the regions) was modified from: Natural Earth. Free vector and raster map data @ naturalearthdata.com.</p>
            <p>Community contributed scenarios: Thanks to the following members of the community for these scenarios:</p>
            <p>2021 Modern Map, by DawnbreakZ</p>
        </React.Fragment>,
        placement: 'center'
    }
]
export default steps;