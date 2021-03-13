// This is where to import the individual plugins, i.e. this is the list of plugins you wish to add to the app toolmenu
// For sake of consistency, it is recommended to save the plugin component files in src/plugins; but of course you can save it anywhere you like and import it to this js file
import LegendPlugin from './plugins/LegendPlugin.js'; // Naming the plugins with Component is not required, it could have well been just Legend, given the source plugin file is named as such, having Plugin in the name is just due to personal preferences
import RegionInfoPlugin from './plugins/RegionInfoPlugin.js';
import AltHistEditorLoaderPlugin from './plugins/AltHistEditorLoaderPlugin.js';
import ScenarioPlugin from './plugins/ScenarioPlugin.js';
import CustomGeoJSONLoaderPlugin from './plugins/CustomGeoJSONLoaderPlugin.js';
import ThemePlugin from './plugins/ThemePlugin.js';
import MarkerPlugin from './plugins/MarkerPlugin';

// All imported plugins above should then be listed below with their names, which will serve as the title in the plugins menu
// Names of plugins should be unique as they will also serve as keys to the accordion element
// See LegendPlugin.js for example of plugin and the requirements of it 
// The ordering of plugins here also determine the order of plugin display in the app
const plugins = {
    "Region Info": RegionInfoPlugin,
    "Legend": LegendPlugin,
    "Scenario": ScenarioPlugin,
    "Marker": MarkerPlugin,
    "Theme": ThemePlugin,
    "Alt Hist Editor Loader": AltHistEditorLoaderPlugin, 
    "Custom GeoJSON Loader": CustomGeoJSONLoaderPlugin,
};

export default plugins;