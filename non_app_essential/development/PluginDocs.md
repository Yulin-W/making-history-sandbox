# Intro
- Plugins for Making History Sandbox should be extensions that leverage existing functionalities without changing core behaviours. The latter should be a core update, not a plugin.
# Plugin visuals
- Plugins are expected to  be loaded as a panel entry into the right panel of the app. Of course, if necessary, absolute positioning could be used to move the panels to required locations, but that is not recommended
# Plugin requirements
- Styling: for sake of consistency across panel entries (ignore if using absolute positioning for plugin)
    - width: "100%" (should fill the panel container)
    - height: set to appropriate constant
- File
    - Recommended placing the plugin.js file in src/plugins (however as appPlugins.js can import plugins technically from anywhere in src, other places would work)
    - Add Plugin at end of name of js file for consistency
- Plugin js file structure
    - export default the \<PluginName\>PluginDict
    - \<PluginName\>PluginDict is an object with:
        - component: expects React component, either function or class, for the plugin's panel entry
        - initState: expects function returning the initial default state for the plugin's pluginData entry in App, should depend only on the supplied scenarioData value
        - functions: object containing functions to that should be called upon corresponding function calls in App, see below for details
            - If no function is supplied for the plugin for the specific corresponding function in App.js, don't put it down in the regionDict
                - To see which methods of App offers capability of running plugin methods, see App.js, note not all App methods allow that
            - For consistency, supplied function for the function key should be of the same string, e.g. for onAssignRegions, give value as onAssignRegions where the latter was a function defined in the plugin file
            - Apart from specific arguments, all these functions expect to have the app's instance passed as an argument (i.e. they can in effect do whatever the app does)
                - For specifically what other arguments are provided when calling these functions, check App.js's corresponding methods and see how these plugin methods are called
            - Whether functions are ran after the original function has finished or not depends, check App.js code for details
# PluginDict functions
- onAssignRegions
- onAddEntry
- onDeleteEntry
- onUpdateActiveEntry
- onUpdateEventDate
- onUpdateEvent
- onLoadSave
- onProcessRegionHoveredOn
- onProcessRegionHoveredOut
# Making Plugin Live
- In appPlugins.js, import the plugin from its file, and add to the plugins dictionary in appPlugins.js
