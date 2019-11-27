/**
 * @param {Object[]} authors 
 * @param {Object[]} articles 
 * @param {Object[]} magazines 
 */
const whereGenerator = (authors, articles, magazines) => {
  /**
   * @param {Object[]} array 
   * @param {String} id 
   */
  const buildCypher = (array, id) => {
    let cypher = '';
    array.forEach((element, elementIndex) => {
      const keys = Object.keys(element);
      keys.forEach((key, keyIndex) => {
        if (typeof element[key] === 'string' || typeof element[key] === 'number') {
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

/**
 * @param {Object} magazine 
 * @param {Boolean} full 
 */
const validateMagazine = (magazine, full = true) => {
  if (typeof magazine !== 'object') throw 'magazine must be an object';
  if (full) {
    // validación del sjr
    if (!magazine.sjr && magazine.sjr !== 0) throw 'sjr is undefined';
    magazine.sjr = parseInt(magazine.sjr, 10);
    if (isNaN(magazine.sjr)) throw 'sjr must be a number';
    //validación del nombre
    if (!magazine.name) throw 'name is undefined';
    if (typeof magazine.name !== 'string') throw 'name must be a string';
  } else {
    const keys = Object.keys(magazine);
    if (!keys.length) throw 'You must specify at least one attribute';
    if (!keys.find(m => m === 'sjr' || m === 'name')) throw 'You must specify at least sjr or name';
    // validación del sjr
    if (keys.find(m => m === 'sjr')) {
      magazine.sjr = parseInt(magazine.sjr, 10)
      if (isNaN(magazine.sjr)) throw 'sjr must be a number';
    }
    // validación del nombre
    if (keys.find(m => m === 'name')) {
      if (typeof magazine.name !== 'string') throw 'name must be a string';
    }
  }
  return magazine;
}

/**
 * @param {Object} author 
 * @param {Boolean} full 
 */
const validateAuthor = (author, full = true) => {
  if (typeof author !== 'object') throw 'author must be an object';
  if (full) {
    // validación del nombre
    if (!author.name) throw 'name is undefined';
    if (typeof author.name !== 'string') throw 'name must be a string';
    // validación del apellido materno
    if (!author.surname) throw 'surname is undefined';
    if (typeof author.surname !== 'string') throw 'surname must be a string';
    // validación del apellido paterno
    if (!author.lastname) throw 'lastname is undefined';
    if (typeof author.lastname !== 'string') throw 'lastname must be a string';
  } else {
    const keys = Object.keys(author);
    if (!keys.length) throw 'You must specify at least one attribute';
    if (!keys.find(a => a === 'name' || a === 'surname' || a === 'lastname')) throw 'You must specify at least name, surname or lastname';
    // validación del nombre
    if (keys.find(a => a === 'name')) {
      if (typeof author.name !== 'string') throw 'name must be a string';
    }
    // validación del apellido materno
    if (keys.find(a => a === 'surname')) {
      if (typeof author.surname !== 'string') throw 'surname must be a string';
    }
    // validación del apellido paterno
    if (keys.find(a => a === 'lastname')) {
      if (typeof author.lastname !== 'string') throw 'lastname must be a string';
    }
  }
  return author;
}

/**
 * @param {Object} article 
 * @param {Boolean} full 
 */
const validateArticle = (article, full = true) => {
  if (typeof article !== 'object') throw 'article must be an object';
  if (full) {
    if (!article) throw 'article is undefined';
    // validación de nombre
    if (!article.name) throw 'name in article is undefined';
    if (typeof article.name !== 'string') throw 'name must be a string';
    // validación de fecha
    if (!article.date) throw 'date in article is undefined';
    if (typeof article.date !== 'string') throw 'date must be a string';
    const date = new Date(`${article.date} 00:00:0000`);
    if (date.toString() === 'Invalid Date') throw 'Invalid Date';
    article.date = date.toLocaleDateString();
    // validación de citas
    if (!article.appointments) throw 'appointments in article is undefined';
    article.appointments = parseInt(article.appointments, 10);
    if (isNaN(article.appointments)) throw 'appointments must be a number';
  } else {
    const keys = Object.keys(article);
    if (!keys.length) throw 'You must specify at least one attribute';
    if (!keys.find(a => a === 'name' || a === 'date' || a === 'appointments')) throw 'You must specify at least name, date or appointments';
    // validación de nombre
    if (keys.find(a => a === 'name')) {
      if (typeof article.name !== 'string') throw 'name must be a string';
    }
    // validación de fecha
    if (keys.find(a => a === 'date')) {
      if (typeof article.date !== 'string') throw 'date must be a string';
      const date = new Date(`${article.date} 00:00:0000`);
      if (date.toString() === 'Invalid Date') throw 'Invalid Date';
      article.date = date.toLocaleDateString();
    }
    // validación de citas
    if (keys.find(a => a === 'appointments')) {
      article.appointments = parseInt(article.appointments, 10);
      if (isNaN(article.appointments)) throw 'appointments must be a number';
    }
  }
  return article;
}

/**
 * @param {Object[]} array 
 * @param {String} name 
 * @param {Function} callback 
 * @param {Boolean} full 
 */
const validateArray = (array, name, callback, full = true) => {
  if (!Array.isArray(array)) throw `${name} must be an array`;
  if (!array.length) throw `${name} is empty`;
  return array.map(element => callback(element, full));
}

module.exports = {
  whereGenerator,
  validateMagazine,
  validateAuthor,
  validateArticle,
  validateArray,
}
