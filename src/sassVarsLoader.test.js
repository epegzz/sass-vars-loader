import path from 'path';
import sassVarsLoader from './sassVarsLoader';

let mockOptions;
jest.mock('loader-utils', () => ({
  getOptions: () => mockOptions
}));

const scenarios = {
  WITH_VARS_FROM_WEBPACK: Symbol(),
  WITH_VARS_FROM_FILES: Symbol(),
  WITH_VARS_FROM_EVERYWHERE: Symbol(),
  WITH_SASS_SYNTAX: Symbol(),
  WITHOUT_OPTIONS: Symbol()
};

describe('With vars from webpack config', () => {
  beforeAll(() => setup(scenarios.WITH_VARS_FROM_WEBPACK));
  expectCorrectResult();
  expectMarketItselfAsCacheable();
});

describe('With vars from files', () => {
  beforeAll(() => setup(scenarios.WITH_VARS_FROM_FILES));
  expectCorrectResult();
  expectMarketItselfAsCacheable();
  expectWatchesFilesForChanges();
});

describe('With vars from JSON, JS and config', () => {
  beforeAll(() => setup(scenarios.WITH_VARS_FROM_EVERYWHERE));
  expectCorrectResult();
});

describe('Without options', () => {
  beforeAll(() => setup(scenarios.WITHOUT_OPTIONS));
  expectCorrectResult();
  expectMarketItselfAsCacheable();
});

describe('With sass syntax', () => {
  beforeAll(() => setup(scenarios.WITH_SASS_SYNTAX));
  expectCorrectResult();
});

const loaderContext = {
  cacheable: jest.fn(),
  addDependency: jest.fn()
};

const mockSassFileContents = `sassFileContents`;

let result;
function setup(scenario) {
  switch (scenario) {
    case scenarios.WITH_VARS_FROM_WEBPACK:
      mockOptions = {
        vars: {
          value1FromWebpack: 'foo',
          nested: {
            works: {
              veryWell: true,
              withoutProblems: 'indeed'
            }
          }
        }
      };
      break;
    case scenarios.WITH_VARS_FROM_FILES:
      mockOptions = {
        files: [
          path.resolve(__dirname, '__mocks__/jsonVars1.json'),
          path.resolve(__dirname, '__mocks__/jsVars1.js'),
          path.resolve(__dirname, '__mocks__/jsonVars2.json')
        ]
      };
      break;
    case scenarios.WITH_VARS_FROM_EVERYWHERE:
      mockOptions = {
        vars: {
          loadingOrderTest3: 'fromConfig'
        },
        files: [
          path.resolve(__dirname, '__mocks__/jsonVars1.json'),
          path.resolve(__dirname, '__mocks__/jsVars1.js')
        ]
      };
      break;
    case scenarios.WITH_SASS_SYNTAX:
      mockOptions = {
        syntax: 'sass',
        vars: {
          value1FromWebpack: 'foo',
          nested: {
            works: {
              veryWell: true,
              withoutProblems: 'indeed'
            }
          }
        }
      };
      break;
    case scenarios.WITHOUT_OPTIONS:
      mockOptions = null;
      break;
    default:
      throw Error('Invalid Scenario');
  }

  loaderContext.cacheable.mockClear();
  result = sassVarsLoader.call(loaderContext, mockSassFileContents);
}

function expectCorrectResult() {
  it('Returns expected Sass contents', () => {
    expect(result).toMatchSnapshot();
  });
}

function expectMarketItselfAsCacheable() {
  it('Marks itself as cacheable', () => {
    expect(loaderContext.cacheable).toBeCalled();
  });
}

function expectWatchesFilesForChanges() {
  it('Watches files for changes', () => {
    const { files } = mockOptions;
    expect(loaderContext.addDependency).toHaveBeenCalledTimes(files.length);
    files.forEach(file => {
      expect(loaderContext.addDependency).toBeCalledWith(file);
    });
  });
}
