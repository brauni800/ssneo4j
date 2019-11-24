const session = require('../dbconnection');

class RepositoryWorkAndBelong {
  /**
   * @param {String} where
   */
  search(where) {
    const cypher = ''
      + 'MATCH (a:AUTHOR)-[w:WORK_IN]->(ar:ARTICLE)-[b:BELONG]->(m:MAGAZINE) '
      + `${where} `
      + 'RETURN a, w, ar, b, m';
    const resultPromise = session.run(cypher);
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        resolve(result.records);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryWorkAndBelong;