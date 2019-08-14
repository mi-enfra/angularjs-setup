app.controller(
    'homeController',
    function($http, $scope) {
        $scope = {
            init: function init() {
                $scope.fn.healthCheck()
                .then(
                    function (response) {
                        console.log('page | home | ' + response);
                    },
                    function (error) {
                        console.error(error);
                    }
                );
            },

            fn: {
                healthCheck: function () {
                    return new Promise(function (resolve, reject) {
                        var request = {
                            method: 'GET',
                            url: app.config.api_url + 'health/',
                            withCredentials: true,
                        };
                        $http(request)
                        .then(
                            function (response) {
                                resolve(response.data['Response Time']);
                            },
                            function error(error) {
                                console.error(error);
                                reject(error);
                            }
                        );
                    });
                },
            },
        };
        $scope.init();
    }
);
