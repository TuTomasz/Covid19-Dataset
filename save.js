const fs = require("fs");

readFileData = source => {
  const buffer = fs.readFileSync(source);
  let json = JSON.parse(buffer);
  return json;
};
writeFileData = (data, date) => {
  jsonString = JSON.stringify(data);
  fs.writeFileSync(`./Data/archive/${date}.json`, jsonString);
};

// Save Daily Global Statistics
daily_global_output = {};

let global_data = readFileData("./Data/DataSets/global_data_v2.json");
let date = new Date().toJSON().split("T")[0];
writeFileData(global_data, date);

// Save Daily Country Statistics

// daily_country_output ={}

// let country_data = readFileData('./Data/formated/data_v1.json')

// Object.entries(country_data).forEach(([country,stats])=>{
// 	delete country_data[country]['time_data']
// })
// daily_country_output[date] = country_data
// appendFileData('./Data/country/country_stats.json',daily_country_output)

console.log("Save complete");
