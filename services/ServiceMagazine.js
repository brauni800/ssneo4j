const RepositoryMagazine = require('../repositories/RepositoryMagazine');

class ServiceMagazine {
  createMagazine(data) {
    return new RepositoryMagazine().createMagazine(data.name, data.sjr);
  }
  getAll() {
    return new RepositoryMagazine().getAll();
  }
}

module.exports = ServiceMagazine;