const app = require('../../src/app');

describe('\'trailheads\' service', () => {
  it('registered the service', () => {
    const service = app.service('trailheads');
    expect(service).toBeTruthy();
  });
});
