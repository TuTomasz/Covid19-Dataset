const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const { CountrySchema, GlobalShema } = require("./schema");

/**
 * Save processed data to a JSON file
 */
saveToFile = (data, fileName) => {
  fs.writeFile(
    path.join(__dirname, "Data", "formated", fileName),
    JSON.stringify(data),
    function(err) {
      if (err) console.log(err);
    }
  );
};
/**
 * Calculate mortality rate for each country
 * @param  {} data  - formated json data
 */
getMortalityRate = data => {
  Object.entries(data).forEach(([country, stats]) => {
    let deaths = stats["total_deaths"];
    let infected = stats["total_infected"];
    let mortalityRate = parseFloat(((deaths * 100) / infected).toFixed(3));
    stats["mortality_rate"] = mortalityRate;
  });
  return data;
};
/**
 * Calculate doubling rate of infection
 * @param  data - formated json data
 * @param  period - period of doubling you want to calculate ex) 5,10 day
 * @param  label - data field to modify
 */
getDoublingTime = (data, period, label = null) => {
  Object.entries(data).forEach(([country, stats]) => {
    let infected = Object.values(stats["time_data"]["infected"]);
    let N_t = infected[infected.length - 1];
    let N_0 = infected[infected.length - 1 - 5];
    let growth_rate = parseFloat(
      ((period * Math.log10(2)) / Math.log10(N_t / N_0)).toFixed(3)
    );
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
    let infected = Math.max(...Object.values(stats["time_data"]["infected"]));
    let deaths = Math.max(...Object.values(stats["time_data"]["deaths"]));
    let recovered = Math.max(...Object.values(stats["time_data"]["recovered"]));

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
    let timedata = formated_data[country]["time_data"];

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
/**
 * Read and parse the csv file data
 * @param  {} source - path to CSV file
 */
async function readDataFromSource(source) {
  chunks = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(source)
      .pipe(csv("Province/States", "Country/Region"))
      .on("data", data => chunks.push(data))
      .on("end", () => {
        resolve(chunks);
      });
  });
}
/**
 * Create Json file Blueprint based on schema object
 */
async function createBlueprint(raw, formated) {
  raw.forEach(element => {
    let country = element["Country/Region"]
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "_");
    formated[country] = new CountrySchema();
  });
  return formated;
}
// GLOBAL FUNCTIONS

function getGlobalBlueprint(globalData, countryData) {
  globalData = new GlobalShema();
  countryData = Object.keys(countryData["us"]["time_data"]["infected"]);
  countryData.forEach(date => {
    globalData["time_data"][date] = {
      infected: 0,
      deaths: 0,
      recovered: 0
    };
  });
  return globalData;
}

getGlobalTotals = (countryData, globalData) => {
  let globalInfected = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;

  Object.entries(countryData).forEach(([country, stats]) => {
    globalInfected += Math.max(
      ...Object.values(stats["time_data"]["infected"])
    );
    globalDeaths += Math.max(...Object.values(stats["time_data"]["deaths"]));
    globalRecovered += Math.max(
      ...Object.values(stats["time_data"]["recovered"])
    );

    globalData["total_infected"] = globalInfected;
    globalData["total_deaths"] = globalDeaths;
    globalData["total_recovered"] = globalRecovered;
  });

  return globalData;
};

getDailyTotals = (countryData, globalData) => {
  dates = Object.keys(globalData["time_data"]);

  labels = ["infected", "deaths", "recovered"];
  labels.forEach(label => {
    sum = 0;
    dates.forEach(date => {
      Object.entries(countryData).forEach(([country, stats]) => {
        sum += stats["time_data"][label][date];
      });
      globalData["time_data"][date][label] = sum;
      sum = 0;
    });
  });

  return globalData;
};

getGlobalDoublingTime = (data, period) => {
  infected = [];
  Object.entries(data["time_data"]).forEach(([key, value]) => {
    infected.push(value["infected"]);
  });
  let N_t = infected[infected.length - 1];
  let N_0 = infected[infected.length - 1 - 5];
  let growth_rate = parseFloat(
    ((period * Math.log10(2)) / Math.log10(N_t / N_0)).toFixed(3)
  );
  data["doubling_rate"] = growth_rate;
  return data;
};

getGlobalMortalityRate = data => {
  let deaths = data["total_deaths"];
  let infected = data["total_infected"];
  let mortalityRate = parseFloat(((deaths * 100) / infected).toFixed(3));
  data["mortality_rate"] = mortalityRate;
  return data;
};

main = async () => {
  let INFECTED_DATA = [];
  let DEATH_DATA = [];
  let RECOVERED_DATA = [];
  let formated_data = {};
  let formated_data_global = {};

  // Country Data

  INFECTED_DATA = await readDataFromSource("./Data/raw/Cases_raw.csv");
  DEATH_DATA = await readDataFromSource("./Data/raw/Death_raw.csv");
  RECOVERED_DATA = await readDataFromSource("./Data/raw/Recovered_raw.csv");

  formated_data = await createBlueprint(INFECTED_DATA, formated_data);

  formated_data = formatData(INFECTED_DATA, formated_data, "infected");
  formated_data = formatData(DEATH_DATA, formated_data, "deaths");
  formated_data = formatData(RECOVERED_DATA, formated_data, "recovered");

  formated_data = getTotals(formated_data);
  formated_data = getDoublingTime(formated_data, 5, "doubling_rate");
  formated_data = getMortalityRate(formated_data);

  saveToFile(formated_data, "data_v1.json");

  // Global Data

  formated_data_global = getGlobalBlueprint(
    formated_data_global,
    formated_data
  );

  formated_data_global = getGlobalTotals(formated_data, formated_data_global);
  formated_data_global = getDailyTotals(formated_data, formated_data_global);
  formated_data_global = getGlobalDoublingTime(formated_data_global, 5);
  formated_data_global = getGlobalMortalityRate(formated_data_global);
  console.log(formated_data_global);

  saveToFile(formated_data_global, "global_data_v1.json");
};

main();
