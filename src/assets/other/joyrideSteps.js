import React from 'react';

const steps = [
    {
        target: 'body',
        content: 
        <React.Fragment>
            <p>Welcome to Making History Sandbox! Click next for the tutorial.</p>
            <hr/>
            <p>***NEW FEATURES*** October, 2021</p>
            <p>Shows and allow editing of label for current color in color picker</p>
            <p>Same Button: Colors in (or erase if erase button activated) regions with the same color with single click.</p>
            <p>New scenarios: 2800BC Epic of Gilgamesh, 1279BC Ozymandias King of Kings, 117 Pax Romana, 565 The Last Roman, 867 Macedonian Dynasty: see side panel</p>
            <hr/>
            <p>FAQs:</p>
            <p>Removing borders: set region border width to 0 in theme panel on the right</p>
            <p>Adding markers with tooltips: use market box on side panel; added markers can be dragged to position and clicked to reveal/edit tooltip</p>
            <hr/>
            <p>If you made a historic scenario and is willing to have it added to the scenarios list, feel free to send it to Yulin-W@outlook.com. If you want attribution, send the name you want as well.</p>
            <hr/>
            <p>Making custom regions: <a href="https://github.com/Yulin-W/making-history-sandbox/blob/main/customRegionTutorial.md" target="_blank">Custom Region Tutorial</a></p>
            <hr/>
            <p>See acknowledgements at the end of the tutorial</p>
            <p>Disclaimer: Making History Sandbox (application) is not intended to be historically accurate nor do they represent personal views of the author. The application is provided without any warranty of any kind whatsoever, either express or implied.</p>
            <p><a href="https://github.com/Yulin-W/making-history-sandbox">Github</a></p>
        </React.Fragment>,
        placement: 'center'
    },
    {
        target: '#colorbar',
        content: 'Choose color to color with via various methods provided, e.g. slider, RGB. Displays legend label for selected color that can be edited here (alternatively edit in legend panel).'
    },
    {
        target: '#toolbar',
        content: 'Use erase for removing colors, same for coloring (or erasing if erase button on) regions with same color, lasso for colouring (or erasing if erase button on) selected regions, and pick for picking color of a region as current color.'
    },
    {
        target: '#map',
        content: 'This is the map. To color/erase, click the region. Or, if lasso is used, click and hold to select regions.',
    },
    {
        target: '.leaflet-control-layers',
        content: 'This is where you change the background map and switch on/off the regions/markers.'
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
        content: "This is where additional functionalities are, including legend, premade scenarios, map theme editing (e.g. borders), loading custom region file/save, etc. For custom region tutorial see https://github.com/Yulin-W/making-history-sandbox/blob/main/customRegionTutorial.md",
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