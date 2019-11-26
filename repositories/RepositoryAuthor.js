const session = require('../dbconnection');

class RepositoryAuthor {
  /**
   * @param {String} name 
   * @param {String} surname 
   * @param {String} lastname 
   */
  create(name, surname, lastname) {
    const resultPromise = session.run('MERGE (a:AUTHOR {name: $name, surname: $surname, lastname: $lastname}) RETURN a', { name, surname, lastname });
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
      + 'MATCH (a:AUTHOR) '
      + `${where} `
      + 'RETURN a';
    const resultPromise = session.run(cypher);
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        if (result.records.length > 0) resolve(result.records);
        else reject(null);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryAuthor;
