# Code notes

- z-index levels: (of course higher levels are appropriate if need be)
  - -1: background, should not be used
  - 0: background
  - 1: foreground

# Notes

- When adding community scenarios, add attributions at
  - Name of scenario to display in app, e.g. by xxx
  - Help
  - README

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
- [x] 0.10.0: Region info plugin, displays on hovering above a region
  - Region label
  - Region name
- [x] 0.11.0: Plugin for importing admin map saves from old editor
- [x] 0.12.0: Refining visuals
  - Try create a neoclassical style interface
  - Position attribution element in a convenient location, this is mandatory as attribution is key
- [x] 0.13.0: Scenarios plugin
- [x] 0.14.0: Help button

# Standard version

## Version 1

- [x] 1.0.0: fix any bugs from the beta versions and bundle it no release on github pages
  - Favicon
  - Add google analytics
  - Meta, SEO
  - Linking from old app
  - README
  - Advertising online
  - Attributions
    - Basemap source (use same as alternative history editor, noting on personal alterations)
- [x] 1.1.0: more background map providers
- [x] 1.1.1: add title to site
- [x] 1.1.2: changing positions of buttons and minimum sizes of panels for better mobile performance
- [x] 1.1.3: use react memo to improve performance
- [x] 1.1.4: resolve lag due to regionInfo plugin
- [x] 1.2.0: add color picker from region
- [x] 1.3.0: allow custom imports of geojson basemap plugin
  - Add the basemap as part of the save file
- [x] 1.3.1: add 2021 map by DawnbreakerZ
- [x] 1.3.2: abusive use testing, fix bugs, try to minimise need to refresh page
  - Ensure color picker is mutually exclusivye with lasso and eraser tool
- [x] 1.3.3: structure code better, write up docs for personal plugin update
  - Instead of having to put null for all onXXX functions for all plugins, make plugin method running check to see if the function key is in the plugin's functions dictionary, and if so then run, else don't run
- [x] 1.3.4：add better help, perhaps a joyride
- [x] 1.4.0: display total numebr of regions and regions of each label color, perhaps as part of legend plugin; also make legend more readable, i.e. see more entries
- [x] 1.5.0: add rgb/hex color picker, just add it beside the slide picker, take the compoennt from react color, no need to make it a separate plugin
- [x] 1.5.1: switch for hiding region labels counts in legend (for those who wish to screenshot)
- [x] 1.6.0: enable hiding all panels except timeline, so drawer like
- [x] 1.7.0: allow theme selection changing, e.g. swap out a different theme and only resetting style afterwards; themes could include no border lines, 1 opacity
  - Used smoothFactor=0 of geojson to get rid of blank spacings between polygons when without borders
  - Add github link to app
  - Look at some popular styles online to learn from and ideally give some room for customization (though I guess not too much as such would be a task of matters such as photoshop as opposed to this app)
- [x] 1.8.0: info marker plugin : should advertise this on all the major mapmaking sites after done, after doing a own alterantive example of course, maybe for instance an alternative state and its internal transport/city info map
  - Various plugin shapes
  - Info adding to markers possible
- [x] 1.8.1: Added 867 Macedonian Dynasty scenario
- [x] 1.8.2: Streamlining scenario creation
  - Making scenario adding a simple 2 step process of copying scenario file into the respective folder and editing the scenario information file
- [x] 1.9.0: One click remove label and relevant regions
  - Update help to state new feature
- [x] 1.10.0: One click color change of relevant regions (and modify color of associated label; but keep legend in same order)
  - Update help for new features
- [x] 1.10.1: Color picker displays whether current color is on map, and if so, what its label is
  - Allow edit label in color bar as well
- [x] 1.10.2: Bugfix on whitescreen error if save is loaded when current active entry is larger than available timepoints in save
  - Fix: set active entry to 0 (first time point) before loading any saves
