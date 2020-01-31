const app = require('../../src/app');

describe('\'gmr-events\' service', () => {
  it('registered the service', () => {
    const service = app.service('gmr-events');
    expect(service).toBeTruthy();
  });
});
