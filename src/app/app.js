var app = angular.module("application", ["ngCookies", "ngRoute"]);

app.config(function($httpProvider) {
    $httpProvider.defaults.headers.common = {
        'Content-Type': 'application/json',
    };
});

app.config(function($locationProvider) {
    $locationProvider.html5Mode(false);
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        controller: "homeController",
        templateUrl : "views/home.html"
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.config = {
    api_url: '/api/',
}
