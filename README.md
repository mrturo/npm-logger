# Uncomplicated Winston Logger

An easy library to write winton logs without any complicated configuration.

## Installation

    npm install uncomplicated-winston-logger

## Example

    import { Logger } from  'uncomplicated-winston-logger';
    Logger.http('Test');
    Logger.verbose('Test');
    Logger.silly('Test');
    Logger.warn('Test');
    Logger.debug('Test');
    Logger.error('Test');
    Logger.info('Test');
