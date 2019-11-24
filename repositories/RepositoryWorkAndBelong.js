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
          cypher += `${id}.${key}=${isNaN(element[key]) ? `"${element[key]}"` : element[key]}${keyIndex !== keys.length - 1 ? ' AND ' : ''}`;
        } else {
          const { value, operation } = element[key];
          cypher += `${id}.${key}${operation}${isNaN(value) ? `"${value}"` : value}${keyIndex !== keys.length - 1 ? ' AND ' : ''}`;
        }
      });
      cypher += `${elementIndex !== array.length - 1 ? ' OR ' : ''}`;
    });
    return `(${cypher})`;
  }

  /**
   * @param {Object} obj 
   * @param {Object[]} array 
   * @param {Number} index 
   */
  const verifyRightValues = (obj, array, index) => {
    for (let i = index + 1; i <= array.length - 1; i++) {
      if (obj[array[i]]) return true;
    }
    return false;
  }

  let result = {
    authorCypher: `${authors.length > 0 ? buildCypher(authors, 'a') : ''}`,
    articlesCypher: `${articles.length > 0 ? buildCypher(articles, 'ar') : ''}`,
    magazinesCypher: `${magazines.length > 0 ? buildCypher(magazines, 'm') : ''}`
  }

  let where = '';
  const keys = Object.keys(result);
  keys.forEach((key, index) => {
    where += `${result[key] || ''}${index !== keys.length - 1 && result[key] && verifyRightValues(result, keys, index) ? ' AND ' : ''}`;
  });

  return where ? `WHERE ${where}` : '';
}

class RepositoryWorkAndBelong {
  /**
   * @param {Object[]} author 
   * @param {Object[]} article 
   * @param {Object[]} magazine 
   */
  search(authors, articles, magazines) {
    const cypher = ''
      + 'MATCH (a:AUTHOR)-[w:WORK_IN]->(ar:ARTICLE)-[b:BELONG]->(m:MAGAZINE) '
      + `${WhereGenerator(authors, articles, magazines)} `
      + 'RETURN a, w, ar, b, m';
    const resultPromise = session.run(cypher);
    return new Promise((resolve, reject) => {
      resultPromise.then(result => {
        resolve(result.records);
      }).catch(err => reject(err));
    });
  }
}

module.exports = RepositoryWorkAndBelong;