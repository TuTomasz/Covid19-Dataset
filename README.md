# COVID-19 Dataset

## **Build**

![Update Data](https://github.com/TuTomasz/Covid19-Dataset/workflows/Update%20Data/badge.svg)![Archive Data](https://github.com/TuTomasz/Covid19-Dataset/workflows/Archive%20Data/badge.svg)

## **Description**

This project converts csv format data from the 2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE to JSON data shown below with aditional fields and statistics coming soon.

The data **_auto-updates_** at specified intervals to ensure its always up to date with the original source.

## **Data Format - JSON**

### **_Global Daily Data_**

```YML
{
  "2020-01-28": {
    "date": "2020-01-28",
    "total_infected": 5578,
    "total_recovered": 107,
    "total_deaths": 131,
    "new_deaths": 49,
    "deaths_per_hour": 2,
    "percent_infected": 0,
    "percent_recovered": 0,
    "percent_deaths": 0,
    "doubling_rate": 1.947,
    "mortality_rate": 2.349
  },
  ...
  },
  "2020-04-04": {
    "date": "2020-04-04",
    "total_infected": 1197405,
    "total_recovered": 246152,
    "total_deaths": 64606,
    "new_deaths": 5819,
    "deaths_per_hour": 242,
    "percent_infected": 0.015,
    "percent_recovered": 0.003,
    "percent_deaths": 0.001,
    "doubling_rate": 10.379,
    "mortality_rate": 5.396
  }
}
```

## **Statistics**

- **_date_** - day of intrest
- **_total_infected_** - number of infections globaly
- **_total_recoveries_** - number of recoveries globaly
- **_total_deaths_** - number of deaths globaly
- **_new_deaths_** - number of deaths since previous day
- **_deaths_per_hour_** - number of deaths per hour
- **_percent_infected_** - percent of people infected based on global population
- **_percent_recovered_** - percent of people recovered based on global population
- **_percent_deaths_** - percent of deaths based on global population
- **_doubling_rate_** - dubling rate in days (5 day rolling period)
- **_mortality_rate_** - current mortality rate of the country of interest

### **_Country Daily Data_**

updating will be back soon

### **_USA Daily Data_**

```YML
{
  "2020-03-02": {
    "california": {
      "date": "2020-03-02",
      "total_infected": 21,
      "total_deaths": 0,
      "new_deaths": 0,
      "deaths_per_hour": 0,
      "percent_infected": 0,
      "percent_deaths": 0,
      "doubling_rate": 5.36,
      "mortality_rate": 0
    },
    ...
    "new_york": {
      "date": "2020-03-02",
      "total_infected": 1,
      "total_deaths": 0,
      "new_deaths": 0,
      "deaths_per_hour": 0,
      "percent_infected": 0,
      "percent_deaths": 0,
      "doubling_rate": 0,
      "mortality_rate": 0
    },
  },
  ...
  "2020-04-08": {
    "california": {
      "date": "2020-04-08",
      "total_infected": 18897,
      "total_deaths": 495,
      "new_deaths": 63,
      "deaths_per_hour": 3,
      "percent_infected": 0.006,
      "percent_deaths": 0,
      "doubling_rate": 8.963,
      "mortality_rate": 2.619
    },
    ...
    "new_york": {
      "date": "2020-04-08",
      "total_infected": 151061,
      "total_deaths": 6268,
      "new_deaths": 779,
      "deaths_per_hour": 32,
      "percent_infected": 0.046,
      "percent_deaths": 0.002,
      "doubling_rate": 12.249,
      "mortality_rate": 4.149
    },
  }
}
```

## **Statistics**

- **_date_** - day of intrest
- **_total_infected_** - number of infections in a given state
- **_total_deaths_** - number of deaths in a given state
- **_new_deaths_** - number of deaths since previous day in a given state
- **_deaths_per_hour_** - number of deaths per hour
- **_percent_infected_** - percent of people infected based USA population
- **_percent_deaths_** - percent of deaths based on USA population
- **_doubling_rate_** - virus dubling rate in days (5 day rolling period)
- **_mortality_rate_** - current mortality rate of the state of interest

## **Url's**

replace below for desired dataset in the next section

- http://tiny.cc/Covid-19-global - Global dataset
- http://tiny.cc/Covid-19-usa - United States dataset

## **Usage Example**

This is example using Javascript to fetch data

```javascript
fetch("http://tiny.cc/Covid-19-global")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

This is example using Python to fetch data

```python

import json
import urllib3

http = urllib3.PoolManager()
response = http.request('GET', "http://tiny.cc/Covid-19-global")
data = json.loads(response.data)

print(data)

```

## Add your project below if you find this dataset helpfull([ Add Here](https://github.com/TuTomasz/Covid19-API/edit/master/README.md))

---
