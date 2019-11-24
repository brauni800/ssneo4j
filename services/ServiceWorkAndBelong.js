const RepositoryWorkAndBelong = require('../repositories/RepositoryWorkAndBelong');

class ServiceWorkAndBelong {
  search({ authors = [], articles = [], magazines = [] }) {
    if (!Array.isArray(authors)) throw 'authors must be an array';
    if (!Array.isArray(articles)) throw 'articles must be an array';
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryWorkAndBelong().search(authors, articles, magazines);
  }
}

module.exports = ServiceWorkAndBelong;