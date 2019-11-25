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
        if (result.records.length > 0) resolve(result.records);
        else reject(result.records);
      }).catch(err => reject(err));
    });
  }

  /**
   * @param {String} where
   */
  create(where) {
    const cypher = ''
      + 'MATCH (a:AUTHOR), (ar:ARTICLE), (m:MAGAZINE) '
      + `${where} `
      + 'MERGE (a)-[w:WORK_IN]->(ar)-[b:BELONG]->(m) '
      + 'RETURN a, w, ar, b, m';
    const resultPromise = session.run(cypher);
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
  delete(where) {
    const cypher = ''
      + 'MATCH (a:AUTHOR)-[w:WORK_IN]->(ar:ARTICLE)-[b:BELONG]->(m:MAGAZINE) '
      + `${where} `
      + 'DELETE w, b';
    const resultPromise = session.run(cypher);
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        if (result.summary.counters.relationshipsDeleted()) resolve('Relationships deleted');
        else reject('Relationships have not been deleted');
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryWorkAndBelong;