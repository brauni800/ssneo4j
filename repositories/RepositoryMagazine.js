const session = require('../dbconnection');

class RepositoryMagazine {
  createMagazine(name, sjr) {
    const resultPromise = session.run('MERGE (m:MAGAZINE {name: $name, sjr: $sjr}) RETURN m', { name, sjr });
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);
        resolve(node);
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