import json

f = open(r'C:\Users\wujun\OneDrive\Documents\GitHub\making-history-sandbox\src\assets\basemap\mapAdmin.json',"r", encoding="utf8") # Fill in your input file here
  
data = json.load(f) 

print(data["type"])


# Remove all property attributes except for name
for feature in data["features"]:
    name = feature["properties"]["name"]
    feature["properties"].clear()
    feature["properties"]["name"] = name

fs = open('mapAdminBetter.json',"w", encoding="utf8") # Fill in your output file here

json.dump(data, fs, ensure_ascii=False)