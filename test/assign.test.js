const expect = require('chai').expect,
	assign = require('../lib/assign');

describe('assign', function () {

	it('should return same object', function (done) {
		const expected = {},
			actual = assign(expected);

		expect(Object.keys(actual).length).to.equal(0);
		expect(actual).to.equal(expected);

		done();
	});

	it('should assign properties', function (done) {
		const expected = {val: 5},
			actual = assign({}, expected);

		expect(Object.keys(actual).length).to.equal(1);
		expect(actual.val).to.equal(expected.val);

		done();
	});

	it('should assign props from multiple objects', function(done) {
		const expected1 = {val1: 42},
			expected2 = {val2: 'value'},
			actual = assign({}, expected1, expected2);

		expect(Object.keys(actual).length).to.equal(2);
		expect(actual.val1).to.equal(expected1.val1);
		expect(actual.val2).to.equal(expected2.val2);

		done();
	});

	it('should overwrite props with same name', function(done) {
		const expected1 = {val: 42},
			expected2 = {val: 64},
			actual = assign({}, expected1, expected2);

		expect(Object.keys(actual).length).to.equal(1);
		expect(actual.val).to.equal(expected2.val);

		done();
	});

	it('should skip invalid objects', function(done) {
		const source = {val: 42},
			actual = assign({}, null, undefined, 42, 'string', source);

		expect(Object.keys(actual).length).to.equal(1);
		expect(actual.val).to.equal(42);

		done();
	});

	it('should handle invalid object', function (done) {
		const source = {val: 42},
		a1 = assign(null, source),
		a2 = assign(void 0, source),
		a3 = assign(42, source),
		a4 = assign('string', source);

		expect(a1).to.equal(null);
		expect(a2).to.equal(void 0);
		expect(a3).to.equal(42);
		expect(a4).to.equal('string');

		done();
	});
});