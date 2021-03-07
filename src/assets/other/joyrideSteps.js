import React from 'react';

const steps = [
    {
        target: 'body',
        content: 
        <React.Fragment>
            <p>Welcome to Making History Sandbox! Click next for the tutorial.</p>
            <hr/>
            <p>***NEW FEATURES***</p>
            <p>Hex/RGB color picker</p>
            <p>Display of number of regions per label and total</p>
            <p>Collapsible panels in the interface</p>
            <hr/>
            <p>If you made a historic scenario and is willing to share the save, you can send it to me at Yulin-W@outlook.com. If you want attribution, send the name you want as well.</p>
            <hr/>
            <p>Making custom regions</p>
            <p>See tutorial at: <a href="https://github.com/Yulin-W/making-history-sandbox/blob/main/customRegionTutorial.md" target="_blank">Custom Region Tutorial</a></p>
            <hr/>
            <p>Please see acknowledgements at the end of the tutorial</p>
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
        content: 'This is where additional functionalities are, including information about region hovered upon, legend, scenarios, loading of custom maps, etc.',
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