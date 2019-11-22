const session = require('../dbconnection');

class RepositoryMagazine {
  createMagazine(name, sjr) {
    const resultPromise = session.run('MERGE (a:MAGAZINE {name: $name, sjr: $sjr}) RETURN a', { name, sjr });
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);
        resolve(node);
      }).catch(err => reject(err));
    });
  }
  getAll() {
    const resultPromise = session.run('MATCH (a:MAGAZINE) RETURN a');
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        const { records } = result;
        resolve(records);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryMagazine;