const RepositoryWorkAndBelong = require('../repositories/RepositoryWorkAndBelong');
const global = require('../global');

class ServiceWorkAndBelong {
  create({ authors = [], articles = [], magazines = [] }) {
    if (!Array.isArray(authors)) throw 'authors must be an array';
    if (!Array.isArray(articles)) throw 'articles must be an array';
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryWorkAndBelong().create(global.whereGenerator(authors, articles, magazines));
  }
  
  search({ authors = [], articles = [], magazines = [] }) {
    if (!Array.isArray(authors)) throw 'authors must be an array';
    if (!Array.isArray(articles)) throw 'articles must be an array';
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryWorkAndBelong().search(global.whereGenerator(authors, articles, magazines));
  }

  delete({ authors = [], articles = [], magazines = [] }) {
    if (!Array.isArray(authors)) throw 'authors must be an array';
    if (!Array.isArray(articles)) throw 'articles must be an array';
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryWorkAndBelong().delete(global.whereGenerator(authors, articles, magazines));
  }
}

module.exports = ServiceWorkAndBelong;
