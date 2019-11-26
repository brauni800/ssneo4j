const RepositoryAuthor = require('../repositories/RepositoryAuthor');
const global = require('../global');

class ServiceAuthor {
  create({ name, surname, lastname }) {
    if (!name) throw 'name is undefined';
    if (!surname) throw 'surname is undefined';
    if (!lastname) throw 'lastname is undefined';
    return new RepositoryAuthor().create(name, surname, lastname);
  }

  search(authors) {
    if (typeof authors === 'object') {
      if (!Object.keys(authors).length) authors = [];
    }
    if (!Array.isArray(authors)) throw 'authors must be an array';
    return new RepositoryAuthor().search(global.whereGenerator(authors, [], []));
  }
}

module.exports = ServiceAuthor;