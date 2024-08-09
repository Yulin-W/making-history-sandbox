import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

const steps = [
    {
        target: 'body',
        content:
            <React.Fragment>
                <div style={{ height: 400 }}>
                    <Scrollbars>
                        <p>Welcome to Making History Sandbox! Click NEXT for the tutorial or SKIP to close the tutorial.</p>
                        <hr />
                        <p>***NEW FEATURES*** AUGUST, 2024</p>
                        <p>Autoload region names for geojsons from <a href="https://www.geoboundaries.org/">geoBoundaries</a></p>
                        <p>***(PAST) NEW FEATURES*** 2023</p>
                        <p>Loading GeoJSON/saves from LOAD button on top left (no need to use right side panel anymore)</p>
                        <p>Accept more generic GeoJSON: no need for regionID and name fields (albeit recommended to have a name field)</p>
                        <hr />
                        <p>Comments on <a href="https://www.geoboundaries.org/">geoBoundaries</a> geoJSONs</p>
                        <p>ADMx means Administrative Level x (higher x means more detailed maps) (the app's default is a ADM1 world map)</p>
                        <p>Recommended to use at most ADM2 single country files or ADM1 world files (otherwise file too large and will likely crash/lag)</p>
                        <hr />
                        <p>FAQs:</p>
                        <p>I want to use different regions: download any geoJSON file with regions you want (plenty online, good resource is <a href="https://www.geoboundaries.org/">geoBoundaries</a>), or make your own (see tutorials below) and just load it. </p>
                        <p>Can't load a normal map save after loading a custom GeoJSON: refresh then load</p>
                        <p>Changing color of regions of same color: toggle "Same" button, then color as usual</p>
                        <p>Removing borders: set region border width to 0 in theme panel on the right</p>
                        <p>Adding markers with tooltips: use marker box on side panel; added markers can be dragged and clicked to reveal/edit tooltip</p>
                        <hr />
                        <p>Making custom regions: <a href="https://github.com/Yulin-W/making-history-sandbox/blob/main/customRegionTutorial.md" target="_blank" rel="noreferrer">Custom Region Tutorial</a></p>
                        <hr />
                        <p>See acknowledgements at the end of the tutorial</p>
                        <p>Disclaimer: Making History Sandbox (application) is not intended to be historically accurate nor do they represent personal views of the author. The application is provided without any warranty of any kind whatsoever, either express or implied.</p>
                        <hr />
                        <p>Feedback/Suggestions</p>
                        <p>Please open an issue on <a href="https://github.com/Yulin-W/making-history-sandbox">Github</a> or email me at Yulin-W@outlook.com</p>
                        <p>Note: I am not actively developing this anymore. I will try but cannot guarantee timely updates/fixes/reply to feedback.</p>
                    </Scrollbars>
                </div>
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
        content: 'This is a condensed view of the timeline. You can also navigate to events by clicking them here. Adding and deleting events can also be done (using +, x buttons). Albeit editing cannot be done here.',
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