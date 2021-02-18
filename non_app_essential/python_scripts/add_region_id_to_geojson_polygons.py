import json

f = open(r'C:\Users\wujun\OneDrive\Documents\GitHub\making-history-sandbox\src\assets\basemap\mapAdmin.json',"r", encoding="utf8") # Fill in your input file here
  
data = json.load(f) 

print(data["type"])

# Add id in order as iterate through the array
for ind, feature in enumerate(data["features"]):
    feature["properties"]["regionID"] = ind

fs = open('mapAdminBetter.json',"w", encoding="utf8") # Fill in your output file here

json.dump(data, fs, ensure_ascii=False)