const session = require('../dbconnection');

class RepositoryMagazine {
  create(name, sjr) {
    const resultPromise = session.run('MERGE (m:MAGAZINE {name: $name, sjr: $sjr}) RETURN m', { name, sjr });
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        if (result.summary.counters.nodesCreated()) resolve(result.records[0].get(0));
        else reject('Node have not been created');
      }).catch(err => reject(err));
    });
  }
  
  /**
   * @param {String} where 
   */
  search(where) {
    const cypher = ''
      + 'MATCH (m:MAGAZINE) '
      + `${where} `
      + 'RETURN m';
    const resultPromise = session.run(cypher);
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        if (result.records.length > 0) resolve(result.records);
        else reject(null);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryMagazine;