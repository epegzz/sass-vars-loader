const path = require('path')
const watchFilesForChanges = require('./watchFilesForChanges')
const watchFileForChanges = require('./watchFileForChanges')
const watchModuleForChanges = require('./watchModuleForChanges')

jest.mock('./watchFileForChanges')
jest.mock('./watchModuleForChanges')

describe('watchFilesForChanges', () => {
  it('watches modules', async () => {
    watchFileForChanges.mockClear()
    watchModuleForChanges.mockClear()

    let error
    try {
      await watchFilesForChanges({}, ['fs'])
    } catch (e) {
      error = e
    }

    expect(error).toEqual(undefined)
    expect(watchFileForChanges).toHaveBeenCalledTimes(0)
    expect(watchModuleForChanges).toHaveBeenCalledTimes(1)
    expect(watchModuleForChanges).toHaveBeenCalledWith(expect.anything(), 'fs')
  })

  it('watches files', async () => {
    watchFileForChanges.mockClear()
    watchModuleForChanges.mockClear()

    let error
    const file = path.resolve(__dirname, '../__mocks__/jsVars1.js')
    try {
      await watchFilesForChanges({}, [file])
    } catch (e) {
      error = e
    }

    expect(error).toEqual(undefined)
    expect(watchModuleForChanges).toHaveBeenCalledTimes(0)
    expect(watchFileForChanges).toHaveBeenCalledTimes(1)
    expect(watchFileForChanges).toHaveBeenCalledWith(expect.anything(), file)
  })

  it('throws error for invalid file', async () => {
    watchFileForChanges.mockClear()
    watchModuleForChanges.mockClear()

    let error
    const file = '~~invalid~~'
    try {
      await watchFilesForChanges({}, [file])
    } catch (e) {
      error = e
    }

    expect(error.message).toEqual(`Invalid file: "${file}". Consider using "path.resolve" in your config.`)
    expect(watchModuleForChanges).toHaveBeenCalledTimes(0)
    expect(watchFileForChanges).toHaveBeenCalledTimes(0)
  })
})
