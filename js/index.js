var app = angular.module("application", ['ui.router', 'restangular']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/birth');

    $stateProvider
        .state('birth', {
            url: '/birth',
            controller: 'controller',
            resolve: {
                application: ['service',
                    function (service) {
                        return service.getMessage('Birth');
                    }]
            },
            template:
            'Birth' + '<br>' + '<button ui-sref="birth.childhood">' + 'childhood' + '</button>' + '<div ui-view></div>'
        })
        .state('birth.childhood', {
            url: '/childhood',
            controller: 'controller',
            resolve: {
                application: ['service',
                    function (service) {
                        return service.getMessage('Childhood');
                    }]
            },
            template:
                'You up !' + '<br>' + '<button ui-sref="birth.childhood.study">' + 'study' + '</button>' + '<br>' + 
		'<button ui-sref="birth.childhood.career">' + 'career' + '</button>' + '<div ui-view></div>'
        })
        .state('birth.childhood.study', {
            url: '/study',
            controller: 'controller',
            resolve: {
                application: ['service',
                    function (service) {
                        return service.getMessage('Study');
                    }]
            },
            template:
                'Really ?' + '<br>' + '<button ui-sref=".phd">' + 'worklife' + '</button>' + '<br>' + 
		'<button ui-sref=".worklife">' + 'worklife' + '</button>' + '<div ui-view></div>'
        })
        .state('birth.childhood.study.phd', {
            url: '/phd',
            controller: 'controller',
            resolve: {
                application: ['service',
                    function (service) {
                        return service.getMessage('Phd');
                    }]
            },
            template:
                'Great, What next ?' + '<br>' + '<button ui-sref=".worklife">' + 'worklife' + '</button>' + '<div ui-view></div>'
        })
        .state('birth.childhood.career', {
            url: '/career',
            controller: 'controller',
            resolve: {
                application: ['service',
                    function (service) {
                        return service.getMessage('Career');
                    }]
            },
            template:
                'Good luck !' + '<br>' + '<button ui-sref=".worklife">' + 'worklife' + '</button>' + '<div ui-view></div>'
        });

    addWorkLife($stateProvider, 'birth.childhood.study');
    addWorkLife($stateProvider, 'birth.childhood.study.phd');
    addWorkLife($stateProvider, 'birth.childhood.career');

    function addWorkLife($stateProvider, parent) {
        $stateProvider.state(parent + '.worklife', {
            url: '/worklife',
            controller: 'controller',
            resolve: {
                application: ['service',
                    function (service) {
                        return service.getMessage('WorkLife');
                    }]
            },
            template:
                'Good old days !' + '<br>' + '<button ui-sref=".pension">' + 'Retraite' + '</button>' + '<div ui-view></div>'
        })
        .state(parent + '.worklife.pension', {
            url: '/pension',
            controller: 'controller',
            resolve: {
                application: ['service',
                    function (service) {
                        return service.getMessage('Pension');
                    }]
            },
            template:
                'Good old days !' + '<br>' + '<button ui-sref=".death">' + 'death' + '</button>' + '<div ui-view></div>'
        })
        .state(parent + '.worklife.pension.death', {
            url: '/death',
            controller: 'controller',
            resolve: {
                application: ['service',
                    function (service) {
                        return service.getMessage('Death');
                    }]
            },
            template:
                'RIP' + '<br>' + '<button ui-sref="birth">' + 'birth' + '</button>'
        });
    }
});


app.service("service", ['Restangular',
    function (Restangular) {

        this.message = "default";

        this.getMessage = function(key) {
            var map = {
                Birth: 'http://foaas.com/off/David/Couillaud',
                Childhood: 'http://foaas.com/life/David',
                Study: 'http://foaas.com/cool/David',
                Phd: 'http://foaas.com/everyone/David',
                Career: 'http://foaas.com/everything/David',
                WorkLife: 'http://foaas.com/what/David',
                Pension: 'http://foaas.com/because/David',
                Death: 'http://foaas.com/bye/David'
            };

            var singleSearch = Restangular.oneUrl('betaSearch', map[key]);

            this.message = singleSearch.get().then(function(response){
                return response.message;
            })
        };
    }]
);


app.controller("controller", ['$scope', 'service', function ($scope, service) {
    $scope.serviceRest = service;
}]);
