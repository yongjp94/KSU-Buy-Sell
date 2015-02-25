'use strict';


var core = angular.module('core');

core.controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        
        var signUpFirst = function() {
            if (!$scope.authentication)  {
                alert('You must sign up first to view listings!');
            } else {
                $location.path('#!/articles');
            }
        }
	}
]);