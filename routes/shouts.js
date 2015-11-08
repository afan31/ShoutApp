var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err, result){
  console.log('cassandra connected: shouts');
});

var getAllShouts = 'Select * from shoutapp.shouts';


router.get('/', function(req, res) {
	client.execute(getAllShouts, [], function(err, result){
		if (err){
			res.status(404).send({msg: err});
		}else {
			//res.json(result);
			res.render('shouts', {
				shouts: result.rows
			});
		}
	});
});


var getUserShouts = 'Select * from shoutapp.usershouts where username=?';

router.get('/:username', function(req,res) {
	client.execute(getUserShouts, [req.params.username], function(err, result){
		if (err){
			res.status(404).send({msg: err});
		}else {
			res.render('shouts', {
				shouts: result.rows
			});
		}
	});
});



module.exports = router;
