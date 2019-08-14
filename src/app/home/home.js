app.controller(
    'homeController',
    function($http, $scope) {
        $scope.app = {
            sectionSelected: '',
            sectionsAll: [
                'Alpha',
            ],

            init: function () {
                $scope.app.fn.healthCheck()
                .then(
                    function (response) {
                        console.log('page | home | ' + response);
                    },
                    function (error) {
                        console.error(error);
                    }
                );
            },
            catchKeyup: function (event) {
                console.log(event.keyCode);
            },
            switchSection: function (section) {
                if ($scope.app.sectionSelected !== section) {
                    $scope.app.sectionSelected = section;
                } else {
                    $scope.app.sectionSelected = '';
                }
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
                                reject(error);
                            }
                        );
                    });
                },
            },
        };
        $scope.app.init();
    }
);
