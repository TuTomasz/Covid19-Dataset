const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

let INFECTED_DATA = [];
let DEATH_DATA = [];
let RECOVERED_DATA = [];
let formated_data = {};

fs.createReadStream("./Data/raw/Cases_raw.csv")
  .pipe(csv("Province/States", "Country/Region"))
  .on("data", data => INFECTED_DATA.push(data))
  .on("end", () => {
    // Create list of countries within the data
    INFECTED_DATA.forEach(element => {
      let country = element["Country/Region"].toUpperCase();

      formated_data[country] = {
        TOTAL_INFECTED: 0,
        TOTAL_DEATHS: 0,
        TOTAL_RECOVERED: 0,
        TIME_DATA: { INFECTED: null }
      };
    });
    formated_data = formatData(INFECTED_DATA, formated_data, "INFECTED");
  });
// Read and merge Death data with new format
fs.createReadStream("./Data/raw/Death_raw.csv")
  .pipe(csv("Province/States", "Country/Region"))
  .on("data", data => DEATH_DATA.push(data))
  .on("end", () => {
    formated_data = formatData(DEATH_DATA, formated_data, "DEATHS");
  });
// Read and merge Recovered data with new format
fs.createReadStream("./Data/raw/Recovered_raw.csv")
  .pipe(csv("Province/States", "Country/Region"))
  .on("data", data => RECOVERED_DATA.push(data))
  .on("end", () => {
    formated_data = formatData(RECOVERED_DATA, formated_data, "RECOVERED");

    formated_data = getTotals(formated_data);
    console.log(formated_data);
    saveToFile(formated_data);
  });

saveToFile = data => {
  fs.writeFile(
    path.join(__dirname, "Data", "formated", "data.json"),
    JSON.stringify(data),
    function(err) {
      if (err) console.log(err);
    }
  );
};
/**
 * Modifies the JSON data to include totals for each country
 * Deaths,Infected and Recoveries
 * @param  JSON format data
 */
getTotals = data => {
  Object.entries(data).forEach(([country, stats]) => {
    let infected = Math.max(...Object.values(stats["TIME_DATA"]["INFECTED"]));
    let deaths = Math.max(...Object.values(stats["TIME_DATA"]["DEATHS"]));
    let recovered = Math.max(...Object.values(stats["TIME_DATA"]["RECOVERED"]));

    stats["TOTAL_INFECTED"] = infected;
    stats["TOTAL_DEATHS"] = deaths;
    stats["TOTAL_RECOVERED"] = recovered;
  });
  return data;
};

formatData = (INFECTED_DATA, formated_data, type) => {
  // Create list of countries within the data
  INFECTED_DATA.forEach(element => {
    let country = element["Country/Region"].toUpperCase();
    //console.log(country)
    let timedata = formated_data[country]["TIME_DATA"];

    Object.entries(element).forEach(([key, value]) => {
      let dateReg = /^[0-9]{1,2}[/][0-9]{2}[/][0-9]{2}$/g;

      if (dateReg.test(key)) {
        let date = new Date(key).toJSON().split("T")[0];
        if (timedata[[type]] == null) {
          timedata[[type]] = { [date]: parseInt(value) };
        } else if (timedata[[type]][date] == null) {
          timedata[[type]][date] = parseInt(value);
        } else {
          timedata[[type]][date] += parseInt(value);
        }
      }
    });
  });
  return formated_data;
};
