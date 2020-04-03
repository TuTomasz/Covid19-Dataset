# COVID-19 Dataset

## **Build**

![Covid19 API update action](https://github.com/TuTomasz/Covid19-API/workflows/Covid19%20API%20update%20action/badge.svg)
## **Description**

This project converts csv format data from the 2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE to JSON data shown below with aditional fields and statistics coming soon.

The data ***auto-updates*** at specified intervals to ensure its always up to date with the original source.

## **Data Format - JSON**




### ***Global Daily Data***

```YML

{
  {
	"2020-01-22": {
		"date": "2020-01-22",
		"total_infected": 555,
		"total_deaths": 17,
		"total_recovered": 28,
		"percent_infected": 0,
		"percent_recovered": 0,
		"percent_deaths": 0,
		"doubling_rate": null,
		"mortality_rate": 3.063
	},
		...
	{
		"2020-04-01": {
		"date": "2020-04-01",
		"total_infected": 932605,
		"total_deaths": 46809,
		"total_recovered": 193177,
		"percent_infected": 0.012,
		"percent_recovered": 0.002,
		"percent_deaths": 0.001,
		"doubling_rate": 10.055,
		"mortality_rate": 5.019
	}
}
```
## **Statistics**
-	***date*** - day of intrest
- ***total_infected*** - number of infections globaly
- ***total_deaths*** - number of deaths globaly
- ***total_recoveries*** - number of recoveries globaly
-	***percent_infected*** - percent of people infected based on global population
- ***percent_recovered*** - percent of people recovered based on global population
- ***percent_deaths*** - percent of deaths based on global population
- ***doubling_rate*** - dubling rate in days (5 day rolling period)
- ***mortality_rate*** - current mortality rate of the country of interest


### ***Country Daily Data***
```YML
"us": {
    "total_infected": 101657,
    "total_deaths": 1581,
    "total_recovered": 869,
    "doubling_rate": 3.103,
    "mortality_rate": 1.555,
    "time_data": {
      "infected": {
        "2020-01-22": 1,
        ...
        "2020-03-27": 101657
      },
      "deaths": {
        "2020-01-22": 0,
        ...
        "2020-03-27": 1581
      },
      "recovered": {
        "2020-01-22": 0,
        ...
        "2020-03-27": 869
      }
    }
  },
```
## **Statistics**


- ***total_infected*** - number of infections in the country of interest
- ***total_deaths*** - number of deaths in the country of interest
- ***total_recoveries*** - number of recoveries in the country of interest
- ***doubling_rate*** - dubling rate in days
- ***mortality_rate*** - current mortality rate of the country of interest

## **Url's**

- http://tiny.cc/Covid-19  -country dataset
- http://tiny.cc/Covid-19-global  -global dataset

## **Usage Example**


This is example using Javascript to fetch data

```javascript
fetch("http://tiny.cc/Covid-19")
  .then(response => response.json())
  .then(data => {
    console.log(data["us"]);
});
```
This is example using Python to fetch data
```python

import json
import urllib3

http = urllib3.PoolManager()
response = http.request('GET', "http://tiny.cc/Covid-19")
data = json.loads(response.data)

print(data['us'])

```


## Add your project below if you find this dataset helpfull([ Add Here](https://github.com/TuTomasz/Covid19-API/edit/master/README.md))
***
