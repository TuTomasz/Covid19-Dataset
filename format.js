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
      let country = element["Country/Region"]
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");

      formated_data[country] = {
        total_infected: 0,
        total_deaths: 0,
        total_recovered: 0,
        doubling_rate: 0,
        date: { infected: null }
      };
    });
    formated_data = formatData(INFECTED_DATA, formated_data, "infected");
  });
// Read and merge Death data with new format
fs.createReadStream("./Data/raw/Death_raw.csv")
  .pipe(csv("Province/States", "Country/Region"))
  .on("data", data => DEATH_DATA.push(data))
  .on("end", () => {
    formated_data = formatData(DEATH_DATA, formated_data, "deaths");
  });
// Read and merge Recovered data with new format
fs.createReadStream("./Data/raw/Recovered_raw.csv")
  .pipe(csv("Province/States", "Country/Region"))
  .on("data", data => RECOVERED_DATA.push(data))
  .on("end", () => {
    formated_data = formatData(RECOVERED_DATA, formated_data, "recovered");

    formated_data = getTotals(formated_data);
    formated_data = getDoublingTime(formated_data, 5, "doubling_rate");
    //console.log(formated_data["us"]);
    saveToFile(formated_data);
  });

saveToFile = data => {
  fs.writeFile(
    path.join(__dirname, "Data", "formated", "data_v1.json"),
    JSON.stringify(data),
    function(err) {
      if (err) console.log(err);
    }
  );
};
/**
 * Calculate doubling rate of infection
 * @param  data - formated json data
 * @param  period - period of doubling you want to calculate ex) 5,10 day
 * @param  label - data field to modify
 */
getDoublingTime = (data, period, label) => {
  Object.entries(data).forEach(([country, stats]) => {
    let infected = Object.values(stats["date"]["infected"]);
    let N_t = infected[infected.length - 1];
    let N_0 = infected[infected.length - 1 - 5];
    let growth_rate = (period * Math.log10(2)) / Math.log10(N_t / N_0);
    stats[label] = growth_rate;
  });

  return data;
};
/**
 * Modifies the JSON data to include totals for each country
 * Deaths,Infected and Recoveries
 * @param  JSON format data
 */
getTotals = data => {
  Object.entries(data).forEach(([country, stats]) => {
    let infected = Math.max(...Object.values(stats["date"]["infected"]));
    let deaths = Math.max(...Object.values(stats["date"]["deaths"]));
    let recovered = Math.max(...Object.values(stats["date"]["recovered"]));

    stats["total_infected"] = infected;
    stats["total_deaths"] = deaths;
    stats["total_recovered"] = recovered;
  });
  return data;
};
/**
 * Format date to the appropriate JSON structure
 * @param unformated_data - parsed unstructured data parsed from CSV
 * @param formated_data - output structured data
 * @param type - designates the type of unstructured data set
 */
formatData = (unformated_data, formated_data, type) => {
  // Create list of countries within the data
  unformated_data.forEach(element => {
    let country = element["Country/Region"]
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "_");

    //console.log(country)
    let timedata = formated_data[country]["date"];

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
