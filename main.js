const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const fetch = require('node-fetch');

dataSets = {
	Cases_raw: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
	Death_raw: "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",
	Recovered_raw: "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"
}


getdata = async (dataSets) => {

	Object.entries(dataSets).forEach(async ([key, value]) => {
		console.log(key, value)
		let data = await fetch(value)
		var destination = fs.createWriteStream(`./Data/raw/${key}.csv`);
		data.body.pipe(destination)
	})


}

getdata(dataSets).then((res, err) => {
	if (err) throw err;
	else {
		console.log("done")

	}
})





