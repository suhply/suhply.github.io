var landingPageApp = angular.module('landingPageApp', ['slick']);


landingPageApp.service('productsService', ['$http', function($http) {

    this.getProducts = function() {
        var baseurl = "https://dl.dropboxusercontent.com/u/57271664/testbed/json/"; //TODO: Replace with actual API
        url = baseurl + "products.json";
        return $http.get(url);
    };
}]);

landingPageApp.controller('productController', ['$scope', '$http', 'productsService', function($scope, $http, productsService) {

    $scope.selectedCategory = "Jeans";
    
    getProducts();

    function getProducts() {
        productsService.getProducts()
            .then(function(response) {
                var productData = response.data;
                console.log(productData);

                $scope.products = productData[$scope.selectedCategory];
                $scope.hero = $scope.products[0];

                console.log ($scope.products);

            }
        );
    }


    $scope.selectProduct = function(product) {
        $scope.hero = product;
    }
}]);

