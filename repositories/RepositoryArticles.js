const session = require('../dbconnection');

class RepositoryArticles {
  createArticle(name, date, appointments) {
    const resultPromise = session.run('MERGE (article:Article {name: $name, date: $date, appointments: $appointments}) RETURN article',
    { name, date, appointments });
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);
        resolve(node);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryArticles;