const session = require('../dbconnection');

class RepositoryBelong {
  /**
   * @param {String} where
   */
  search(where) {
    const cypher = ''
      + 'MATCH (ar:ARTICLE)-[b:BELONG]->(m:MAGAZINE) '
      + `${where} `
      + 'RETURN ar, b, m';
    const resultPromise = session.run(cypher);
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        resolve(result.records);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryBelong;