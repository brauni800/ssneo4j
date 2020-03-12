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

const getAuthor = (institution, scopus_id) => new Promise((resolve, reject) => {
	ConnectionFacultades.then(({ institutionConnection, facDB }) => {
		const filter = { scopus_claves: scopus_id };
		const project = { _id: 1, nombres: 1, apellidos: 1, sni: 1, dependencia: 1, cuerpo_academico: 1 };
		institutionConnection.collection(institution).find(filter).project(project).toArray((err, items) => {
			setTimeout(() => {
				console.log(items);
			}, 1000);
			if (err) {
				console.log('author toArray error', err);
				throw reject(err)
			};
			console.log('items collection', items);
			resolve({ items, facDB });
		});
	});
});

const generateData = new Promise((resolve, reject) => {
	listFacultades.then((institutions) => {
		getArticles.then((articles) => {
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
				/* getAuthor(institutions.items[0].name, article.scopus_id_autores[0]).then((author) => {
					author.facDB.close();
					console.log('author', author);
				}); */
				/* institutions.items.forEach((institution) => {
					const author_result = {};
					article.scopus_id_autores.forEach((scopus_id) => {
						getAuthor(institution.name, scopus_id).then((author) => {
							// if (!author.items) return;
							console.log('author founded', author.items);
							author_result = { ...author.items };
						}).catch((err) => console.log('error author', err));
						article_result.authors.push(author_result);
					});
				}); */
				result.push(article_result);
			});
			resolve({ result, institutions, articles });
		});
	});
});

generateData.then(({ result, institutions, articles }) => {
	console.log('result', result);
	institutions.facDB.close();
	articles.infoProdSDB.close();
});
