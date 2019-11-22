const RepositoryArticles = require('../repositories/RepositoryArticles');

class ServiceArticles {
  createArticle(data) {
    if(Number.isNaN(data.appointments)) throw 'La cita debe ser un número';
    let date = new Date();
    date.setFullYear(data.date.year, data.date.month, data.date.day);
    return new RepositoryArticles().createArticle(data.name, date, data.appointments);
  }
}

module.exports = ServiceArticles;