const session = require('../dbconnection');

/**
 * @param {Object[]} authors 
 */
const doCypher = (authors, magazine) => {
  let start = 'MATCH (a1:AUTHOR) WHERE';
  if (!authors.length) {
    console.error('Error to parsing cypher');
    throw 'Error to parsing cypher';
  }
  let authorsStr = '';
  authors.forEach(({ name, surname, lastname }, index) => {
    authorsStr += `a1.name="${name}" AND a1.surname="${surname}" AND a1.lastname="${lastname}"${index !== authors.length - 1 ? ' OR ' : ''}`;
  });
  let end = ''
    + `MATCH (r1:MAGAZINE) WHERE r1.name="${magazine}" `
    + 'MERGE (ar1:ARTICLE { name: $name, date: $date, appointments: $appointments }) '
    + 'MERGE (a1)-[w:WORK_IN]->(ar1) '
    + 'MERGE (ar1)-[b:BELONG]->(r1) '
    + 'RETURN a1, w, ar1, b, r1';
  return `${start} ${authorsStr} ${end}`;
}

class RepositoryArticles {
  createArticle({ name, date, appointments }, authors, magazine) {
    const cypher = doCypher(authors, magazine);
    const resultPromise = session.run(cypher, { name, date, appointments });
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        resolve(result.records);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryArticles;