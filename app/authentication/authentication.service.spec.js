describe('Security service', function () {

    beforeEach(module('authentication', 'busService'));

    describe('Login process', function () {
        var httpBackend,
            http,
            securityService,
            busService,
            token = 1234,
            busService = {
                hasBroadcas: false,
                broadcast: function () {
                    this.hasBroadcas = true;
                }
            };

        beforeEach(inject(function ($httpBackend, $http, $injector) {
            httpBackend = $httpBackend;
            http = $http;
            securityService = $injector.get('securityService', {
                '$http': $httpBackend
            });
            eventbus = $injector.get('busService');
        }));

        function whenLoginProperly() {
            httpBackend.whenPOST('http://localhost:8080/oauth/token').respond(200, {'access_token' : token});
            securityService.login({
                login: 'jan',
                password: '123'
            });
            httpBackend.flush();
        }

        it('should set authorization header with token after user login', function () {
            whenLoginProperly();
            expect(http.defaults.headers.common.Authorization).toBe('Bearer ' + token);
        });

        it('should broadcast hasAuthorized event after user login', function (done) {
            eventbus.on('hasAuthorized').then(function () {
                done();
            });
            whenLoginProperly();
        });

    });

});