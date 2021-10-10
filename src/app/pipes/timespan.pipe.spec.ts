import { TimespanPipe } from './timespan.pipe';

describe('TimespanPipe', () => {
  it('create an instance', () => {
    const pipe = new TimespanPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "24h" when 86400 seconds is supplied', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(86400)).toBe('24h');
  });

  it('should return "12h" when 43200 seconds is supplied', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43200)).toBe('12h');
  });

  it('should return "12h 1s" when 43201 seconds is supplied', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43201)).toBe('12h 1s');
  });

  it('should return "12h 2m 3s" when 43323 seconds is supplied', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43323)).toBe('12h 2m 3s');
  });

  it('should return "12h 59s" when 43259 seconds is supplied', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43259)).toBe('12h 59s');
  });

  it('should return "0s" when 0 seconds is supplied', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(0)).toBe('0s');
  });

  it('should return "12h" when 43323 seconds is supplied with format "h"', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43323, 'h')).toBe('12h');
  });

  it('should return "12h 2m" when 43323 seconds is supplied with format "hm"', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43323, 'hm')).toBe('12h 2m');
  });

  it('should return "12h 3s" when 43323 seconds is supplied with format "hs"', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43323, 'hs')).toBe('12h 3s');
  });

  it('should return "3s" when 43323 seconds is supplied with format "s"', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43323, 's')).toBe('3s');
  });

  it('should return "12h 2m 3s" when 43323 seconds is supplied with format ""', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43323, '')).toBe('12h 2m 3s');
  });

  it('should return "0s" when 43323 seconds is supplied with format "abc"', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(43323, 'abc')).toBe('0s');
  });

  it('should return "240h" when 864000 seconds is supplied', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(864000)).toBe('240h');
  });

  it('should return "24h 2s" when -86402 seconds is supplied', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(-86402)).toBe('24h 2s');
  });

  it('should return "3h 20m 59s" when 12059 seconds is supplied', () => {
    const pipe = new TimespanPipe();
    expect(pipe.transform(12059)).toBe('3h 20m 59s');
  });
});
