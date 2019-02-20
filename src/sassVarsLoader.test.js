const path = require('path')
const sassVarsLoader = require('./sassVarsLoader')

const mockSassFileContents = `sassFileContents`
let result, mockOptions
const loaderContext = {
  cacheable: jest.fn(),
  addDependency: jest.fn(),
}

jest.mock('loader-utils', () => ({
  getOptions: () => mockOptions,
}))

describe('With vars from webpack config', () => {
  beforeAll(() =>
    setup({
      vars: {
        value1FromWebpack: 'foo',
        nested: {
          works: {
            veryWell: true,
            withoutProblems: 'indeed',
          },
        },
      },
    }))
  expectCorrectResult()
  expectMarksItselfAsCacheable()
})

describe('With vars from files', () => {
  beforeAll(() =>
    setup({
      files: [
        path.resolve(__dirname, '__mocks__/jsonVars1.json'),
        path.resolve(__dirname, '__mocks__/jsVars1.js'),
        path.resolve(__dirname, '__mocks__/tsVars1.ts'),
        path.resolve(__dirname, '__mocks__/jsonVars2.json'),
      ],
    }))
  expectCorrectResult()
  expectMarksItselfAsCacheable()
  expectWatchesFilesForChanges()
})

describe('With vars from JSON, JS and config', () => {
  beforeAll(() =>
    setup({
      vars: {
        loadingOrderTest3: 'fromConfig',
      },
      files: [
        path.resolve(__dirname, '__mocks__/jsonVars1.json'),
        path.resolve(__dirname, '__mocks__/jsVars1.js'),
        path.resolve(__dirname, '__mocks__/tsVars1.ts'),
      ],
    }))
  expectCorrectResult()
})

describe('Without options', () => {
  beforeAll(() => setup())
  expectCorrectResult()
  expectMarksItselfAsCacheable()
})

describe('With sass syntax', () => {
  beforeAll(() =>
    setup({
      syntax: 'sass',
      vars: {
        value1FromWebpack: 'foo',
        nested: {
          works: {
            veryWell: true,
            withoutProblems: 'indeed',
          },
        },
      },
    }))
  expectCorrectResult()
})

function setup(options) {
  mockOptions = options
  loaderContext.cacheable.mockClear()
  result = sassVarsLoader.call(loaderContext, mockSassFileContents)
}

function expectCorrectResult() {
  it('Returns expected Sass contents', () => {
    expect(result).toMatchSnapshot()
  })
}

function expectMarksItselfAsCacheable() {
  it('Marks itself as cacheable', () => {
    expect(loaderContext.cacheable).toBeCalled()
  })
}

function expectWatchesFilesForChanges() {
  it('Watches files for changes', () => {
    const { files } = mockOptions
    expect(loaderContext.addDependency).toHaveBeenCalledTimes(files.length)
    files.forEach(file => {
      expect(loaderContext.addDependency).toBeCalledWith(file)
    })
  })
}
