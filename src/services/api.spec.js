import axios from 'axios';
import changeObjectCase from 'change-object-case';
import {
  apiService,
  CHANGECASE_OPTIONS
} from './api';

describe('services/api', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('changeCase', function() {
    context('converting to camel case', function() {
      let expectedReturn;
      let camelArray;
      let camelKeys;

      beforeEach(function() {
        expectedReturn = faker.helpers.createTransaction();

        camelArray = this.sandbox.stub(changeObjectCase, 'camelArray').returns(expectedReturn);
        camelKeys = this.sandbox.stub(changeObjectCase, 'camelKeys').returns(expectedReturn);
      });

      it('converts arrays to camel case', function() {
        const initialArray = [faker.helpers.createTransaction()];
        const caseChangedArray = apiService.changeCase(initialArray, 'camel');

        expect(camelArray).to.be.calledWith(initialArray, CHANGECASE_OPTIONS);
        expect(caseChangedArray).to.equal(expectedReturn);
      });

      it('converts objects to camel case', function() {
        const initialObject = faker.helpers.createTransaction();
        const caseChangedObject = apiService.changeCase(initialObject, 'camel');

        expect(camelKeys).to.be.calledWith(initialObject, CHANGECASE_OPTIONS);
        expect(caseChangedObject).to.equal(expectedReturn);
      });
    });

    context('converting to snake case', function() {
      let expectedReturn;
      let snakeArray;
      let snakeKeys;

      beforeEach(function() {
        expectedReturn = faker.helpers.createTransaction();

        snakeArray = this.sandbox.stub(changeObjectCase, 'snakeArray').returns(expectedReturn);
        snakeKeys = this.sandbox.stub(changeObjectCase, 'snakeKeys').returns(expectedReturn);
      });

      it('converts arrays to snake case', function() {
        const initialArray = [faker.helpers.createTransaction()];
        const caseChangedArray = apiService.changeCase(initialArray, 'snake');

        expect(snakeArray).to.be.calledWith(initialArray, CHANGECASE_OPTIONS);
        expect(caseChangedArray).to.equal(expectedReturn);
      });

      it('converts objects to snake case', function() {
        const initialObject = faker.helpers.createTransaction();
        const caseChangedObject = apiService.changeCase(initialObject, 'snake');

        expect(snakeKeys).to.be.calledWith(initialObject, CHANGECASE_OPTIONS);
        expect(caseChangedObject).to.equal(expectedReturn);
      });
    });
  });

  describe('create', function() {
    let axiosApi;
    let create;
    let newInstance;

    beforeEach(function() {
      axiosApi = {
        interceptors: {
          request: {
            use: this.sandbox.stub()
          },
          response: {
            use: this.sandbox.stub()
          }
        }
      };

      create = this.sandbox.stub(axios, 'create').returns(axiosApi);

      newInstance = apiService.create();
    });

    it('creates a new instance of axios pointed at the base url', function() {
      expect(create).to.be.calledWith({ baseURL: '/api/v1' });
    });

    it('applies the request transform to the new axios instance', function() {
      expect(axiosApi.interceptors.request.use).to.be.calledWith(apiService.transformRequest);
    });

    it('applies the response transform to the new axios instance', function() {
      expect(axiosApi.interceptors.response.use).to.be.calledWith(apiService.transformResponse);
    });

    it('returns the new api instance', function() {
      expect(newInstance).to.equal(axiosApi);
    });
  });

  describe('transformRequest', function() {
    let changeCase;
    let expectedData;
    let initialRequest;
    let newRequest;

    beforeEach(function() {
      initialRequest = {
        data: faker.helpers.createTransaction(),
        headers: faker.helpers.createTransaction(),
        params: faker.helpers.createTransaction()
      };
      expectedData = faker.helpers.createTransaction();

      changeCase = this.sandbox.stub(apiService, 'changeCase').returns(expectedData);

      newRequest = apiService.transformRequest({ ...initialRequest });
    });

    it('passes through any existing headers', function() {
      expect(newRequest.headers).to.include(initialRequest.headers);
    });

    it('adds the json header', function() {
      expect(newRequest.headers).to.include({ 'Content-Type': 'application/json' });
    });

    it('converts any data from camel case to snake case', function() {
      expect(changeCase).to.be.calledWith(initialRequest.data, 'snake');
      expect(newRequest.data).to.equal(expectedData);
    });

    it('converts any params from camel case to snake case', function() {
      expect(changeCase).to.be.calledWith(initialRequest.params, 'snake');
      expect(newRequest.params).to.equal(expectedData);
    });
  });

  describe('transformResponse', function() {
    let changeCase;
    let expectedResponse;
    let initialResponse;
    let newResponse;

    beforeEach(function() {
      const camelCasedData = faker.helpers.createTransaction();
      initialResponse = {
        data: faker.helpers.createTransaction()
      };
      expectedResponse = {
        data: camelCasedData
      };

      changeCase = this.sandbox.stub(apiService, 'changeCase').returns(camelCasedData);

      newResponse = apiService.transformResponse({ ...initialResponse });
    });

    it('changes the case of the data to be camel cased', function() {
      expect(changeCase).to.be.calledWith(initialResponse.data, 'camel');
    });

    it('returns the response object with the changed data', function() {
      expect(newResponse).to.deep.equal(expectedResponse);
    });
  });
});
