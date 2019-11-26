const RepositoryMagazine = require('../repositories/RepositoryMagazine');
const global = require('../global');

class ServiceMagazine {
  create({ name, sjr }) {
    if (!name) throw 'name is undefined';
    if (!sjr && sjr !== 0) throw 'sjr is undefined';
    sjr = parseInt(sjr, 10);
    if (isNaN(sjr)) throw 'sjr must be a number';
    return new RepositoryMagazine().create(name, sjr);
  }
  
  search(magazines) {
    if (typeof magazines === 'object') {
      if (!Object.keys(magazines).length) magazines = [];
    }
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryMagazine().search(global.whereGenerator([], [], magazines));
  }
}

module.exports = ServiceMagazine;