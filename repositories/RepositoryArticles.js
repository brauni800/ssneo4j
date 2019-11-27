const session = require('../dbconnection');

class RepositoryArticles {
  /**
   * @param {Object} article 
   * @param {String} article.name 
   * @param {String} article.date 
   * @param {Number} article.appointments 
   * @param {String} magazine 
   * @param {String} where 
   */
  create(article, magazine, where) {
    const { name, date, appointments } = article;
    const cypher = ''
      + 'MATCH (a:AUTHOR) '
      + `${where} `
      + 'MATCH (m:MAGAZINE) WHERE m.name=$magazine '
      + 'MERGE (ar:ARTICLE { name: $name, date: $date, appointments: $appointments }) '
      + 'MERGE (a)-[w:WORK_IN]->(ar) '
      + 'MERGE (ar)-[b:BELONG]->(m) '
      + 'RETURN a, w, ar, b, m';
    const resultPromise = session.run(cypher, { magazine, name, date, appointments });
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        if (result.summary.counters.relationshipsCreated()) resolve(result);
        else reject('Relationships have not been created');
      }).catch(err => reject(err));
    });
  }

  /**
   * @param {String} where 
   */
  search(where) {
    const cypher = ''
      + 'MATCH (ar:ARTICLE) '
      + `${where} `
      + 'RETURN ar';
    const resultPromise = session.run(cypher);
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        if (result.records.length > 0) resolve(result.records);
        else reject(null);
      }).catch(err => reject(err));
    });
  }

  /**
   * @param {String} where 
   */
  delete(where) {
    const cypher = ''
      + 'MATCH (ar:ARTICLE) '
      + `${where} `
      + 'DELETE ar';
    return new Promise((resolve, reject) => {
      session.run(cypher).then(result => {
        if (result.summary.counters.nodesDeleted()) resolve('Nodes deleted');
        else reject('Nodes have not been deleted');
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryArticles;
