# For sake of compatibility with the alternate history editor saves, don't run this when porting the geojson from that app over
import json

f = open(r'C:\Users\wujun\OneDrive\Documents\GitHub\making-history-sandbox\src\assets\basemap\mapAdmin.json',"r", encoding="utf8") # Fill in your input file here
  
data = json.load(f) 

print(data["type"])


# Remove feature if its geometry is null in json
data["features"] = [feature for feature in data["features"] if feature["geometry"]];

fs = open('mapAdminBetter.json',"w", encoding="utf8") # Fill in your output file here

json.dump(data, fs, ensure_ascii=False)