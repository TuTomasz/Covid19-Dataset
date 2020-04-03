# COVID-19 Dataset

## **Build**

![Covid19 API update action](https://github.com/TuTomasz/Covid19-API/workflows/Covid19%20API%20update%20action/badge.svg)

## **Description**

This project converts csv format data from the 2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE to JSON data shown below with aditional fields and statistics coming soon.

The data **_auto-updates_** at specified intervals to ensure its always up to date with the original source.

## **Data Format - JSON**

### **_Global Daily Data_**

```YML
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
  },
  "2020-04-02": {
    "date": "2020-04-02",
    "total_infected": 1013157,
    "total_deaths": 52983,
    "total_recovered": 210263,
    "percent_infected": 0.013,
    "percent_recovered": 0.003,
    "percent_deaths": 0.001,
    "doubling_rate": 10.151,
    "mortality_rate": 5.229
  }
}
```

## **Statistics**

- **_date_** - day of intrest
- **_total_infected_** - number of infections globaly
- **_total_deaths_** - number of deaths globaly
- **_total_recoveries_** - number of recoveries globaly
- **_percent_infected_** - percent of people infected based on global population
- **_percent_recovered_** - percent of people recovered based on global population
- **_percent_deaths_** - percent of deaths based on global population
- **_doubling_rate_** - dubling rate in days (5 day rolling period)
- **_mortality_rate_** - current mortality rate of the country of interest

### **_Country Daily Data_**

updating will be back soon


## **Url's**

- http://tiny.cc/Covid-19-global -global dataset

## **Usage Example**

This is example using Javascript to fetch data

```javascript
fetch("http://tiny.cc/Covid-19-global")
  .then(response => response.json())
  .then(data => {
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
