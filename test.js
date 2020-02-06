mocha = require('mocha');
expect = require('chai').expect;
Mustache = require('mustache');
sinon = require('sinon');

const functions = require('./index');

describe('script.js functions', () => {
    //beforeEach(() => fetch = () => 'This is sample return');

    it('Проверка  функции drawWeather на корректных данных', async () => {
        let grid = document.getElementById("grid");
        let warning = document.getElementById("warning");
        const result = await functions().drawWeather({
            ok: true,
            json: () => { return {
                weather: {description: 'weather'},
                main: {temp: 283, humidity: 10, pressure: 10000},
                wind: {speed: 10}
            }},
            grid: grid,
            warning: warning
        });
        expect(result).to.equal(true);
    });
});