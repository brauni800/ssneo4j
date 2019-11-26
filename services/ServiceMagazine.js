const RepositoryMagazine = require('../repositories/RepositoryMagazine');
const global = require('../global');

class ServiceMagazine {
  create({ name, sjr }) {
    const magazine = global.validateMagazine({ name, sjr });
    return new RepositoryMagazine().create(magazine.name, magazine.sjr);
  }
  
  search(magazines) {
    if (typeof magazines === 'object') {
      if (!Object.keys(magazines).length) magazines = [];
    }
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryMagazine().search(global.whereGenerator([], [], magazines));
  }

  delete(magazines) {
    if (Array.isArray(magazines)) {
      return new RepositoryMagazine().delete(global.whereGenerator([], [], magazines));
    } else {
      magazines = global.validateMagazine(magazines, false);
      return new RepositoryMagazine().delete(global.whereGenerator([], [], [ magazines ]));
    }
  }
}

module.exports = ServiceMagazine;
