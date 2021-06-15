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
    "new_cases": 2651,
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
    "new_cases": 80159,
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
- **\_new_cases** - number of cases since previous day
- **_new_deaths_** - number of deaths since previous day
- **_deaths_per_hour_** - number of deaths per hour
- **_percent_infected_** - percent of people infected based on global population
- **_percent_recovered_** - percent of people recovered based on global population
- **_percent_deaths_** - percent of deaths based on global population
- **_doubling_rate_** - dubling rate in days (5 day rolling period)
- **_mortality_rate_** - current mortality rate of the country of interest

### **_USA Daily Data_**

```YML
{
  "2020-03-29": {
    "california": {
      "date": "2020-03-29",
      "total_infected": 5852,
      "total_deaths": 124,
      "state_population": 39510000,
      "new_cases": 757,
      "new_deaths": 14,
      "deaths_per_hour": 1,
      "percent_infected": 0.015,
      "percent_deaths": 0,
      "doubling_rate": 5.182,
      "mortality_rate": 2.119
    },
    ...
    "new_york": {
      "date": "2020-03-29",
      "total_infected": 59648,
      "total_deaths": 1063,
      "state_population": 8399000,
      "new_cases": 7238,
      "new_deaths": 180,
      "deaths_per_hour": 8,
      "percent_infected": 0.71,
      "percent_deaths": 0.013,
      "doubling_rate": 5.254,
      "mortality_rate": 1.782
    },
  },
  ...
  "2020-04-16": {
    "california": {
      "date": "2020-04-16",
      "total_infected": 27677,
      "total_deaths": 956,
      "state_population": 39510000,
      "new_cases": 991,
      "new_deaths": 96,
      "deaths_per_hour": 4,
      "percent_infected": 0.07,
      "percent_deaths": 0.002,
      "doubling_rate": 17.859,
      "mortality_rate": 3.454
    },
    ...
    "new_york": {
      "date": "2020-04-16",
      "total_infected": 223691,
      "total_deaths": 14832,
      "state_population": 8399000,
      "new_cases": 9237,
      "new_deaths": 3215,
      "deaths_per_hour": 134,
      "percent_infected": 2.663,
      "percent_deaths": 0.177,
      "doubling_rate": 20.587,
      "mortality_rate": 6.631
    },
  }
}
```

## **Statistics**

- **_date_** - day of intrest
- **_total_infected_** - number of infections in a given state
- **_total_deaths_** - number of deaths in a given state
- **_state_population_** - state total population
- **_new_cases_** - number of cases since previous day in a given state
- **_new_deaths_** - number of deaths since previous day in a given state
- **_deaths_per_hour_** - number of deaths per hour
- **_percent_infected_** - percent of people infected based on State population
- **_percent_deaths_** - percent of deaths based on State population
- **_doubling_rate_** - virus dubling rate in days (5 day rolling period)
- **_mortality_rate_** - current mortality rate of the state of interest

## **Url's**

replace below for desired dataset in the next section

- http://tiny.cc/Covid-19-global - Global dataset
- http://tiny.cc/Covid-19-usa - United States dataset

## **Usage Example**

This is example using Javascript to fetch global data.

```javascript
fetch("http://tiny.cc/Covid-19-global")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

This is example using Javascript to fetch "New York" data from USA data.

```javascript
fetch("http://tiny.cc/Covid-19-usa")
  .then((response) => response.json())
  .then((data) => {
    Object.entries(data).forEach(([date, states]) => {
      console.log(states["new_york"]);
    });
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
