const path = require('path');
const sassVarsLoader = require('./sassVarsLoader');

let mockOptions;

const mockOptionsWithVarsFromWebpack = {
  vars: {
    value1FromWebpack: 'foo',
    value2FromWebpack: 'foo',
    nested: {
      works: {
        veryWell: true,
        withoutProblems: true
      }
    }
  }
};

const mockOptionsWithVarsFromFiles = {
  files: [
    path.resolve(__dirname, '__mocks__/jsonVars1.json'),
    path.resolve(__dirname, '__mocks__/jsVars1.js'),
    path.resolve(__dirname, '__mocks__/jsonVars2.json')
  ]
};

const mockSassFileContents = `sassFileContents`;
const loaderContext = {
  cacheable: jest.fn(),
  addDependency: jest.fn()
};

jest.mock('loader-utils', () => ({
  getOptions: () => mockOptions
}));

let result;
describe('With vars from webpack config', () => {
  beforeAll(() => {
    mockOptions = mockOptionsWithVarsFromWebpack;
    result = sassVarsLoader.call(loaderContext, mockSassFileContents);
  });
  it('Returns expected Sass contents', () => {
    expect(result).toMatchSnapshot();
  });
  it('Marks itself as cacheable', () => {
    expect(loaderContext.cacheable).toBeCalled();
  });
  it('Does not watches any files for changes', () => {
    expect(loaderContext.addDependency).not.toBeCalled();
  });
});

describe('With vars from files', () => {
  beforeAll(() => {
    loaderContext.cacheable.mockClear();
    mockOptions = mockOptionsWithVarsFromFiles;
    result = sassVarsLoader.call(loaderContext, mockSassFileContents);
  });
  it('Returns expected Sass contents', () => {
    expect(result).toMatchSnapshot();
  });
  it('Marks itself as cacheable', () => {
    expect(loaderContext.cacheable).toBeCalled();
  });
  it('Watches files for changes', () => {
    expect(loaderContext.addDependency).toHaveBeenCalledTimes(3);
    expect(loaderContext.addDependency).toBeCalledWith(mockOptions.files[0]);
    expect(loaderContext.addDependency).toBeCalledWith(mockOptions.files[1]);
    expect(loaderContext.addDependency).toBeCalledWith(mockOptions.files[2]);
  });
});

describe('Without options', () => {
  beforeAll(() => {
    loaderContext.cacheable.mockClear();
    mockOptions = null;
    result = sassVarsLoader.call(loaderContext, mockSassFileContents);
  });
  it('Returns expected Sass contents', () => {
    expect(result).toEqual(mockSassFileContents);
  });
  it('Marks itself as cacheable', () => {
    expect(loaderContext.cacheable).toBeCalled();
  });
});
