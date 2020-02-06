mocha = require('mocha');
expect = require('chai').expect;
Mustache = require('mustache');
sinon = require('sinon');

const fetchMock = require('fetch-mock');

const API_KEY = "bf17aa753eec52f73cdb8d53e0609031";

global.document = {
    getElementById: (arg) => {
        return {
            innerHTML: () => '',
            addEventListener: () => '',
            appendChild: () => ''
        };
    },
    createElement: (arg) => {
        return {
            innerHTML: '',
            id: '',
            className: ''
        };
    }
};

const functions = require('./index');

describe('Проверка  функции drawWeather', () => {
    //beforeEach(() => fetch = () => 'This is sample return');

    it('Корректный запрос', async () => {
        const result = await functions().drawWeather({
            ok: true,
            json: () => {
                return {
                    weather: {description: 'weather'},
                    main: {temp: 283, humidity: 10, pressure: 10000},
                    wind: {speed: 10}
                }
            },
        });
        expect(result).to.equal(true);
    });

    it('Некорректный запрос', async () => {
        const result = await functions().drawWeather({
            ok: false,
            json: () => {
                return {
                    cod: 404,
                    message: 'fool test'
                }
            },
        });
        expect(result).to.equal(false);
    });
});

describe('Проверка функции getWeatherData', () => {
    it('Получение ответа', async () => {
        fetchMock.mock(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&APPID=${API_KEY}`, 200);
        const result = await functions().getWeatherData('Moscow');
        expect(result.ok).to.equal(true);
        fetchMock.restore();
    });
});

describe('Проверка  функции handleSubmit', () => {
    it('Введено пустое значение', async () => {
        const result = await functions().handleSubmit({
            preventDefault: () => {},
            target: [{value: ''}]
        });
        expect(result).to.equal('Empty value');
    });
});

describe('Проверка  функции clearForm', () => {
    it('Форма очищена', async () => {
        const result = await functions().clearForm();
        expect(result).to.equal('');
    });
});