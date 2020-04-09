class State {
  constructor(infected, deaths, date, state, previousDayData) {
    this.date = date;
    this.total_infected = infected;
    this.total_deaths = deaths;
    this.new_deaths = this.getNewDeaths(state, previousDayData);
    this.deaths_per_hour = this.getDeathsPeerHour(state, previousDayData);
    this.percent_infected = this.getPercentInfected();
    this.percent_deaths = this.getPercentDeaths();
    this.doubling_rate = this.getDoublingTime(previousDayData, state, 5);
    this.mortality_rate = this.getMortalityRate();
  }

  getMortalityRate() {
    let deaths = this.total_deaths;
    let infected = this.total_infected;
    let mortalityRate = parseFloat(((deaths * 100) / infected).toFixed(3));
    return mortalityRate;
  }
  getPercentInfected() {
    let population = State.total_population;
    let infected = this.total_infected;
    let percentInfected = parseFloat(
      ((infected * 100) / population).toFixed(3)
    );
    return percentInfected;
  }

  getPercentDeaths() {
    let population = State.total_population;
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

module.exports = {
  State,
};
