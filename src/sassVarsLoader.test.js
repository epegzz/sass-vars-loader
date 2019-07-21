const path = require('path')
const sassVarsLoader = require('./sassVarsLoader')

const mockSassFileContents = `sassFileContents`
let result, error, mockOptions
const loaderContext = {
  cacheable: jest.fn(),
  addDependency: jest.fn(),
  resolve: jest.fn((context, file, callback) => {
    callback(null, file)
  }),
}

jest.mock('loader-utils', () => ({
  getOptions: () => mockOptions,
}))

describe('With vars from webpack config', () => {
  beforeAll(async () => {
    await setup({
      vars: {
        value1FromWebpack: 'foo',
        nested: {
          works: {
            veryWell: true,
            withoutProblems: 'indeed',
          },
        },
      },
    })
  })
  expectCorrectResult()
  expectMarksItselfAsCacheable()
})

describe('With vars from files', () => {
  beforeAll(async () => {
    await setup({
      files: [
        path.resolve(__dirname, '__mocks__/jsonVars1.json'),
        path.resolve(__dirname, '__mocks__/jsVars1.js'),
        path.resolve(__dirname, '__mocks__/tsVars1.ts'),
        path.resolve(__dirname, '__mocks__/jsonVars2.json'),
      ],
    })
  })
  expectCorrectResult()
  expectMarksItselfAsCacheable()
  expectWatchesFilesForChanges()
})

describe('With vars from JSON, JS and config', () => {
  beforeAll(async () => {
    await setup({
      vars: {
        loadingOrderTest3: 'fromConfig',
      },
      files: [
        path.resolve(__dirname, '__mocks__/jsonVars1.json'),
        path.resolve(__dirname, '__mocks__/jsVars1.js'),
        path.resolve(__dirname, '__mocks__/tsVars1.ts'),
      ],
    })
  })
  expectCorrectResult()
})

describe('Without options', () => {
  beforeAll(async () => {
    await setup()
  })
  expectCorrectResult()
  expectMarksItselfAsCacheable()
})

describe('With sass syntax', () => {
  beforeAll(async () => {
    await setup({
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
    })
  })
  expectCorrectResult()
})

describe('With invalid file', () => {
  beforeAll(async () => {
    await setup({
      syntax: 'sass',
      files: ['~invalid~'],
    })
  })
  expectError(`Invalid file: "~invalid~". Consider using "path.resolve" in your config.`)
})

async function setup(options) {
  result = null
  error = null
  mockOptions = options
  loaderContext.addDependency.mockClear()
  loaderContext.cacheable.mockClear()
  loaderContext.async = () => (err, res) => {
    error = err
    result = res
  }
  await sassVarsLoader.call(loaderContext, mockSassFileContents)
}

function expectCorrectResult() {
  it('Returns expected Sass contents', () => {
    expect(result).toMatchSnapshot()
  })
}

function expectError(message) {
  it('Returns an error', () => {
    expect(error && error.message).toEqual(message)
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
  })
}
