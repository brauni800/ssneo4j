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
  getAll() {
    const resultPromise = session.run('MATCH (a:AUTHOR) RETURN a');
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        const { records } = result;
        resolve(records);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryAuthor;