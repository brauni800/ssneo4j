const RepositoryMagazine = require('../repositories/RepositoryMagazine');

class ServiceMagazine {
  createMagazine({ name, sjr }) {
    if (!name) throw 'name is undefined';
    if (!sjr && sjr !== 0) throw 'sjr is undefined';
    sjr = parseInt(sjr, 10);
    if (isNaN(sjr)) throw 'sjr must be a number';
    return new RepositoryMagazine().createMagazine(name, sjr);
  }
  getAll() {
    return new RepositoryMagazine().getAll();
  }
}

module.exports = ServiceMagazine;