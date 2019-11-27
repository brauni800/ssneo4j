const RepositoryArticles = require('../repositories/RepositoryArticles');
const global = require('../global');

class ServiceArticles {
  create({ article, authors, magazine }) {
    article = global.validateArticle(article);

    if (!magazine) throw 'magazine is undefined';
    if (typeof magazine !== 'string') throw 'magazine must be a string';

    if (!authors) throw 'authors is undefined';
    if (!Array.isArray(authors)) throw 'authors must be an array';
    if (authors.length === 0) throw 'authors is empty';
    
    return new RepositoryArticles().create(article, magazine, global.whereGenerator(authors, [], []));
  }

  search(articles) {
    if (typeof articles === 'object') {
      if (!Object.keys(articles).length) articles = [];
    }
    if (!Array.isArray(articles)) throw 'articles must be an array';
    return new RepositoryArticles().search(global.whereGenerator([], articles, []));
  }

  delete(articles) {
    if (Array.isArray(articles)) {
      return new RepositoryArticles().delete(global.whereGenerator([], articles, []));
    } else {
      articles = global.validateArticle(articles, false);
      return new RepositoryArticles().delete(global.whereGenerator([], [ articles ], []));
    }
  }
}

module.exports = ServiceArticles;
