class State {
  constructor(infected, deaths, date, state, previousDayData) {
    this.date = date;
    this.total_infected = infected;
    this.total_deaths = deaths;
    this.state_population = State.state_population[state];
    this.new_deaths = this.getNewDeaths(state, previousDayData);
    this.deaths_per_hour = this.getDeathsPeerHour(state, previousDayData);
    this.percent_infected = this.getPercentInfected(state);
    this.percent_deaths = this.getPercentDeaths(state);
    this.doubling_rate = this.getDoublingTime(previousDayData, state, 5);
    this.mortality_rate = this.getMortalityRate();
  }

  getMortalityRate() {
    let deaths = this.total_deaths;
    let infected = this.total_infected;
    let mortalityRate = parseFloat(((deaths * 100) / infected).toFixed(3));
    return mortalityRate;
  }
  getPercentInfected(state) {
    let population = State.state_population[state];
    let infected = this.total_infected;
    let percentInfected = parseFloat(
      ((infected * 100) / population).toFixed(3)
    );
    return percentInfected;
  }

  getPercentDeaths(state) {
    let population = State.state_population[state];
    let deaths = this.total_deaths;
    let percentDeaths = parseFloat(((deaths * 100) / population).toFixed(3));
    return percentDeaths;
  }
  getDoublingTime(data, state, period) {
    if (data.length <= 4) {
      return null;
    } else {
      let N_t = data[data.length - 1][state][0];
      let N_0 = data[data.length - 5][state][0];
      let growth_rate = Math.log10(N_t / N_0) / period;
      let doubling_time = Math.log10(2) / growth_rate;
      doubling_time = parseFloat(doubling_time.toFixed(3));
      return doubling_time;
    }
  }

  getDeathsPeerHour(state, data) {
    if (data.length == 1) {
      return data[0][state][1];
    } else {
      let currentDayDeaths = data[data.length - 1][state][1];
      let previousDayDeaths = data[data.length - 2][state][1];
      let addedDeaths = currentDayDeaths - previousDayDeaths;
      let deathsPerHour = Math.round(addedDeaths / 24);
      return deathsPerHour;
    }
  }
  getNewDeaths(state, data) {
    if (data.length == 1) {
      return data[0][state][1];
    } else {
      let currentDayDeaths = data[data.length - 1][state][1];
      let previousDayDeaths = data[data.length - 2][state][1];
      let addedDeaths = currentDayDeaths - previousDayDeaths;
      return addedDeaths;
    }
  }
}
// Satic fields
State.total_population = 331002651;
State.state_population = {
  american_samoa: 55465,
  guam: 165768,
  northern_mariana_islands: 56882,
  puerto_rico: 3194000,
  virgin_islands: 106977,
  alabama: 4903000,
  alaska: 731545,
  arizona: 7279000,
  arkansas: 3018000,
  california: 39510000,
  colorado: 5759000,
  connecticut: 3565000,
  delaware: 973764,
  district_of_columbia: 702455,
  florida: 21480000,
  georgia: 10620000,
  hawaii: 1416000,
  idaho: 1787000,
  illinois: 12670000,
  indiana: 6732000,
  iowa: 3155000,
  kansas: 2913000,
  kentucky: 4468000,
  louisiana: 4649000,
  maine: 1344000,
  maryland: 6046000,
  massachusetts: 6893000,
  michigan: 9987000,
  minnesota: 5640000,
  mississippi: 2976000,
  missouri: 6137000,
  montana: 1069000,
  nebraska: 1934000,
  nevada: 3080000,
  new_hampshire: 1360000,
  new_jersey: 8882000,
  new_mexico: 2097000,
  new_york: 8399000,
  north_carolina: 10490000,
  north_dakota: 762062,
  ohio: 11690000,
  oklahoma: 3957000,
  oregon: 4218000,
  pennsylvania: 12800000,
  rhode_island: 1059000,
  south_carolina: 5149000,
  south_dakota: 884659,
  tennessee: 6829000,
  texas: 29000000,
  utah: 3206000,
  vermont: 623989,
  virginia: 8536000,
  washington: 7615000,
  west_virginia: 1792000,
  wisconsin: 5822000,
  wyoming: 578759,
  diamond_princess: 3711,
  grand_princess: 3500,
};

module.exports = {
  State,
};
