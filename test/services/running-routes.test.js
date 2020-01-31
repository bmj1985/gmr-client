const app = require('../../src/app');

describe('\'running-routes\' service', () => {
  it('registered the service', () => {
    const service = app.service('running-routes');
    expect(service).toBeTruthy();
  });
});
