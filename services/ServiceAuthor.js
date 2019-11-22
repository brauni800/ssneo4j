const RepositoryAuthor = require('../repositories/RepositoryAuthor');

class ServiceAuthor {
  createAuthor({ name, surname, lastname }) {
    if (!name) throw 'name is undefined';
    if (!surname) throw 'surname is undefined';
    if (!lastname) throw 'lastname is undefined';
    return new RepositoryAuthor().createAuthor(name, surname, lastname);
  }
  getAll() {
    return new RepositoryAuthor().getAll();
  }
}

module.exports = ServiceAuthor;