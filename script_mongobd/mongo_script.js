const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const ConnectionInfoProdS = new Promise((resolve) => {
	MongoClient.connect(url, { useNewUrlParser: true,	useUnifiedTopology: true },	function(err, db) {
		if (err) throw err;
		resolve({ infoProdSConnection: db.db('InfoProduccionS'), infoProdSDB: db });
	});
});

const ConnectionFacultades = new Promise((resolve) => {
	MongoClient.connect(url, { useNewUrlParser: true,	useUnifiedTopology: true }, function(err, db) {
		if (err) throw err;
		resolve({ institutionConnection: db.db('Facultades'), facDB: db });
	});
});

const listFacultades = new Promise((resolve, reject) => {
	ConnectionFacultades.then(({ institutionConnection, facDB }) => {
		institutionConnection.listCollections().toArray(function(err, items) {
			if (err) throw reject(err);
			resolve({ items, facDB });
		});
	});
});

const getArticles = new Promise((resolve, reject) => {
	ConnectionInfoProdS.then(({ infoProdSConnection, infoProdSDB }) => {
		const projection = {
			_id: 0,
			titulo: 1,
			scopus_id: 1,
			scopus_id_autores: 1,
			citas_recibidas: 1,
			nombre_revista: 1,
			SJR: 1,
			autor_correspondencia: 1
		};
		infoProdSConnection.collection('articulos').find({}, projection).limit(100).toArray((err, items) => {
			if (err) reject(err);
			resolve({ items, infoProdSDB });
		});
	});
});

const getAuthor = (connection, db, institution, scopus_id) => new Promise((resolve, reject) => {
	const filter = { scopus_claves: scopus_id };
	const project = { _id: 1, nombres: 1, apellidos: 1, sni: 1, dependencia: 1, cuerpo_academico: 1 };
	connection.collection(institution).find(filter).project(project).toArray((err, items) => {
		if (err) reject(err);
		if (items.length > 0) resolve({ item: items[0] });
		else resolve();
	});
}).catch((err) => ({}));

const generateData = new Promise((resolve, reject) => {
	listFacultades.then((institutions) => {
		getArticles.then((articles) => {
			articles.infoProdSDB.close();
			ConnectionFacultades.then(({ institutionConnection, facDB }) => {
				const result = [];
				articles.items.forEach((article) => {
					if (!article.autor_correspondencia) return;
					const article_result = {
						title: article.titulo,
						scopus_id_article: article.scopus_id,
						appointments: article.citas_recibidas,
						magazine_name: article.nombre_revista,
						sjr: article.SJR,
						authors: [],
					};
					institutions.items.forEach((institution) => {
						article.scopus_id_autores.forEach((scopus_id) => {
							article_result.authors.push(getAuthor(institutionConnection, facDB, institution.name, scopus_id));
						});
					});
					result.push(article_result);
				});
				resolve({ result, institutions, articles });
			});
		});
	});
});

generateData.then(({ result, institutions, articles, author }) => {
	result.forEach((v) => {
		Promise.all(v.authors).then((authors) => {
			authors = authors.filter((author) => author);
			console.log('authors', authors);
		});
	});
	// console.log('author', author);
	// institutions.facDB.close();
	// articles.infoProdSDB.close();
});
