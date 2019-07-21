const watchFileForChanges = require('./watchFileForChanges')

const mockLoader = {
  addDependency: jest.fn(),
}

describe('watchFileForChanges', () => {
  beforeAll(() => {
    watchFileForChanges(mockLoader, 'file1')
  })
  it('calls `loader.addDependency`', () => {
    expect(mockLoader.addDependency).toHaveBeenCalledTimes(1)
    expect(mockLoader.addDependency).toHaveBeenCalledWith('file1')
  })
})
