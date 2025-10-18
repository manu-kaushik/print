import {
    log, info, warn, error, success, debug,
    table, count, countReset, dir, dirxml,
    startTimer, endTimer, configure
} from '../src/index';

// Mock console methods
const mockConsole = {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    table: jest.fn(),
    count: jest.fn(),
    countReset: jest.fn(),
    dir: jest.fn(),
    dirxml: jest.fn(),
};

beforeEach(() => {
    // Reset all mocks
    Object.values(mockConsole).forEach(mock => mock.mockClear());

    // Mock console methods
    Object.keys(mockConsole).forEach(method => {
        jest.spyOn(console, method as any).mockImplementation(mockConsole[method as keyof typeof mockConsole]);
    });

    // Reset to default config
    configure({ environment: 'development', timestamps: true });
});

describe('Print Package Tests', () => {
    describe('Basic Logging Methods', () => {
        test('log() should call console.log', () => {
            log('test message');
            expect(mockConsole.log).toHaveBeenCalled();
        });

        test('success() should call console.log with SUCCESS', () => {
            success('test message');
            expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining('SUCCESS'), expect.any(String));
        });

        test('error() should call console.error with ERROR', () => {
            error('test message');
            expect(mockConsole.error).toHaveBeenCalledWith(expect.stringContaining('ERROR'), expect.any(String));
        });

        test('info() should call console.info with INFO', () => {
            info('test message');
            expect(mockConsole.info).toHaveBeenCalledWith(expect.stringContaining('INFO'), expect.any(String));
        });

        test('warn() should call console.warn with WARN', () => {
            warn('test message');
            expect(mockConsole.warn).toHaveBeenCalledWith(expect.stringContaining('WARN'), expect.any(String));
        });

        test('debug() should call console.debug with DEBUG in development', () => {
            debug('test message');
            expect(mockConsole.debug).toHaveBeenCalledWith(expect.stringContaining('DEBUG'), expect.any(String));
        });

        test('debug() should not call console.debug in production', () => {
            configure({ environment: 'production' });
            debug('test message');
            expect(mockConsole.debug).not.toHaveBeenCalled();
        });
    });

    describe('Timestamps Configuration', () => {
        test('should include timestamps when enabled', () => {
            configure({ timestamps: true });
            log('test message');
            expect(mockConsole.log).toHaveBeenCalledWith(expect.stringMatching(/^\[.*\]/));
        });

        test('should not include timestamps when disabled', () => {
            configure({ timestamps: false });
            log('test message');
            expect(mockConsole.log).toHaveBeenCalledWith(expect.not.stringMatching(/^\[.*\]/));
        });
    });

    describe('Data Formatting Methods', () => {
        test('table() should call console.table', () => {
            const data = [{ name: 'John', age: 30 }];

            table(data);
            expect(mockConsole.table).toHaveBeenCalledWith(data);
        });

        test('count() should call console.count', () => {
            count('test-counter');
            expect(mockConsole.count).toHaveBeenCalledWith('test-counter');
        });

        test('countReset() should call console.countReset', () => {
            countReset('test-counter');
            expect(mockConsole.countReset).toHaveBeenCalledWith('test-counter');
        });

        test('dir() should call console.dir', () => {
            const obj = { test: 'object' };

            dir(obj);
            expect(mockConsole.dir).toHaveBeenCalledWith(obj);
        });

        test('dirxml() should call console.dirxml', () => {
            const element = '<div>test</div>';

            dirxml(element);
            expect(mockConsole.dirxml).toHaveBeenCalledWith(element);
        });
    });

    describe('Timer Functionality', () => {
        test('startTimer() should store timer', () => {
            startTimer('test-timer');
            endTimer('test-timer');

            expect(mockConsole.info).toHaveBeenCalledWith(expect.stringContaining('Timer "test-timer" completed'), expect.any(String));
        });

        test('endTimer() should log completion time', () => {
            startTimer('test-timer');
            endTimer('test-timer');

            expect(mockConsole.info).toHaveBeenCalledWith(expect.stringContaining('Timer "test-timer" completed'), expect.any(String));
        });

        test('endTimer() should warn if timer not started', () => {
            endTimer('non-existent-timer');
            expect(mockConsole.warn).toHaveBeenCalledWith(expect.stringContaining('Timer "non-existent-timer" not started'));
        });
    });

    describe('Configuration', () => {
        test('configure() should update environment setting', () => {
            configure({ environment: 'production' });
            debug('test message');
            expect(mockConsole.debug).not.toHaveBeenCalled();
        });

        test('configure() should update timestamp setting', () => {
            configure({ timestamps: false });
            log('test message');
            expect(mockConsole.log).toHaveBeenCalledWith(expect.not.stringMatching(/^\[.*\]/));
        });

        test('configure() should support partial updates', () => {
            configure({ timestamps: false });
            configure({ environment: 'production' });

            // Should still have timestamps disabled
            log('test message');
            expect(mockConsole.log).toHaveBeenCalledWith(expect.not.stringMatching(/^\[.*\]/));

            // Should have environment set to production
            debug('test message');
            expect(mockConsole.debug).not.toHaveBeenCalled();
        });
    });

    describe('Data Type Formatting', () => {
        test('should format strings correctly', () => {
            log('simple string');
            expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining('simple string'));
        });

        test('should format objects as JSON', () => {
            const obj = { name: 'John', age: 30 };

            log(obj);
            expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining('"name": "John"'));
        });

        test('should format arrays with length', () => {
            const arr = [1, 2, 3];

            log(arr);
            expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining('Array(3)'));
        });

        test('should format errors with message and stack', () => {
            const err = new Error('test error');

            log(err);
            expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining('test error'));
            expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining('Stack:'));
        });
    });
});
