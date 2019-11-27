const RepositoryBelong = require('../repositories/RepositoryBelong');
const global = require('../global');

class ServiceBelong {
  create({ articles = [], magazines = [] }) {
    articles = global.validateArray(articles, 'articles', global.validateArticle, false);
    magazines = global.validateArray(magazines, 'magazines', global.validateMagazine, false);
    return new RepositoryBelong().create(global.whereGenerator([], articles, magazines));
  }

  search({ articles = [], magazines = [] }) {
    articles = global.validateArray(articles, 'articles', global.validateArticle, false, true);
    magazines = global.validateArray(magazines, 'magazines', global.validateMagazine, false, true);
    return new RepositoryBelong().search(global.whereGenerator([], articles, magazines));
  }

  delete({ articles = [], magazines = [] }) {
    articles = global.validateArray(articles, 'articles', global.validateArticle, false);
    magazines = global.validateArray(magazines, 'magazines', global.validateMagazine, false);
    return new RepositoryBelong().delete(global.whereGenerator([], articles, magazines));
  }
}

module.exports = ServiceBelong;
