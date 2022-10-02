import { format, loggers, transports } from 'winston';

export class Logger {
  private static locales = '';
  private static timeZone = '';
  public static updateTimeZone(
    locales: string | undefined = undefined,
    timeZone: string | undefined = undefined
  ) {
    Logger.locales =
      typeof locales === 'string' && locales.trim().length > 0
        ? locales.trim()
        : '';
    Logger.timeZone =
      typeof timeZone === 'string' && timeZone.trim().length > 0
        ? timeZone.trim()
        : '';
  }
  private static updateBase() {
    if (loggers.has('app-logger') === true) {
      loggers.close('app-logger');
    }
    let stringNow = new Date().toLocaleString();
    if (Logger.locales.length > 0) {
      if (Logger.timeZone.length > 0) {
        stringNow = new Date().toLocaleString(Logger.locales, {
          timeZone: Logger.timeZone
        });
      } else {
        stringNow = new Date().toLocaleString(Logger.locales);
      }
    } else if (Logger.timeZone.length > 0) {
      stringNow = new Date().toLocaleString(undefined, {
        timeZone: Logger.timeZone
      });
    }
    loggers.add('app-logger', {
      format: format.combine(
        format.simple(),
        format.colorize({ all: true }),
        format.timestamp({
          format: stringNow
        }),
        format.printf(
          (log) => `${log.timestamp} | ${log.level} | ${log.message}`
        )
      ),
      transports: [
        new transports.Console({
          level: 'debug'
        })
      ]
    });
  }
  public static error(message: string | string[]): string {
    let result = '';
    result = Logger.getMessage(message);
    Logger.updateBase();
    loggers.get('app-logger').error(result);
    return result;
  }
  public static warn(message: string | string[]): string {
    let result = '';
    result = Logger.getMessage(message);
    Logger.updateBase();
    loggers.get('app-logger').warn(result);
    return result;
  }
  public static info(message: string | string[]): string {
    let result = '';
    result = Logger.getMessage(message);
    Logger.updateBase();
    loggers.get('app-logger').info(result);
    return result;
  }
  public static http(message: string | string[]): string {
    let result = '';
    result = Logger.getMessage(message);
    Logger.updateBase();
    loggers.get('app-logger').http(result);
    return result;
  }
  public static verbose(message: string | string[]): string {
    let result = '';
    result = Logger.getMessage(message);
    Logger.updateBase();
    loggers.get('app-logger').verbose(result);
    return result;
  }
  public static debug(message: string | string[]): string {
    let result = '';
    result = Logger.getMessage(message);
    Logger.updateBase();
    loggers.get('app-logger').debug(result);
    return result;
  }
  public static silly(message: string | string[]): string {
    let result = '';
    result = Logger.getMessage(message);
    Logger.updateBase();
    loggers.get('app-logger').silly(result);
    return result;
  }
  public static separator(): string {
    let result = '';
    result = '*****';
    console.log(result);
    return result;
  }
  private static getMessage(message: undefined | string | string[]): string {
    let result = '';
    if (message) {
      if (typeof message === 'string') {
        message = message.trim();
        if (message.includes('|') === false) {
          result = message;
        } else {
          result = Logger.getMessage(message.split('|'));
        }
      } else {
        for (const msg of message) {
          const m = Logger.getMessage(msg);
          if (m !== '') {
            if (result === '') {
              result = m;
            } else {
              result = `${result} | ${m}`;
            }
          }
        }
      }
    }
    return result;
  }
}
