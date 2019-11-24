const RepositoryWorkAndBelong = require('../repositories/RepositoryWorkAndBelong');
const global = require('../global');

class ServiceWorkAndBelong {
  search({ authors = [], articles = [], magazines = [] }) {
    if (!Array.isArray(authors)) throw 'authors must be an array';
    if (!Array.isArray(articles)) throw 'articles must be an array';
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryWorkAndBelong().search(global.whereGenerator(authors, articles, magazines));
  }
}

module.exports = ServiceWorkAndBelong;