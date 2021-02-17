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
- [ ] 0.1.0: 3D or 2D Map component (perhaps allowing 2D alternatives, it depends on what library we get), should allow basemap imports
  - Use Caesium alongside geojson
- [ ] 0.2.0: Efficient basemap data format and making a few basemap files standard, regions should have names, other data not so important
- [ ] 0.3.0: Timeline component
- [ ] 0.4.0: Data storage object
- [ ] 0.5.0: Efficient save file data format standard
- [ ] 0.6.0: 3D Map colouring interactivity
- [ ] 0.7.0: Color picking (instead of doing the set color as in before, allow much more freedom in color choices and store colors via hexadecimal), or rgb, it dependso n how well the 3D map renders
- [ ] 0.8.0: Timeline add new entries and inherit interactivity
- [ ] 0.9.0: Save/load functionality
- [ ] 0.10.0: Legend
- [ ] 0.11.0: Lasso select
- [ ] 0.12.0: Plugin and extension capabilities, i.e. ensure there is a highly extensive and versatile API for accessing the various features of the features above (keep this in mind when writing the program as well, i.e. try to use functional programming I'd say)
- [ ] 0.13.0: Refining visuals
# Standard version
## Version 1
- [ ] 1.0.0: fix any bugs from the beta versions and bundle it no release on github pages
    - Favicon
    - Meta, SEO
    - Linking from old app
    - Advertising online
## Plugins planned
- [ ] Convert image to basemap/scenario
- [ ] Wikipedia event AI recommendation
- [ ] Auto generation of territorial changes based on natural language processing or just in general with randomness
- [ ] Visual customization
- [ ] GIF/Screenshot generation
- [ ] Detailed state world building: e.g. mark major cities, flags, hereditary linages, populations, gdp
- [ ] Data generation for states, e.g. land area
# Possible future features
- Make work well for phones
- Geojson editor to create basemaps or edit them easily
- Link
- Wikipedia extension with suggested event/people lookups via AI
- Auto generatic of scenario
- AI to simulate and change territory and generate events elsewhere to save player time from changing less so important regions (turn on or off and also choose for what regions or states perhaps to turn it on)
- Play timeline
- Generate timeline
- Scenarios and points of divergence