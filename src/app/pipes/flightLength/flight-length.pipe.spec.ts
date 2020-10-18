import { FlightLengthPipe } from './flight-length.pipe';

describe('FlightLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new FlightLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
