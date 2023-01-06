# Tutorial for making custom regions

IMPORTANT UPDATE:

- GeoJSON format requirement relaxed: pretty much any file will work now, no need to edit in regionID and name attributes (albeit recommended to give a name attribute to avoid generic names)
- Top left LOAD button also works for loading custom GeoJSONs or GeoJSON based saves now (no need to scroll down the side bar anymore; though that panel there still works)

![](https://raw.githubusercontent.com/Yulin-W/making-history-sandbox/main/non_app_essential/showcase/import_geojson_showcase.gif)

- Step 0: I already have a geojson
  - Just load it in then
- Step 1: create basemap:
  - I suggest [GeoJSON.io](https://geojson.io/).
  - Use the polygon tool to draw the regions.
  - Giving regionID, name attributes for regions is NO LONGER REQUIRED: but name is highly recommended (otherwise the region will have a bland generic name)
  - Save the file as geoJSON.
- Step 2: Importing basemap:
  - Click the top left LOAD button, or
  - Scroll down on the right side panel of the app until you see the geoJSON loader panel
    - Click to upload or drag and drop the created geoJSON via loader panel
- Step 3: Enjoy!
