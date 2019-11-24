const session = require('../dbconnection');

class RepositoryWork {
  /**
   * @param {String} where
   */
  search(where) {
    const cypher = ''
      + 'MATCH (a:AUTHOR)-[w:WORK_IN]->(ar:ARTICLE) '
      + `${where} `
      + 'RETURN a, w, ar';
    const resultPromise = session.run(cypher);
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        resolve(result.records);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryWork;