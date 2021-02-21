// Given geoJson with features (here assume regions, i.e. polygons/multipolygons) each with properties regionID and name
// Generate a js object with keys as the regionID and value as object of the properties of the regions
export default function createRegionNameDict(geoJson) {
    let retval = {};
    geoJson.features.forEach(region => {
        retval[region.properties.regionID] = region.properties.name;
    });
    return retval;
}