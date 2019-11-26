const session = require('../dbconnection');

class RepositoryMagazine {
  /**
   * @param {String} name 
   * @param {Number} sjr 
   */
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

  /**
   * @param {String} where 
   */
  delete(where) {
    const cypher = ''
      + 'MATCH (m:MAGAZINE) '
      + `${where} `
      + 'DELETE m';
    return new Promise((resolve, reject) => {
      session.run(cypher).then(result => {
        if (result.summary.counters.nodesDeleted()) resolve('Nodes deleted');
        else reject('Nodes have not been deleted');
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryMagazine;
