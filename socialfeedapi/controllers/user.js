
var User = require('../models/user');
var requestToken="";
var request=require("request");


//initializes the token this must be call inorder to perform every tasks below
exports.initialize = function (req, res) {
requestToken=req.body.token;
res.json({ message: 'session initialized' });
//console.log(requestToken);
}

//get the user from user id
exports.isthere=function(req,res){
console.log("sending data of "+req.params.id);
User.find({ 'id':  req.params.id }, function (err, rcd) {
		if (err) console.log(err);

		res.json(rcd);
});	
}

//updating a user's field by user ID
exports.update=function(req,res){

var conditions={'id':req.params.id};
var updates=req.body[0];
console.log(updates);
User.update(conditions, updates , {} , function (err, count) {
					if(err){res.send({'status': 304});}

					else{res.send({ 'status': 200 });

					console.log(req.params.id+" updated");
					}
					
});		

}

//save the user name id the mongo database
exports.save = function (req, res) {
request('https://graph.facebook.com/me?access_token='+requestToken, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var user= new User();
    console.log(body);
    body=JSON.parse(response.body);

    
	user.fname=body.name.split(" ")[0];
	user.lname=body.name.split(" ")[1];
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

exports.buy=function(req,res){

	var id=req.params.id;
	var product=req.params.product;
	res.json({ message: 'done!' });
	//console.log(id);
	//console.log(product);
	var item = req.body[0];
 
// find by document id and update
	User.findOneAndUpdate(
    {id: req.params.id},
    {$push: {purchasedItems: item}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    }
);
}



//load all the page likes to like field in the document
exports.loadlikes = function (req, res) {
//requestToken=req.body.token;
data=[];
likelist=[];
function callback1(error,response,body){
			if(error){
			console.log(data);				 
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

				User.update({'id': userid}, {'likes':likelist} , {} , function (err, count) {
					if (err) console.log(err);
					res.send({ 'updated': count });
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
}




exports.loadfriends=function(req,res){
	console.log(requestToken);
	request('https://graph.facebook.com/me/friends?limit=999&access_token='+requestToken, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    
    body=JSON.parse(response.body);
    //console.log(body.data);

    User.update({'id': req.params.id}, {'friends':body.data} , {} , function (err, count) {
					if (err) console.log(err);
					res.send({ 'status': 200 });
				});		


    }

    else{
    	res.json(error);
    }
/*	user.save(function(err) {
	if (err) res.send(err);
	res.json({ message: 'created!' });
	});
	}*/

});
}


exports.friendsItems=function(req,res){
	console.log(req.params.id);
	var items=[];
	User.findOne({ 'id': req.params.id }, function (err, person) {
	  if (err) return handleError(err);

	  else{
	  	for(i=0;i<person.friends.length;i++){
	  			//console.log(person.friends[i].id);
	  				
	  			id=	person.friends[i].id;
	  			User.findOne({ 'id': id },function (err, itemlist) {

	  				if(itemlist==null)
	  						{}
	  				else
	  				{
	  				js='{'+itemlist.id+':'+itemlist.purchasedItems+'}';
	  				console.log(js);

	  					if(itemlist.purchasedItems.length>0)
	  					{
	  						items.push(itemlist.purchasedItems);
	  						
	  					}



	  				}
	  				//items.push(itemlist.purchasedItems);


	  				
	  			});
	  		
	  	}		
	  	
	 	
	  }
	 
	});	





}


