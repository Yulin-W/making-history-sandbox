# Tutorial for making custom regions
![](https://raw.githubusercontent.com/Yulin-W/making-history-sandbox/main/non_app_essential/showcase/import_geojson_showcase.gif)

- Step 1: create basemap:
    - I suggest [GeoJSON.io](https://geojson.io/).
    - Use the polygon tool to draw the regions.
    - IMPORTANT: For each region, give a regionID (from 0 onwards) and a name value.
    - Save the file as geoJSON.
- Step 2: Importing basemap:
    - Scroll down on the right side panel of the app until you see the geoJSON loader panel
    - Click to upload or drag and drop the created geoJSON via loader panel
- Step 3: Enjoy!
- IMPORTANT: To save and load your timeline with custom basemaps:
    - Save as with a normal map
    - Loading using the geoJSON loader panel, the same one you used to load the geoJSON basemap (not the normal load button)