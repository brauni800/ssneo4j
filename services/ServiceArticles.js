const RepositoryArticles = require('../repositories/RepositoryArticles');

class ServiceArticles {
  createArticle({ article, authors, magazine }) {
    if (!article) throw 'article is undefined';
    if (!article.name) throw 'name in article is undefined';
    if (!article.date) throw 'date in article is undefined';
    if (!article.appointments) throw 'appointments in article is undefined';
    if (!authors) throw 'authors is undefined';
    if (!magazine) throw 'magazine is undefined';

    let date = new Date(`${article.date} 00:00:0000`);
    if (date.toString() === 'Invalid Date') throw 'Invalid Date';
    article.date = date.toLocaleDateString();
    
    article.appointments = parseInt(article.appointments, 10);
    if (isNaN(article.appointments)) throw 'appointments must be a number';

    if (!Array.isArray(authors)) throw 'authors must be an array';
    if (authors.length === 0) throw 'authors is empty';
    
    return new RepositoryArticles().createArticle(article, authors, magazine);
  }
}

module.exports = ServiceArticles;