const RepositoryAuthor = require('../repositories/RepositoryAuthor');

class ServiceAuthor {
  createAuthor(data) {
    return new RepositoryAuthor().createAuthor(data.name, data.surname, data.lastname);
  }
  getAll() {
    return new RepositoryAuthor().getAll();
  }
}

module.exports = ServiceAuthor;