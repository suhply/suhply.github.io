var landingPageApp = angular.module('landingPageApp', ['slick']);


landingPageApp.service('productsService', ['$http', function($http) {

    this.getProducts = function() {
        var baseurl = "https://dl.dropboxusercontent.com/u/57271664/testbed/json/"; //TODO: Replace with actual API
        url = baseurl + "products.json";
        return $http.get(url);
    };
}]);

landingPageApp.controller('productController', ['$scope', '$http', 'productsService', function($scope, $http, productsService) {

    $scope.selectedCategory = "Skirts";

    getProducts();

    function getProducts() {
        productsService.getProducts()
            .then(function(response) {
                var productData = response.data;
                $scope.products = productData[$scope.selectedCategory];
                $scope.hero = $scope.products[0];
            });
    }

    $scope.selectProduct = function(product) {
        $scope.hero = product;
    }
}]);
