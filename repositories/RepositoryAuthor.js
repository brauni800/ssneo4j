const session = require('../dbconnection');

class RepositoryAuthor {
  createAuthor(name, surname, lastname) {
    const resultPromise = session.run('MERGE (a:AUTHOR {name: $name, surname: $surname, lastname: $lastname}) RETURN a', { name, surname, lastname });
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