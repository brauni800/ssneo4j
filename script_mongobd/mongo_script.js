const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const ConnectionInfoProdS = new Promise((resolve) => {
	MongoClient.connect(url, { useNewUrlParser: true,	useUnifiedTopology: true },	function(err, db) {
		if (err) throw err;
		resolve({ connectInfoProdS: db.db('InfoProduccionS'), dbInfoProdS: db });
	});
});

const ConnectionFacultades = new Promise((resolve) => {
	MongoClient.connect(url, { useNewUrlParser: true,	useUnifiedTopology: true }, function(err, db) {
		if (err) throw err;
		resolve({ connectFac: db.db('Facultades'), dbFac: db });
	});
});

const listFacultades = new Promise((resolve, reject) => {
	ConnectionFacultades.then(({ connectFac, dbFac }) => {
		connectFac.listCollections().toArray(function(err, items) {
			if (err) throw reject(err);
			dbFac.close();
			resolve(items);
		});
	});
});

const getAuthors = new Promise((resolve, reject) => {
	const getAuthor = (connectFac, facultad, scopus_id) => new Promise((fullfil) => {
		connectFac.collection(facultad.name).find({ scopus_claves: scopus_id }).toArray((err, author) => {
			if (err) throw err;
			if (!author) return;
			fullfil(author);
		});
	});

	ConnectionInfoProdS.then(({ connectInfoProdS, dbInfoProdS }) => {
		connectInfoProdS.collection('articulos').find({}).toArray((err, articulos) => {
			if (err) throw err;
			articulos.forEach(articulo => {
				if (!articulo.autor_correspondencia) return;
				listFacultades.then((facultades) => {
					facultades.forEach((facultad) => {
						ConnectionFacultades.then(({ connectFac, dbFac }) => {
							const authors = [];
							articulo.scopus_id_autores.forEach((scopus_id) => {
								authors.push(getAuthor(connectFac, facultad, scopus_id));
							});
							dbFac.close();
							resolve(authors);
						});
					});
				});
			});
			dbInfoProdS.close();
		});
	}).catch((err) => reject(err));
});

getAuthors.then((authors) => {
	console.log('authors', authors);
});
