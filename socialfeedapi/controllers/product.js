var Product = require('../models/product');

exports.save = function (req, res) {
json=req.body[0]
var product= new Product();
product.productID=json.id;
product.prductName=json.name;
product.productPrice=json.price;
product.miniURL=json.miniURL;
product.coverURLs=json.coverURLs;
product.save(function(err) {
if (err) res.send(err);
res.json({ message: 'created!' });
});
};


exports.see = function(req, res) {
Product.find(function(err, val) {
if (err)
	res.send(err);
		res.json(val);
}); 
};


exports.getbyId = function(req, res) {
	Product.find({ 'productID':  req.params.id }, function (err, rcd) {
		if (err) console.log(err);
		res.json(rcd);
	});
};


exports.test=function(req,res){


	res.json({  
   'rows':[  
      {  
         'cols':[  
            {  
               'id':'searchlocation',
               'span':4,
               'height':600,
               'controller':'searchController',
               'feature':{  
                  'featureId':'id',
                  'eventCategory':'search-location',
                  'pivicparameternames':[  
                     {  
                        'parameterId':'id',
                        'eventAction':'click-search-btn',
                        'eventValue':10
                     }
                  ]
               },
               'directives':['search'

               ]
            },
            {  
               'id':'bookFlights',
               'span':4,
               'height':600,
               'controller':'bookController',
               'feature':{  
                  'featureId':'id',
                  'eventCategory':'book-hotels',
                  'pivicparameternames':[  
                     {  
                        'parameterId':'id',
                        'eventAction':'click-book-btn',
                        'eventValue':10
                     }
                  ]
               },
               'directives':['bookflights' 

               ]
            },
            {  
               'id':'popularPlaces',
               'span':4,
               'height':600,
               'controller':'fligtsController',
               'feature':{  
                  'featureId':'id',
                  'eventCategory':'search-flights',
                  'pivicparameternames':[  
                     {  
                        'parameterId':'id',
                        'eventAction':'click-flight-btn',
                        'eventValue':10
                     }
                  ]
               },
               'directives':['popular'  

               ]
            }
         ]
      },
     {
        'cols':[  
            {  
               'id':'reserveHotels',
               'span':6,
               'height':600,
               'controller':'searchController',
               'feature':{  
                  'featureId':'id',
                  'eventCategory':'search-location',
                  'pivicparameternames':[  
                     {  
                        'parameterId':'id',
                        'eventAction':'click-search-btn',
                        'eventValue':10
                     }
                  ]
               },
               'directives':['reserve'

               ]
            },
         {  
               'id':'discounts',
               'span':6,
               'height':600,
               'controller':'searchController',
               'feature':{  
                  'featureId':'id',
                  'eventCategory':'search-location',
                  'pivicparameternames':[  
                     {  
                        'parameterId':'id',
                        'eventAction':'click-search-btn',
                        'eventValue':10
                     }
                  ]
               },
               'directives':['discount'

               ]
            }
         ]
     }
   ]   
});
};

/*
exports.updatename = function (req, res) {
	Product.update({ 'name':  req.params.name}, req.body , {} , function (err, count) {
		if (err) console.log(err);
		res.send({ 'updated': count });
	});
};

exports.getname = function(req, res) {
	Product.find({ 'name':  req.params.name }, function (err, rcd) {
		if (err) console.log(err);
		res.json(rcd);
	});
};

exports.deletename = function (req, res) {
	var query =Artist.remove({ 'name':  req.params.name});
	if(query.exec()) res.json("'status':'1'");
	else res.json("'status':'0'"); 
};*/

