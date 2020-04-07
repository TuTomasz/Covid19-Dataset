const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const { Global } = require("./src/global_schema");

/**
 * Blueprint for the JSON objects
 */
class CountryTemp {
  constructor() {
    this.time_data = {};
  }
}

class GlobalTemp {
  constructor() {
    this.time_data = {};
  }
}
/**
 * Read and parse the csv file data
 * @param  {} source - path to CSV file
 */
async function readDataFromSource(source) {
  chunks = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(source)
      .pipe(csv("Province/States", "Country/Region"))
      .on("data", (data) => chunks.push(data))
      .on("end", () => {
        resolve(chunks);
      });
  });
}

/**
 * Save processed data to a JSON file
 */
saveToFile = (data, fileName) => {
  fs.writeFile(
    path.join(__dirname, "Data", "data_sets", fileName),
    JSON.stringify(data),
    function (err) {
      if (err) console.log(err);
    }
  );
};
/**
 * Create Json file Blueprint based on schema object
 */
async function createBlueprint(raw, formated) {
  raw.forEach((element) => {
    let country = element["Country/Region"]
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "_");
    formated[country] = new CountryTemp();
  });
  return formated;
}

/**
 * Format date to the appropriate JSON structure
 * @param uncountryData - parsed unstructured data parsed from CSV
 * @param countryData - output structured data
 * @param type - designates the type of unstructured data set
 */
formatData = (uncountryData, countryData, type) => {
  uncountryData.forEach((element) => {
    let country = element["Country/Region"]
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "_");

    let timedata = countryData[country]["time_data"];

    Object.entries(element).forEach(([key, value]) => {
      let dateReg = /^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{1,2}$/g;

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
  return countryData;
};
/**
 * Create Global Json data blueprint
 * @param  {} globalData
 * @param  {} countryData
 */
function createGlobalBlueprint(globalData, countryData) {
  globalData = new GlobalTemp();
  countryData = Object.keys(countryData["us"]["time_data"]["infected"]);
  countryData.forEach((date) => {
    globalData["time_data"][date] = {
      infected: 0,
      deaths: 0,
      recovered: 0,
    };
  });
  return globalData;
}
/**
 * Get Global daily totals by country
 * @param  {} countryData
 * @param  {} globalData
 */
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
  });

  return globalData;
};
/**
 * Get Global daily totals from country data
 * @param  {} countryData
 * @param  {} globalData
 */
getDailyTotals = (countryData, globalData) => {
  dates = Object.keys(globalData["time_data"]);
  labels = ["infected", "deaths", "recovered"];
  labels.forEach((label) => {
    sum = 0;
    dates.forEach((date) => {
      Object.entries(countryData).forEach(([country, stats]) => {
        sum += stats["time_data"][label][date];
      });
      globalData["time_data"][date][label] = sum;
      sum = 0;
    });
  });

  return globalData;
};
/**
 * Create JSON formated Global data using the Global schema class
 */
formatGlobalData = (data) => {
  output = {};
  Object.entries(data["time_data"]).forEach(([date, value]) => {
    let infected = value["infected"];
    let deaths = value["deaths"];
    let recovered = value["recovered"];
    output[date] = new Global(infected, deaths, recovered, date);
  });
  return output;
};

main = async () => {
  let INFECTED_DATA = [];
  let DEATH_DATA = [];
  let RECOVERED_DATA = [];
  let countryData = {};
  let globalData = {};

  INFECTED_DATA = await readDataFromSource("./Data/raw/Cases_raw.csv");
  DEATH_DATA = await readDataFromSource("./Data/raw/Death_raw.csv");
  RECOVERED_DATA = await readDataFromSource("./Data/raw/Recovered_raw.csv");
  countryData = await createBlueprint(INFECTED_DATA, countryData);

  // format country based data
  countryData = formatData(INFECTED_DATA, countryData, "infected");
  countryData = formatData(DEATH_DATA, countryData, "deaths");
  countryData = formatData(RECOVERED_DATA, countryData, "recovered");

  // get global data from country data
  globalData = createGlobalBlueprint(globalData, countryData);
  globalData = getGlobalTotals(countryData, globalData);
  globalData = getDailyTotals(countryData, globalData);
  globalData = formatGlobalData(globalData);

  // save global data to output file
  saveToFile(globalData, "global_data_v2.json");
};

main();
