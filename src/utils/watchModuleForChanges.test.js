const watchModuleForChanges = require('./watchModuleForChanges')

let mockError
const mockLoader = {
  addDependency: jest.fn(),
  resolve: jest.fn((context, file, callback) => {
    callback(mockError, file)
  }),
}

describe('watchModuleForChanges', () => {
  beforeEach(() => {
    mockLoader.addDependency.mockClear()
  })
  it('calls `loader.addDependency`', async () => {
    let error
    try {
      await watchModuleForChanges(mockLoader, 'fs')
    } catch (e) {
      error = e
    }
    expect(error).toEqual(undefined)
    expect(mockLoader.addDependency).toHaveBeenCalledTimes(1)
    expect(mockLoader.addDependency).toHaveBeenCalledWith('fs')
  })

  it('rejects if require cannot resolve the module', async () => {
    const moduleName = '->definitelyNotAModule'
    let error
    try {
      await watchModuleForChanges(mockLoader, moduleName)
    } catch (e) {
      error = e
    }
    expect(error.message).toEqual(`Cannot find module '${moduleName}' from 'watchModuleForChanges.js'`)
    expect(mockLoader.addDependency).toHaveBeenCalledTimes(0)
  })
})
