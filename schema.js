/**
 * Blueprint for the JSON objects
 */
class Schema {
  constructor() {
    this.total_infected = 0;
    this.total_infected = 0;
    this.total_deaths = 0;
    this.total_recovered = 0;
    this.doubling_rate = 0;
    this.mortality_rate = 0;
    this.date = { infected: null };
  }
}

module.exports = Schema;
