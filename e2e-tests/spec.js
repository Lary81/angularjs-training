describe('Protractor Demo App', function() {
    it('should have a title', function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
        browser.pause();
        expect(browser.getTitle()).toEqual('Super Calculator');
    });
});