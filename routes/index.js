var express = require('express');
var router = express.Router();
const sdk = require('node-appwrite');

const client = new sdk.Client();

const storage = new sdk.Storage(client);
const databases = new sdk.Databases(client);



client
    .setEndpoint('https://appwrite.hewkhao.com/v1')
    .setProject('65cb5c98c0c31b55150e')
    .setKey('7da60fe1112d15af91dfbdad1b2dd33f1dd8c3bcad236c32523d067d745c04435461a3bc57e2d7d6fad123ddd6fa433deb8d526c5dd4e5ded5f269740237d40ea0d67fe2e8e65178607f13c1b1ebf991037693bbfe6333ba7d6c088b89d1982432b5fd70f20fe00f0d4b031c3ef0471d0d57ae87bb72dc1540591379a2547a20')


/* GET home page. */
router.get('/', function(req, res, next) {

  databases.listDocuments('65e9ef04e51bbbcd5f5c', '65e9ef1ae497529563bc').then(function (response) {
    console.log(response);
    res.render('index', { title: 'อวยพรวันเกิด Marvin', data: response.documents });
  });
});

/* GET Add page. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'เพิ่มข้อมูล' });
});

router.post('/add', function(req, res, next) {
  const name = req.body.name;
  const wish = req.body.wish;

  databases.createDocument('65e9ef04e51bbbcd5f5c', '65e9ef1ae497529563bc', sdk.ID.unique() ,{
    name: name,
    wish: wish
  }).then(function (response) {
    console.log(response);
    res.redirect('/');
  }, function (error) {
    console.log(error);
  });

 
});


module.exports = router;
