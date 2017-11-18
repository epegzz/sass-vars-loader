const watchFilesForChanges = require('./watchFilesForChanges');

const mockFiles = ['file1', 'file2', 'file3'];
const mockLoader = {
  addDependency: jest.fn()
};

describe('When I call the function', () => {
  beforeAll(() => {
    watchFilesForChanges(mockLoader, mockFiles);
  });
  it('calls `loader.addDependency` for each file', () => {
    expect(mockLoader.addDependency).toHaveBeenCalledTimes(3);
    expect(mockLoader.addDependency).toHaveBeenCalledWith('file1');
    expect(mockLoader.addDependency).toHaveBeenCalledWith('file2');
    expect(mockLoader.addDependency).toHaveBeenCalledWith('file3');
  });
});
