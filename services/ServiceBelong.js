const RepositoryBelong = require('../repositories/RepositoryBelong');
const global = require('../global');

class ServiceBelong {
  search({ articles = [], magazines = [] }) {
    if (!Array.isArray(articles)) throw 'articles must be an array';
    if (!Array.isArray(magazines)) throw 'magazines must be an array';
    return new RepositoryBelong().search(global.whereGenerator([], articles, magazines));
  }
}

module.exports = ServiceBelong;