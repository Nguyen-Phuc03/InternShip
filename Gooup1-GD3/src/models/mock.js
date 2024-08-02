const mockQuery = jest.fn();
const mockExecute = jest.fn();
const mockGet = jest.fn();
const mockSetEx = jest.fn();
module.exports = {
  query: mockQuery,
  promise: () => ({
    execute: mockExecute,
  }),
};
module.exports = {
  get: mockGet,
  setEx: mockSetEx,
};
