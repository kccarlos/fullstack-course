describe('Check if the app can react correctly to various favoriate dish shortname input from the user', function() {

    var $controller;
    var $httpBackend;
    var SignUpController;
    var ApiPath;

    beforeEach(function() {
        module('public');
        inject(function($injector, _$controller_) {
            $httpBackend = $injector.get('$httpBackend');
            ApiPath = $injector.get('ApiPath');
            $controller = _$controller_;
            SignUpController = $controller('SignUpController');
        });
    });

    it('Short name that leads to invalid response should be flagged', function() {
        let letters = 'L'
        let numbers = '98'
        let menuNumber = 'L99'
        let invalidResponse = null;

        $httpBackend.whenGET(ApiPath + '/menu_items/' + letters + '/menu_items/' + numbers + '.json').respond(invalidResponse);
        SignUpController.checkDish(menuNumber).then(function(response) {
            expect(SignUpController.dishNotExists).toEqual(true);
        });
        $httpBackend.flush();
    });

    it('short_name that leads to valid response should be accepted', function() {
        let letters = 'L'
        let numbers = '0'
        let menuNumber = 'L1'
        let validResponse = {
            "description": "chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
            "name": "Orange Chicken",
            "price_large": 9.75,
            "short_name": "L1"
        }

        $httpBackend.whenGET(ApiPath + '/menu_items/' + letters + '/menu_items/' + numbers + '.json').respond(validResponse);
        SignUpController.checkDish(menuNumber).then(function(response) {
            expect(SignUpController.dishNotExists).toEqual(false);
        });
        $httpBackend.flush();
    });
});