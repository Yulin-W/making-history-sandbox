import React from 'react';

const steps = [
    {
        target: 'body',
        content: 
        <React.Fragment>
            <p>Welcome to Making History Sandbox! Click next for the tutorial.</p>
            <hr/>
            <p>***NEW FEATURES*** September, 2022</p>
            <p>Condensed timeline view (on left of page): Can be used to navigate the timeline by clocking on entries and add new events, albeit cannot edit events/dates here.</p>
            <p>Play timeline toolbar (on the left of the page): Currently offers 1x to 16x speeds, where 1x corresponds to ~2s per time point</p>
            <hr/>
            <p>FAQs:</p>
            <p>Changing color of regions of same color: toggle "Same" button, then color as usual</p>
            <p>Removing borders: set region border width to 0 in theme panel on the right</p>
            <p>Adding markers with tooltips: use marker box on side panel; added markers can be dragged to position and clicked to reveal/edit tooltip</p>
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
        target: '#condensed_timeline',
        content: 'This is a condensed view of the timeline. You can also navigate to events by clicking them here. Albeit editing cannot be done here.',
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