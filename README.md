# making-history-sandbox
Simple, intuitive app using React, Leaflet and other packages for making alternate histories, and or choropleth maps in general. Features include pre-made scenarios, timeline, legend, region information, different background maps and more. Successor to Alternate History Editor.  

Saves from Alternate History Editor can be loaded into this app via using the Alt Hist Editor Loader Plugin on the right side of the app.
## Features
- Fast, simple, responsive
- Easy map timeline editing: added new dates come with its independent map inherited from previous time point
- Simple colouring in of map regions: 
  - Single region colouring
  - Lasso selection colouring of multiple regions
- Base world map with Admin-1 regions
- Choice of two base layers: satelite imagery, watercolor map
- Automatically generated legend with editable labels
- Region info including regional name and label displayed upon mouse hover
- Simple save/load of map timeline in json format (effectively text file)

# Common issues and possible solutions
- Dimensions/font size/location of elements are strange
  - This is often due to zooming/resizing of the browser. Try resetting the browser zoom to 100%, usually that should be enough

## Extra Acknowledgements
- "mapAdmin.json" (geojson basemap for the regions) was modified from:
  - Data source: Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com. 