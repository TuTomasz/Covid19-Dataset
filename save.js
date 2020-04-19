const fs = require("fs");

readFileData = (source) => {
  const buffer = fs.readFileSync(source);
  let json = JSON.parse(buffer);
  return json;
};
writeFileData = (data, date, type) => {
  jsonString = JSON.stringify(data);
  fs.writeFileSync(`./Data/archive/${date}-${type}.json`, jsonString);
};

// Save Daily Global Statistics
daily_global_output = {};
daily_Usa_data = {};

let global_data = readFileData("./Data/data_sets/global_data_v2.json");
let usa_data = readFileData("./Data/data_sets/usa_data_v2.json");

let date = new Date();
console.log(date);
date.setDate(date.getDate() - 1);
date = date.toJSON().split("T")[0];

writeFileData(global_data[date], date, "global");
writeFileData(usa_data[date], date, "usa");

console.log("Save complete");
