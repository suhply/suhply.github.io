var landingPageApp = angular.module('landingPageApp', ['slick']);


landingPageApp.service('productsService', ['$http', function($http) {

    this.getProducts = function() {
        var baseurl = "https://dl.dropboxusercontent.com/u/57271664/testbed/json/"; //TODO: Replace with actual API
        url = baseurl + "f/sliderImages.json";
        return $http.get(url);
    };
}]);

landingPageApp.controller('landingPageController', ['$scope', '$http', 'productsService', function($scope, $http, productsService) {

    $scope.heroimage = "img/sampleImages/jeans3.jpg";
    getProducts();

    function getProducts() {
        productsService.getProducts()
            .then(function(response) {
                var productData = response.data;
                $scope.sliderImages = {};
                $scope.sliderImages = productData.sliderImages;
            }
        );
    }
}]);


landingPageApp.directive ('backImg', function() {

    return function (scope, element, attrs) {
        var url = attrs.backImg;
        element.css ({
            'background' : 'url(' + url +')  no-repeat center',
            
            'width':'100%',
            'height':'100%'
        });
    };
});