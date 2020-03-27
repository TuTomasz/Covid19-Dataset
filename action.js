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
        infected_total: 0,
        deaths_total: 0,
        recovered_total: 0,
        time_series: { infected: null }
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

    //formated_data = applyStatistics(formated_data);

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

applyStatistics = data => {
  Object.entries(data).forEach(([key, value]) => {
    console.log(value);
  });
};

formatData = (INFECTED_DATA, formated_data, type) => {
  // Create list of countries within the data
  INFECTED_DATA.forEach(element => {
    let country = element["Country/Region"].toUpperCase();
    //console.log(country)
    let timedata = formated_data[country]["time_series"];

    Object.entries(element).forEach(([key, value]) => {
      let dateReg = /^[0-9]{1,2}[/][0-9]{2}[/][0-9]{2}$/g;

      if (dateReg.test(key)) {
        if (timedata[[type]] == null) {
          timedata[[type]] = { [key]: parseInt(value) };
        } else if (timedata[[type]][key] == null) {
          timedata[[type]][key] = parseInt(value);
        } else {
          timedata[[type]][key] += parseInt(value);
        }
      }
    });
  });
  return formated_data;
};
