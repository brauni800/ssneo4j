const RepositoryAuthor = require('../repositories/RepositoryAuthor');
const global = require('../global');

class ServiceAuthor {
  create({ name, surname, lastname }) {
    const author = global.validateAuthor({ name, surname, lastname });
    return new RepositoryAuthor().create(author.name, author.surname, author.lastname);
  }

  search(authors) {
    if (typeof authors === 'object') {
      if (!Object.keys(authors).length) authors = [];
    }
    if (!Array.isArray(authors)) throw 'authors must be an array';
    return new RepositoryAuthor().search(global.whereGenerator(authors, [], []));
  }

  delete(authors) {
    if (Array.isArray(authors)) {
      new RepositoryAuthor().delete(global.whereGenerator(authors, [], []))
    } else {
      authors = global.validateAuthor(authors, false);
      return new RepositoryAuthor().delete(global.whereGenerator([ authors ], [], []));
    }
  }
}

module.exports = ServiceAuthor;
