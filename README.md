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
  "total_infected": 720129,
  "total_deaths": 33931,
  "total_recovered": 149145,
  "doubling_rate": 6.373,
  "mortality_rate": 4.712,
  "time_data": {
    "2020-01-22": { 
      "infected": 555, 
      "deaths": 17, 
      "recovered": 28 
      },
    ...
    "2020-03-29": { 
      "infected": 720117, 
      "deaths": 33925, 
      "recovered": 149082 
      }
  }
}
```
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
