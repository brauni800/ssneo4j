const RepositoryWork = require('../repositories/RepositoryWork');
const global = require('../global');

class ServiceWork {
  create({ authors = [], articles = [] }) {
    authors = global.validateArray(authors, 'authors', global.validateAuthor, false);
    articles = global.validateArray(articles, 'articles', global.validateArticle, false);
    return new RepositoryWork().create(global.whereGenerator(authors, articles, []));
  }

  search({ authors = [], articles = [] }) {
    authors = global.validateArray(authors, 'authors', global.validateAuthor, false, true);
    articles = global.validateArray(articles, 'articles', global.validateArticle, false, true);
    return new RepositoryWork().search(global.whereGenerator(authors, articles, []));
  }

  delete({ authors = [], articles = [] }) {
    authors = global.validateArray(authors, 'authors', global.validateAuthor, false);
    articles = global.validateArray(articles, 'articles', global.validateArticle, false);
    return new RepositoryWork().delete(global.whereGenerator(authors, articles, []));
  }
}

module.exports = ServiceWork;
