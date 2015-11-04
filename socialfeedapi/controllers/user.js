
var User = require('../models/user');
var requestToken="";
var request=require("request");

exports.initialize = function (req, res) {
requestToken=req.body.token;
res.json({ message: 'session initialized' });

}

exports.save = function (req, res) {

request('https://graph.facebook.com/me?access_token='+requestToken, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var user= new User();
    body=JSON.parse(response.body);
	user.fname=body.first_name;
	user.lname=body.last_name;
	user.id=body.id;
	console.log(user.fname);
	console.log(user.lname);
	console.log(user.id);

	user.save(function(err) {
	if (err) res.send(err);
	res.json({ message: 'created!' });
	});
	}

  else{ 
  	console.log(error);
  	res.send(error);
  }
});
}




exports.loadlikes = function (req, res) {
//requestToken=req.body.token;
data=[];
likelist=[];
function callback1(error,response,body){
			if(error){
					//console.log(data[1][0])				 
				for (i=0 ;i<data.length;i++){
					for(j=0;j<data[i].length;j++)
						try{
						
						//console.log(data[i][j]['name']);
						likelist.push(data[i][j]['name']);
						}

						catch(err){}
				}
				

				

				request('https://graph.facebook.com/me?access_token='+requestToken, function (error, response, body) {
  				if (!error && response.statusCode == 200) {
  				body=JSON.parse(response.body);
  				var user= new User();
  				userid=body.id;
  				//console.log(likelist);

				User.update({'id': '4441624615381'}, {'likes':likelist} , {} , function (err, count) {
					if (err) console.log(err);
					res.send({ 'updated': count });
				});		


				User.find({ 'id': '4441624615381'}, function (err, rcd) {
					if (err) console.log(err);
					

					console.log(rcd);
				});	
			
				//User.update({ 'id': '4441624615381' },  { 'fname': 'large' },{},function(error){console.log(error);});
				//console.log(likelist);
				//res.json({ message: 'loaded' });

				}

                 //console.log(error);
           		});

           	}	

           	else{
               //  console.log(JSON.parse(response.body));
               		//console.log(j);
               		respond=JSON.parse(response.body);
               		data.push(respond['data']);
               		//return(respond);
	                //console.log(respond);
	                //console.log(data);
	                try{
	                getlikes(respond['paging']['next'],callback1);
	   				}
	   				catch(err){

	   				getlikes("https://graph.facebook.co1m/me/likes",callback1);  // calling with url that generate a error in order to terminate the recursive call
	   				};

	               //console.log(respond['paging']['next'])
         }

}


function getlikes(url,callback) {
    request.get(url,callback1);

}



getlikes("https://graph.facebook.com/me/likes?limit=999&access_token="+requestToken,callback1);


	//console.log(data);
};


