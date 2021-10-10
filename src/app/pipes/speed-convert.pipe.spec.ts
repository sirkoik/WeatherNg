import { SpeedConvertPipe } from './speed-convert.pipe';

describe('SpeedConvertPipe', () => {
  it('create an instance', () => {
    const pipe = new SpeedConvertPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert 1 m/s to 3.6 km/h', () => {
    const pipe = new SpeedConvertPipe();
    expect(pipe.transform(1, 'kmh')).toBe(3.6);
  });

  it('should convert 1505.223 m/s to 5418.8028 km/h', () => {
    const pipe = new SpeedConvertPipe();
    expect(pipe.transform(1505.223, 'kmh')).toBe(5418.8028);
  });

  it('should return the same value 12 when no convertTo string is supplied', () => {
    const pipe = new SpeedConvertPipe();
    expect(pipe.transform(12)).toBe(12);
  });

  it('should convert 100 m/s to 223.6936 mph', () => {
    const pipe = new SpeedConvertPipe();
    expect(pipe.transform(100, 'mph')).toBe(223.6936);
  });

  it('should convert -100 m/s to -223.6936 mph', () => {
    const pipe = new SpeedConvertPipe();
    expect(pipe.transform(-100, 'mph')).toBe(-223.6936);
  });

  it('should convert 3e8 m/s to 671080800 mph', () => {
    const pipe = new SpeedConvertPipe();
    expect(pipe.transform(3e8, 'mph')).toBe(671080800);
  });

  it('should convert 222.59803 m/s to around 497.93754683608 mph', () => {
    const pipe = new SpeedConvertPipe();
    expect(pipe.transform(222.59803, 'mph')).toBeCloseTo(497.93754683608, 7);
  });
});
