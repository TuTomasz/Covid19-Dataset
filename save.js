const fs = require("fs");

readFileData = (source) => {
  const buffer = fs.readFileSync(source);
  let json = JSON.parse(buffer);
  return json;
};
writeFileData = (data, date) => {
  jsonString = JSON.stringify(data);
  fs.writeFileSync(`./Data/archive/${date}-global.json`, jsonString);
};

// Save Daily Global Statistics
daily_global_output = {};

let global_data = readFileData("./Data/data_sets/global_data_v2.json");
let date = new Date();
date.setDate(date.getDate() - 1);
date = date.toJSON().split("T")[0];

writeFileData(global_data[date], date);

console.log("Save complete");
