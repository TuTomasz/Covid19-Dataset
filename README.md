# COVID-19 API

## Description

This project converts csv format data from the 2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE to JSON data shown below with aditional fields and statiscics coming soon.

The data ***auto-updates*** at specified intervals to ensure its always up to date with the original source.

## Data Format - JSON

- Aditional statistics will be added to this format in the near future.

```YML
{
    "CHINA": {
    "TOTAL_INFECTED": 81782,
    "TOTAL_DEATHS": 3291,
    "TOTAL_RECOVERED": 74181,
    "TIME_DATA": {
      "INFECTED": {
        "2020-01-22": 548,
        ...
        "2020-03-26": 81782
      },
      "DEATHS": {
        "2020-01-22": 17,
        ...
        "2020-03-26": 3291
      },
      "RECOVERED": {
        "2020-01-22": 28,
        ...
        "2020-03-26": 74181
      }
    }
  },
}
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