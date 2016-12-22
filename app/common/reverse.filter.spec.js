describe('Reverse filter', function () {

    var reverseFilter;

    beforeEach(module('common'));

    beforeEach(inject(function ($filter) {
        reverseFilter = $filter('reverse');
    }));

    it('should reverse provided string', function () {
        expect(reverseFilter('ala ma kota')).toBe('atok am ala');
    });

});