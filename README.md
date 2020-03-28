# COVID-19 API
![Covid19 API update action](https://github.com/TuTomasz/Covid19-API/workflows/Covid19%20API%20update%20action/badge.svg)
## Description

This project converts csv format data from the 2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE to JSON data shown below with aditional fields and statistics coming soon.

The data ***auto-updates*** at specified intervals to ensure its always up to date with the original source.

## Data Format - JSON

- Aditional statistics will be added to this format in the near future.

```YML
"china": {
    "total_infected": 81897,
    "total_deaths": 3296,
    "total_recovered": 74720,
    "date": {
      "infected": {
        "2020-01-22": 548,
        ...
        "2020-03-27": 81897
      },
      "deaths": {
        "2020-01-22": 17,
        ...
        "2020-03-27": 3296
      },
      "recovered": {
        "2020-01-22": 28,
        ...
        "2020-03-27": 74720
      }
    }
  },
```

## Usage Example

This is example using Javascript to fetch data

```javascript
fetch("http://tiny.cc/Covid-19")
  .then(response => response.json())
  .then(data => {
    console.log(data["CHINA"]);
});
```
