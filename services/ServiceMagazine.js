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
    magazines = global.validateArray(magazines, 'magazines', global.validateMagazine, false, true);
    return new RepositoryMagazine().search(global.whereGenerator([], [], magazines));
  }

  delete(magazines) {
    if (Array.isArray(magazines)) {
      magazines = global.validateArray(magazines, 'magazines', global.validateMagazine, false);
      return new RepositoryMagazine().delete(global.whereGenerator([], [], magazines));
    } else {
      magazines = global.validateMagazine(magazines, false);
      return new RepositoryMagazine().delete(global.whereGenerator([], [], [ magazines ]));
    }
  }
}

module.exports = ServiceMagazine;
