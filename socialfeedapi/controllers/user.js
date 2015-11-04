
var User = require('../models/user');
var requestToken="";
var request=require("request");

exports.initialize = function (req, res) {
requestToken=req.body.token;
res.json({ message: 'session initialized' });

} 

exports.save = function (req, res) {
var user= new User();
user.name=req.body.name;
user.email=req.body.email;

user.save(function(err) {
if (err) res.send(err);
res.json({ message: 'created!' });
});
};

exports.loadlikes = function (req, res) {
requestToken=req.body.token;
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

				console.log(likelist);
				res.json({ message: 'loaded' });

                 //console.log(error);
           }else{
               //  console.log(JSON.parse(response.body));
               		//console.log(j);
               		respond=JSON.parse(response.body);
               		data.push(respond['data']);
               		//return(respond);
	                //console.log(respond);
	                console.log(data);
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


