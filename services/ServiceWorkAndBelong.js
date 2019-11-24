const RepositoryWorkAndBelong = require('../repositories/RepositoryWorkAndBelong');

class ServiceWorkAndBelong {
  getSjrBiggerThan({ sjr }) {
    if (!sjr && sjr !== 0) throw 'sjr is undefined';
    sjr = parseInt(sjr, 10);
    if (isNaN(sjr)) throw 'sjr must be a number';
    return new RepositoryWorkAndBelong().getSjrBiggerThan(sjr);
  }
}

module.exports = ServiceWorkAndBelong;