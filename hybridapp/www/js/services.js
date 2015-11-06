angular.module('mobile.services', ['ngResource'])

.factory('IsThere', function($resource) {
  // Might use a resource here that returns a JSON array
      return $resource('http://54.179.157.173:8080/api/isthere/:id');
  
});
