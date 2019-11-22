const RepositoryArticles = require('../repositories/RepositoryArticles');

class ServiceArticles {
  createArticle({ article, authors, magazine }) {
    if(Number.isNaN(article.appointments)) throw 'appointments must be a number';
    let date = new Date();
    date.setFullYear(article.date.year, article.date.month, article.date.day);
    const articleData = {
      name: article.name,
      date: date.toLocaleDateString(),
      appointments: article.appointments
    }
    return new RepositoryArticles().createArticle(articleData, authors, magazine);
  }
}

module.exports = ServiceArticles;