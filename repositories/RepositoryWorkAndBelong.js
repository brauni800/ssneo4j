const session = require('../dbconnection');

/**
 * @param {Object[]} authors 
 * @param {Object[]} articles 
 * @param {Object[]} magazines 
 */
const WhereGenerator = (authors, articles, magazines) => {
   /**
    * @param {Object[]} array 
    * @param {String} id 
    */
  const buildCypher = (array, id) => {
    let cypher = '';
    array.forEach((element, elementIndex) => {
      const keys = Object.keys(element);
      keys.forEach((key, keyIndex) => {
        if (typeof element[key] === 'string') {
          cypher += `${id}.${key}=${element[key]}${keyIndex !== keys.length - 1 ? ' AND ' : ''}`;
        } else {
          const { value, operation } = element[key];
          cypher += `${id}.${key}${operation}${value}${keyIndex !== keys.length - 1 ? ' AND ' : ''}`;
        }
      });
      cypher += `${elementIndex !== array.length - 1 ? ' OR ' : ''}`;
    });
    return `(${cypher})`;
  }

  let authorCypher = `${authors.length > 0 ? buildCypher(authors, 'a') : null}`;
  let articlesCypher = `${articles.length > 0 ? buildCypher(articles, 'ar') : null}`;
  let magazinesCypher = `${magazines.length > 0 ? buildCypher(magazines, 'm') : null}`;
  return `${authorCypher} --- ${articlesCypher} --- ${magazinesCypher}`;
}

class RepositoryWorkAndBelong {
  search({ author, article, magazine }) {
    /* const cypher = ''
      + 'MATCH (a:AUTHOR)-[w:WORK_IN]->(ar:ARTICLE)-[b:BELONG]->(m:MAGAZINE) '
      + `${WhereGenerator(author, article, magazine)} `
      + 'RETURN a, w, ar, b, m';
    const resultPromise = session.run(cypher, { sjr }); */
    return new Promise((resolve, reject) => {
      /* resultPromise.then(result => {
        resolve(result.records);
      }).catch(err => reject(err)); */
      resolve(WhereGenerator(author, article, magazine));
    });
  }

  getSjrBiggerThan(sjr) {
    const cypher = ''
      + 'MATCH (a:AUTHOR)-[w:WORK_IN]->(ar:ARTICLE)-[b:BELONG]->(m:MAGAZINE) '
      + 'WHERE m.sjr > $sjr '
      + 'RETURN a, w, ar, b, m';
    const resultPromise = session.run(cypher, { sjr });
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        resolve(result.records);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryWorkAndBelong;