import { Logger as LoggerUtil } from '../src/logger';

describe('Suit to class Logger', () => {
  it('Happy Path - Any environment', async () => {
    expect(LoggerUtil.http('Test')).toBe('Test');
    expect(LoggerUtil.verbose('Test')).toBe('Test');
    expect(LoggerUtil.silly('Test')).toBe('Test');
    LoggerUtil.updateTimeZone();
    expect(LoggerUtil.warn('Test')).toBe('Test');
    LoggerUtil.updateTimeZone(undefined, 'America/Santiago');
    expect(LoggerUtil.debug('Test')).toBe('Test');
    LoggerUtil.updateTimeZone('es-CL');
    expect(LoggerUtil.error('Test1 | Test2')).toBe('Test1 | Test2');
    LoggerUtil.updateTimeZone('es-CL', 'America/Santiago');
    expect(LoggerUtil.info(['Test1', 'Test2'])).toBe('Test1 | Test2');
    expect(LoggerUtil.separator()).toBe('*****');
  });
});
