const session = require('../dbconnection');

class RepositoryCSV{
    create(article, authors = [], magazine){
        const {name, date, appointments} = article;
        const {namemagazine, sjr} = magazine;
        let authorsforreturn = '';
        let cypher = ''
        + 'MERGE (m:MAGAZINE {name: $namemagazine, sjr: $sjr}) '
        + 'MERGE (ar:ARTICLE { name: $name, date: $date, appointments: $appointments }) ';

        for (let i = 0; i < authors.length; i++) {
            const element = authors[i];
            let authorname, surname, lastname;
            authorname = element.name;
            surname = element.surname;
            lastname = element.lastname;

            cypher += `MERGE (a${i}:AUTHOR {name: ${authorname}, surname: ${surname}, lastname: ${lastname}})-[w:WORK_IN]->(ar) `;
            authorsforreturn += `a${i}, `
        }

        cypher += 'MERGE (ar)-[b:BELONG]->(m) '
        + 'RETURN ' + authorsforreturn + 'w, ar, b, m';

        //console.log(cypher);

        const resultPromise = session.run(cypher, {namemagazine, sjr, name, date, appointments});
        return new Promise((resolve, reject)=>{
            resultPromise.then(result =>{
                if(result.summary.counters.relationshipsCreated()) resolve(result);
                else reject('Relationships have not been created');
            }).catch(err => reject(err));
        });
    }
}

module.exports = RepositoryCSV;