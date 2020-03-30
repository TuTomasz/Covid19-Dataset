/**
 * Blueprint for the JSON objects
 */
class CountrySchema {
  constructor() {
    this.total_infected = 0;
    this.total_infected = 0;
    this.total_deaths = 0;
    this.total_recovered = 0;
    this.doubling_rate = 0;
    this.mortality_rate = 0;
    this.time_data = { infected: null };
  }
}

class GlobalShema {
  constructor() {
    this.total_infected = 0;
    this.total_deaths = 0;
    this.total_recovered = 0;
    this.doubling_rate = 0;
    this.mortality_rate = 0;
    this.time_data = {};
  }
}

module.exports = {
  CountrySchema,
  GlobalShema
};
