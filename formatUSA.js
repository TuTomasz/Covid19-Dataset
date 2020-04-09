const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const { State } = require("./src/usa_schema");
/**
 * Blueprint for the JSON objects
 */
class stateTemp {
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
      .pipe(csv("Province_State", "Country_Region"))
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
  bluePrint = new Object();
  states = new Object();

  // parse all states
  raw.forEach((element) => {
    let state = element["Province_State"]
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "_");
    states[state] = 0;
  });

  Object.entries(raw[0]).forEach(([key, value]) => {
    let dateReg = /^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{1,2}$/g;
    if (dateReg.test(key)) {
      let date = new Date(key).toJSON().split("T")[0];
      bluePrint[date] = states;
    }
  });
  return bluePrint;
}
/**
 * apply case data to schema
 */
async function formatCaseData(raw, formated) {
  let dates = Object.keys(formated);
  let states = Object.keys(formated[dates[0]]);
  let rawDates = new Set();
  let data = [];
  dateState = {};

  states.forEach((state) => {
    dateState[state] = [0, 0];
  });

  raw.forEach((element) => {
    Object.entries(element).forEach(([key, value]) => {
      let dateReg = /^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{1,2}$/g;
      if (dateReg.test(key)) {
        rawDates.add(key);
      }
    });
  });

  rawDates.forEach((date) => {
    raw.forEach((element) => {
      let state = element["Province_State"]
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");
      let number = parseInt(element[date]);

      if (dateState[state][0] == 0) {
        dateState[state][0] = number;
      } else {
        dateState[state][0] += number;
      }
    });
    let newdate = new Date(date).toJSON().split("T")[0];
    data.push(dateState);
    dateState = {};
    states.forEach((state) => {
      dateState[state] = [0, 0];
    });
  });

  Object.entries(formated).forEach(([key, value]) => {
    formated[key] = data.shift();
  });

  return formated;
}
/**
 * apply death data to schema
 */
async function formatDeathData(raw, formated) {
  let dates = Object.keys(formated);
  let states = Object.keys(formated[dates[0]]);
  let rawDates = new Set();
  let data = [];
  dateState = {};

  states.forEach((state) => {
    dateState[state] = [0, 0];
  });

  raw.forEach((element) => {
    Object.entries(element).forEach(([key, value]) => {
      let dateReg = /^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{1,2}$/g;
      if (dateReg.test(key)) {
        rawDates.add(key);
      }
    });
  });

  rawDates.forEach((date) => {
    raw.forEach((element) => {
      let state = element["Province_State"]
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");
      let number = parseInt(element[date]);

      if (dateState[state][1] == 0) {
        dateState[state][1] = number;
      } else {
        dateState[state][1] += number;
      }
    });
    let newdate = new Date(date).toJSON().split("T")[0];
    data.push(dateState);
    dateState = {};
    states.forEach((state) => {
      dateState[state] = [0, 0];
    });
  });
  Object.entries(formated).forEach(([key, value]) => {
    let deathData = data.shift();

    Object.entries(deathData).forEach(([state, number]) => {
      formated[key][state][1] = deathData[state][1];
    });
  });
  return formated;
}
/**
 * calucalte statistics given data
 */
async function calculateStatistics(data) {
  let formated = JSON.parse(JSON.stringify(data));

  daysSoFar = [];
  Object.entries(data).forEach(([date, value]) => {
    daysSoFar.push(value);

    Object.entries(value).forEach(([state, arr]) => {
      let cases = arr[0];
      let deaths = arr[1];
      formated[date][state] = new State(cases, deaths, date, state, daysSoFar);
    });
  });
  return formated;
}

main = async () => {
  let INFECTED_DATA = [];
  let DEATH_DATA = [];
  let RECOVERED_DATA = [];
  let stateData = {};

  // Country Data

  INFECTED_DATA = await readDataFromSource("./Data/raw/Cases_us_raw.csv");
  DEATH_DATA = await readDataFromSource("./Data/raw/Deaths_us_raw.csv");

  stateData = await createBlueprint(INFECTED_DATA, stateData);

  stateData = await formatCaseData(INFECTED_DATA, stateData);

  stateData = await formatDeathData(DEATH_DATA, stateData);

  stateData = await calculateStatistics(stateData);

  saveToFile(stateData, "usa_data_v2.json");
};

main();
