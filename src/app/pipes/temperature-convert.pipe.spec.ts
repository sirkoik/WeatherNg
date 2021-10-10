import { TemperatureConvertPipe } from './temperature-convert.pipe';

describe('TemperatureConvertPipe', () => {
  it('create an instance', () => {
    const pipe = new TemperatureConvertPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert 293.15K (20C) to 68F', () => {
    const pipe = new TemperatureConvertPipe();
    expect(pipe.transform(293.15, 'f')).toBe(68);
  });

  it('should convert 293.15K to 20C', () => {
    const pipe = new TemperatureConvertPipe();
    expect(pipe.transform(293.15, 'c')).toBe(20);
  });

  it('should convert 273.15K to 0C', () => {
    const pipe = new TemperatureConvertPipe();
    expect(pipe.transform(273.15, 'c')).toBe(0);
  });

  it('should convert 273.15K to 32F', () => {
    const pipe = new TemperatureConvertPipe();
    expect(pipe.transform(273.15, 'f')).toBe(32);
  });

  it('should convert 0K to -273.15C', () => {
    const pipe = new TemperatureConvertPipe();
    expect(pipe.transform(0, 'c')).toBe(-273.15);
  });

  it('should convert 0K to -459.67F', () => {
    const pipe = new TemperatureConvertPipe();
    expect(pipe.transform(0, 'f')).toBeCloseTo(-459.67);
  });

  it('should convert 255.3722K to 0F', () => {
    const pipe = new TemperatureConvertPipe();
    expect(pipe.transform(255.3722, 'f')).toBeCloseTo(0);
  });
});
