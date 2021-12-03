const fetch = require("node-fetch");

fetch("http://tiny.cc/Covid-19-usa")
  .then((response) => response.json())
  .then((data) => {
    Object.entries(data).forEach(([date, states]) => {
      console.log(states["new_york"]);
    });
  });

// fetch("http://tiny.cc/Covid-19-global")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });
