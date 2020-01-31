const csv = require('csv-parse');
const fs = require('fs');
const path = require('path');
const RepositoryCSV = require('../repositories/RepositoryCSV');
const results = [];

class ServiceCSV{
    readCSV(csvfilepath){

        const getNameParts = (complete_name='') =>{
            let arrayNamesComplete = [];
            let arrayNameParts = [];
            let arrayNames = [];
    
            arrayNamesComplete = complete_name.split(",");

            arrayNamesComplete.forEach(element => {
                arrayNameParts = element.split(" ");
                let nameParts = {};
                if(arrayNameParts.length >= 4){
                    nameParts.name = arrayNameParts[0] + " " + arrayNameParts[1];
                    nameParts.surname = arrayNameParts[2];
                    nameParts.lastname = arrayNameParts[3];
                }else{
                    nameParts.name = arrayNameParts[0];
                    nameParts.surname = arrayNameParts[1];
                    nameParts.lastname = arrayNameParts[2];
                }
                arrayNames.push(nameParts);
            });
            //console.log(arrayNames);
            return arrayNames;
        }

        //Variables
        const response = [];
        const authorsforarticle = [],articles = [],magazines = [];
        let authors = [];

        //Parser configuration
        const parser = csv({
            delimiter:',',
            cast:true,
            columns:true
        });

        //Events
        parser.on('readable', function(){
            let data
            while(data = parser.read()){
                results.push(data);
            }
        });

        parser.on('error', function(err){
            console.error("error to read the file: " + err.message);
        });

        //Validations
        if(!csvfilepath) throw 'path is undefined';

        try {
            fs.statSync(csvfilepath);
            console.log('The file exixst');

        } catch (err) {
            if(err.code === 'ENOENT'){
                console.log('The file does not exists');
            }
        }

        if(path.extname(csvfilepath) != '.csv') throw 'The file is not a csv file';

        //Logic
        fs.createReadStream(csvfilepath)
        .pipe(parser)
        .on("end", async function(){
            console.log("the file was readed");

            results.forEach(element => {
                let article = {};
                let magazine = {};

                authors = getNameParts(element.autores);
                magazine.namemagazine = element.nombre_revista;
                magazine.sjr = element.SJR_revista;
                article.name = element.titulo;
                article.date = element.fecha_publicacion;
                article.appointments = element.citas_articulo;

                articles.push(article);
                magazines.push(magazine);
                authorsforarticle.push(authors);
            });

            //console.log(articles);
            //console.log(magazines);
            //console.log(authorsforarticle);

            for (let i = 0; i < articles.length; i++) {
                try {
                    await new RepositoryCSV().create(articles[i],authorsforarticle[i],magazines[i])
                    .then(node =>{
                        response.push(node);
                    }).catch(error => {
                        response.push(error);
                    });
                    
                } catch (err) {
                    console.log(err)
                    return err;
                }
            }
            
            parser.end();
            return response;
        });
    }

    
}

module.exports = ServiceCSV;