const RepositoryBelong = require('../repositories/RepositoryBelong');
const global = require('../global');

class ServiceBelong {
  create({ articles = [], magazines = [] }) {
    if (!Array.isArray(articles)) throw 'articles must be an array';
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryBelong().create(global.whereGenerator([], articles, magazines));
  }

  search({ articles = [], magazines = [] }) {
    if (!Array.isArray(articles)) throw 'articles must be an array';
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryBelong().search(global.whereGenerator([], articles, magazines));
  }

  delete({ articles = [], magazines = [] }) {
    if (!Array.isArray(articles)) throw 'articles must be an array';
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryBelong().delete(global.whereGenerator([], articles, magazines));
  }
}

module.exports = ServiceBelong;
