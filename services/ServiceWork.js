const RepositoryWork = require('../repositories/RepositoryWork');
const global = require('../global');

class ServiceWork {
  search({ authors = [], articles = [] }) {
    if (!Array.isArray(authors)) throw 'authors must be an array';
    if (!Array.isArray(articles)) throw 'articles must be an array';
    return new RepositoryWork().search(global.whereGenerator(authors, articles, []));
  }
}

module.exports = ServiceWork;