- [x] 1.10.3: 1861 scenario, revolutions and civil wars (in particular US civil war began in 1861)
- [x] 1.10.4: 1789 scenario, French Revolution
- [x] 1.11.0: Play timeline like old editor; different speeds allowed (reply and close issue in GITHUB for SNWSETH)
- [x] 1.12.0: Condensed view mode of timeline; just add as an extra sidebar on top of the main event info edit side bar, containing everything in timeline data as a table. Also allow timeline edits to be from there as well; i.e. clicking entry there will also change the bottom timebar and the main event edit bar (ensure the timebar at the bottom does scroll in response)
- [x] 1.12.1: Deletion button in condensed timeline
- [x] 1.12.2: minor joyride update for FAQ regarding loading GeoJSON save files.
- [x] 1.12.3: allow more general GeoJSON uploads (fixing issue #39)
- [ ] 1.12.4：Integrate region data showcasing: https://github.com/Yulin-W/making-history-sandbox/issues/41. Will need to first find a reliable data source
  - [ ] Close the issue once done
- [ ] 1.12.5: Remove the basemaps that are no longer operational (add in some other ones to make up for this issue)
- [ ] 1.13.0：Scenario updates: 304BC: Fourth War of the Diadochi (technically in the middle of the Fourth War; why this particular date was since it is effectively the first confirmed year after which the Diadochi have declared each of themselves kings, in effect officially breaking from Alexander's subordinate status).
  - [ ] 1.13.1: minor visual updates; make the condensed timeline indicator bar smaller
  - [ ] 1.13.2: Scenario: 1776: US Declaration of Independence
  - [ ] 1.13.3: Scenario: 1618 scenario, 30 years war begin
  - [ ] 1.13.4：Scenario: 218BC: Second Punic War
  - [ ] 1.13.5: Scenario: 270: Restorer of the World (Aurelian becomes Emperor of Rome)
- [ ] 2.0.0: Code refactoring, bring up to standards of idiomatic javascript (consider possibility of typescript transition or at least reasonable amount of typing (whilst keeping some legacy javascript written functionalities))
  - [ ] Typing
  - [ ] Commenting
  - [ ] Cleaning logic flow (currently has some chaotic concurrency thing going on I think for certain actions)
- [ ] 2.1.0: Speed improvement to changing timeline entries, and maybe improving speed by not rerendering entire canvas on changing region hovered over or colored? Get performance upon timepoint switch to those of the old editor level. Main issue is the rerendering due to markets; can't really find a easy way without massive refactoring.
- [ ] 2.1.1: allow uploading a non custom geojson save file after previously loading a custom one
- [ ] 2.2.0: 1 click color modern countries mode (try to somehow use the basemap information ideally)
  - Then in help tips, or tooltips, recommend using it aloneside a background map with nation borders, i.e. the black white map one
- [ ] 2.3.0: 1776 scenario, US Independence
- [ ] 2.3.1: Change increment amounts in themes for more reasonable experience, e.g. border width shouldn't increment by 1 upon pressing buttons, but instead by 0.1

## Bugs

- [ ] When loading in old alt hist editor saves; you get the condensed timeline bar displaying all the events as the current event (i.e. with the white bar indicator for current event)

## Potential future versions (won't work on it soon)

- [ ] Add flag overlap capability (automatic adjust kind) (if done, go reply to the dude that sent the email request)
- [ ] Save condensing (alter save format to enable smaller size saves): ensure though compatibility with previous saves
- [ ] Undo button; i think just keep track of past calls of region assigning of current entry, i think past 10 calls should be enough; and history kept clears upon changing entry.
- [ ] easy mouse wheel scroll in events bar, avoid the shift scroll i reckon and do normal scroll
- [ ] Drag/shift timeline event entries (probably just a shift left/right button)
- [ ] Old editor to new editor date messup fix
- [ ] Copy/paste time point
- [ ] Add old editor like display to events to allow seeing all events in a single panel (I'd say have it as an optional thing, i.e. can expand the events bar)
- [ ] improve performance

## Possible future plugins (these can go into separate repos, as separate projects), some might not be plugins in the sense that it goes into the sidebar menu

- [ ] Add extra inbuilt base map, a more reasonable one with finer dividsions where it needs and less fine where it isn't needed
- [ ] Convert image to basemap/scenario, of appropriate format
- [ ] Wikipedia event AI recommendation
- [ ] Auto generation of territorial changes based on natural language processing or just in general with randomness
- [ ] Visual customization
- [ ] Timeline play button
- [ ] Detailed state world building: e.g. mark major cities, flags, hereditary linages, populations, gdp
- [ ] Data generation for states, e.g. land area
- [ ] Marker features, e.g. city, factories, fortification, etc.
- [ ] Import own basemaps, and then can include it as part of output save like in alternate history editor

## Potential side apps to supplement, possibly linking into a suite of apps

- [ ] Image processing ai or likewise, turn image of borders into geojson polygons and then allow manual addition of labels; mainly its the ocr tech

# Possible code improvements

- Minimise use of refs
- Add proptypes for type checking
- Try to find another way as opposed to passing the App's this value to the plugin methods that run after corresponding App methods
- Improve map performance by reducing style resetting
- Setup an alternate site for in test deployment, and only deploy to main site once sure it works well

# Possible future features

- THE LONGTERM AIM: can just upload an image, and base map geojson is auto generated with background, or perhaps background could be inputted manually and shuffled around; so that any mapping timeline could be easily achieved and imported from existing artistic works
  - i.e. optical recognition and ai georeferencing are probably necessary
  - On second thought, leaflet might be too restricting due to its geo nature; perhaps I should open a brand new app that has a choropleth custom made engine as opposed to the georeferenced leaflet for non-earth, i.e. general timeline mapping, where the focus is import your own world; of course there should be a base earth map to get people started with
- Add theme options, e.g. light theme, e.g. allow changing opacity of regions, e.g. allow changing width of the region border lines
- If webkit border image and background images fail, retreat back to a single color background
- Making clicking and highlighting more responsive
- If scenarios become too numerous, try storing them online and let the scenario plugin act simply as a download then load interface
- Compressed saves
- Refactor code, in particular names to make methods and variables more intuitive
- Write a document summarizing how plugins could be added and what functionalities it could have, including the API it has access of
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
- Edit region names (this would require possibly changing the way data is stored for the app, or possibly via a plugin that requires as part of the save an additional id to name mapping for different entries in the save)
- Allow disabling plugins for sake of speed
