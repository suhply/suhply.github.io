var indexPageApp = angular.module('indexPageApp', ['slick']);


//Factory function for choosing between male / female layout.
indexPageApp.factory('indexPageFactory', ['$http', function($http) {

    return function(gender) {
        this.gender = gender;
        var baseurl = "https://dl.dropboxusercontent.com/u/57271664/testbed/json/"; //TODO: Replace with actual API

        this.navigationBar = function() {
            url = baseurl + gender + "/indexPageNavbar.json";   //TODO: Replace with actual API
            return $http.get(url);
        }

        this.sliderImages = function() {
            url = baseurl + gender + "/sliderImages.json";   //TODO: Replace with actual API
            return $http.get(url);
        }

        this.explainerVideo = function() {
            url = baseurl + gender + "/explainerVideo.json";   //TODO: Replace with actual API
            return $http.get(url);
        }
    }
}]);


indexPageApp.controller('indexPageController', 
    ['$scope', '$http', 'indexPageFactory', function($scope, $http, indexPageFactory) {

    $scope.genderSelection = 'M';
    $scope.numberLoaded = false;
    getNavigationBar();
    getSliderImages();
   // getExplainerVideo();


    function getNavigationBar () {
        new indexPageFactory($scope.genderSelection).navigationBar()
                    .then(function(response) {
                        var navbarData = response.data;
                        $scope.navigation = navbarData.navbar.navigation;
                    }
        );
    }

    function getSliderImages () {
        $scope.numberLoaded = false;
        new indexPageFactory($scope.genderSelection).sliderImages()
                    .then(function(response) {
                        var navbarData = response.data;
                        $scope.sliderImages = {};
                        $scope.sliderImages = navbarData.sliderImages;
                    }
        );
    }

    function getExplainerVideo () {
        new indexPageFactory($scope.genderSelection).explainerVideo()
                    .then(function(response) {
                        var navbarData = response.data;
                        $scope.explainerVideo = navbarData.explainerVideo;
                    }
        );
    }

    $scope.$watch('genderSelection', function() {
        //Update all items that need to be updated.
        getNavigationBar();
        getSliderImages();
       // getExplainerVideo();
        //Change the navigation to the new one.

        console.log($scope.sliderImages);
    })
}]);
