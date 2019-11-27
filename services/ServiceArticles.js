const RepositoryArticles = require('../repositories/RepositoryArticles');
const global = require('../global');

class ServiceArticles {
  create({ article, authors, magazine }) {
    article = global.validateArticle(article);

    if (!magazine) throw 'magazine is undefined';
    if (typeof magazine !== 'string') throw 'magazine must be a string';

    if (!authors) throw 'authors is undefined';
    authors = global.validateArray(authors, 'authors', global.validateAuthor, false);
    
    return new RepositoryArticles().create(article, magazine, global.whereGenerator(authors, [], []));
  }

  search(articles) {
    if (typeof articles === 'object') {
      if (!Object.keys(articles).length) articles = [];
    }
    articles = global.validateArray(articles, 'articles', global.validateArticle, false, true);
    return new RepositoryArticles().search(global.whereGenerator([], articles, []));
  }

  delete(articles) {
    if (Array.isArray(articles)) {
      articles = global.validateArray(articles, 'articles', global.validateArticle, false);
      return new RepositoryArticles().delete(global.whereGenerator([], articles, []));
    } else {
      articles = global.validateArticle(articles, false);
      return new RepositoryArticles().delete(global.whereGenerator([], [ articles ], []));
    }
  }
}

module.exports = ServiceArticles;
