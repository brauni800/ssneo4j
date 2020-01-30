const csv = require('csv-parse');
const fs = require('fs');
const results = [];

class ServiceCSV{
    readCSV(csvfilepath){

        const getNameParts = (complete_name='') =>{
            console.log('entry to the method');
            let nameParts = {};
            let arrayNamesComplete = [];
            let arrayNameParts = [];
            let arrayNames = [];
    
            arrayNamesComplete = complete_name.split(",");
            //console.log(arrayNamesComplete);
            arrayNamesComplete.forEach(element => {
                console.log(element);
                arrayNameParts = element.split(" ");
                console.log(arrayNameParts);
                console.log(arrayNameParts.length);
                if(arrayNameParts.length === 3){
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
            console.log(arrayNames);
            return arrayNames;
        }

        const autorsforarticle = [],articles = [],magazines = [];
        let article = {}, magazine = {}, autors = [];

        const parser = csv({
            delimiter:',',
            cast:true,
            columns:true
        });

        parser.on('readable', function(){
            let data
            while(data = parser.read()){
                results.push(data);
            }
        });

        parser.on('error', function(err){
            console.error("error to read the file: " + err.message);
        });

        fs.createReadStream(csvfilepath)
        .pipe(parser)
        .on("end", function(){
            console.log("the file was readed");

            results.forEach(element => {
                console.log(element);
                autors = getNameParts(element.autores);
                magazine.name = element.nombre_revista;
                magazine.sjr = element.SJR_revista;
                article.name = element.titulo;
                article.date = element.fecha_publicacion;
                article.appointments = element.citas_articulo;

                articles.push(article);
                magazines.push(magazine);
                autorsforarticle.push(autors);
            });

            parser.end();
        });
    }

    
}

module.exports = ServiceCSV;