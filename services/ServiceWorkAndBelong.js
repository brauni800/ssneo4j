const RepositoryWorkAndBelong = require('../repositories/RepositoryWorkAndBelong');
const global = require('../global');

class ServiceWorkAndBelong {
  create({ authors = [], articles = [], magazines = [] }) {
    authors = global.validateArray(authors, 'authors', global.validateAuthor, false);
    articles = global.validateArray(articles, 'articles', global.validateArticle, false);
    magazines = global.validateArray(magazines, 'magazines', global.validateMagazine, false);
    return new RepositoryWorkAndBelong().create(global.whereGenerator(authors, articles, magazines));
  }
  
  search({ authors = [], articles = [], magazines = [] }) {
    authors = global.validateArray(authors, 'authors', global.validateAuthor, false, true);
    articles = global.validateArray(articles, 'articles', global.validateArticle, false, true);
    magazines = global.validateArray(magazines, 'magazines', global.validateMagazine, false, true);
    return new RepositoryWorkAndBelong().search(global.whereGenerator(authors, articles, magazines));
  }

  delete({ authors = [], articles = [], magazines = [] }) {
    authors = global.validateArray(authors, 'authors', global.validateAuthor, false);
    articles = global.validateArray(articles, 'articles', global.validateArticle, false);
    magazines = global.validateArray(magazines, 'magazines', global.validateMagazine, false);
    return new RepositoryWorkAndBelong().delete(global.whereGenerator(authors, articles, magazines));
  }
}

module.exports = ServiceWorkAndBelong;
