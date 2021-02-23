# Code notes
- z-index levels:
  - -1: background, should not be used
  - 0: background
  - 1: foreground
# Basic requirements
- Backward save compatibility (do so by making a plugin app for converting save from old map to new seamlessly)
- Plugin-extension system to allow adding stuff
- Tool panel like in Krita to allow slapping tools and plugins in
- Basic timeline panel on the left
- Phone/tablet version with no extra tools, just map and timeline list on the bottom
- Separate data from interface, i.e. componetn states is strictly for ui/ux display info, the underlying data detrmining this should be conferred to some other object to allow easier manipulation and that should be connected to the top level component to link via that to the component display hierarchy
- Link old app to new app both via github and via the actual app file itself
- All side bar components should be allowed to disappeear and be retracted
- Make components have good APIs for extensibility
# Beta version
- [x] 0.1.0: 3D or 2D Map component (perhaps allowing 2D alternatives, it depends on what library we get), should allow basemap imports
- [x] 0.2.0: Timeline component
  - Clear entry
  - Delete entry
  - Timeline to click on
  - Add entry
  - Controlled date and event input elements
- [x] 0.3.0: Save/load functionality
  - Currently assumed only the admin map is used hence saves only include the scenarioData
- [x] 0.4.0: Toolbar
  - Lasso select
  - Eraser
- [x] 0.5.0: Add smooth scrolling leaflet plugin
- [x] 0.6.0: Plugin and extension capabilities, i.e. ensure there is a highly extensive and versatile API for accessing the various features of the features above (keep this in mind when writing the program as well, i.e. try to use functional programming I'd say)
  - Plugins should be of the form of a single react component js file, needing only to import relevant material ui and react libraries, following the structure of existing custom components
  - There should exists a standard api to the app to which the plugins be able to access
  - Adding plugin to app should be simple as place file into a folder, and at most needing to update a plugin registry file
- [x] 0.7.0: Legend
- [x] 0.8.0: Various minor features
  - Make timeline bar and timeline event directly rendered by app to reduce rendering costs
  - Click on Legend to select color, so to allow selecting the same color as existing one on legend
- [x] 0.9.0: New map button (probably just refresh the page tbh for simplicity)
- [ ] 0.10.0: Region info plugin, displays on hovering above a region
  - Region label
  - Region name
- [ ] 0.11.0: Refining visuals
  - Try create a neoclassical style interface
  - Position attribution element in a convenient location, this is mandatory as attribution is key
# Standard version
## Version 1
- [ ] 1.0.0: fix any bugs from the beta versions and bundle it no release on github pages
    - Favicon
    - Meta, SEO
    - Linking from old app
    - Advertising online
    - Attributions
      - Basemap source (use same as alternative history editor, noting on personal alterations)
## Plugins planned (these can go into separate repos)
- [ ] Save converter that converts the old alternate history editor saves to the new save
- [ ] Convert image to basemap/scenario
- [ ] Wikipedia event AI recommendation
- [ ] Auto generation of territorial changes based on natural language processing or just in general with randomness
- [ ] Visual customization
- [ ] GIF/Screenshot generation
- [ ] Detailed state world building: e.g. mark major cities, flags, hereditary linages, populations, gdp
- [ ] Data generation for states, e.g. land area

# Possible code improvements
- Minimise use of refs
- Try to find another way as opposed to passing the App's this value to the plugin methods that run after corresponding App methods
# Possible future features
- Make new map button more efficient by resetting required state values as opposed to reloading entire page
- Add chinese version
- Use more icons alongside words for buttons
- Make work well for phones
- Geojson editor to create basemaps or edit them easily
- Link
- Wikipedia extension with suggested event/people lookups via AI
- Auto generatic of scenario
- AI to simulate and change territory and generate events elsewhere to save player time from changing less so important regions (turn on or off and also choose for what regions or states perhaps to turn it on)
- Play timeline
- Smooth scrolling
- Generate timeline
- Scenarios and points of divergence
- Geojson refiner
  - Currently geojson inputs are required to have name, and regionID attributes
- Edit region names (this would require possibly changing the way data is stored for the app, or possibly via a plugin that requires as part of the save an additional id to name mapping for different entries in the save)
- Allow disabling plugins for sake of speed