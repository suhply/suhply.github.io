var landingPageApp = angular.module('landingPageApp', ['ngAnimate']);

    landingPageApp.controller('CarouselController', function ($scope) { 
        $scope.slides = [
           {image: '../static/images/image.jpg', description : 'Image 01'},
           {image: '../static/images/image-1.jpg', description : 'Image 02'},
           {image: '../static/images/image-2.jpg', description : 'Image 03'},
           {image: '../static/images/image.jpg', description : 'Image 04'}
        ];

        $scope.test = function(value){
            console.log(value);
        }
        $scope.direction    = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index>$scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    }).animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint=element.parent().width();
                    if(scope.direction !=='right'){
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });                 
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();
                
                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction ==='right'){
                        startPoint = -startPoint;
                    }
                    TweenMax.fromTo(element,0.5, {left:startPoint}, {left:0, onComplete:done});
                }
                else {
                    done();
                }
            }
        };
    });




landingPageApp.service('productsService', ['$http', function($http) {

    this.getProducts = function() {
        var baseurl = "https://dl.dropboxusercontent.com/u/57271664/testbed/json/"; //TODO: Replace with actual API
        url = baseurl + "products.json";
        return $http.get(url);
    };
}]);

landingPageApp.controller('productController', ['$scope', '$http', 'productsService', function($scope, $http, productsService) {

    var productData;
    $scope.selectedCategory = "Jeans";

    getProducts();

    function getProducts() {
        productsService.getProducts()
            .then(function(response) {
                productData = response.data;
                $scope.products = productData[$scope.selectedCategory];
                $scope.hero = $scope.products[0];
            });
    }

    $scope.selectProduct = function(product) {
        $scope.hero = product;
    }

    $scope.navigate = function (navigation) {
        console.log(navigation);
        $scope.selectedCategory = navigation;
        $scope.products = productData[$scope.selectedCategory];
        $scope.hero = $scope.products[0];
    }
}]);
