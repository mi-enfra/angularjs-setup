app.controller(
    'templateController',
    function($http, $scope) {
        $scope = {
            init: function init() {
                console.log('page | template');
            },

            fn: {
                healthCheck: function () {
                    var request = {
                        method: 'GET',
                        url: app.config.api_url + 'health/',
                        withCredentials: true,
                    };
                    $http(request)
                    .then(
                        function (response) {
                            console.log(response.data);
                        },
                        function error(error) {
                            console.error(error);
                        }
                    );
                },
            },
        };
        $scope.init();
    }
);
