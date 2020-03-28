# COVID-19 API

## Build

![Covid19 API update action](https://github.com/TuTomasz/Covid19-API/workflows/Covid19%20API%20update%20action/badge.svg)
## Description
***

This project converts csv format data from the 2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE to JSON data shown below with aditional fields and statistics coming soon.

The data ***auto-updates*** at specified intervals to ensure its always up to date with the original source.

## Data Format - JSON
***

Aditional statistics will be added to this format in the near future.

```YML
"us": {
    "total_infected": 101657,
    "total_deaths": 1581,
    "total_recovered": 869,
    "doubling_rate": 3.103,
    "mortality_rate": 1.555,
    "date": {
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
## Statistics
***

- ***total_infected*** - number of infections in the country of interest
- ***total_deaths*** - number of deaths in the country of interest
- ***total_recoveries*** - number of recoveries in the country of interest
- ***doubling_rate*** - dubling rate in days
- ***mortality_rate*** - current mortality rate of the country of interest

## Usage Example
***

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
***

## Add your project here if you find this dataset helpfull([ Add Here](https://github.com/TuTomasz/Covid19-API/edit/master/README.md))
***