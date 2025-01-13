import winston from 'winston';
import path from 'path';
import moment from 'moment-timezone';

const currentDir = __dirname;

const srcDir = path.resolve(currentDir, '..');

const loggingDir = path.resolve(srcDir, 'logging');

// Function to format log entries with timestamp and timezone
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`
});

// Set desired timezone
const timezone = 'Asia/Kolkata';

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format: () => moment().tz(timezone).format() }),
        customFormat
    ), 
    transports: [
        new winston.transports.Console({ level: "debug" }),
        new winston.transports.File({
            filename: path.join(loggingDir, 'test_run.log'),
            maxFiles: 5,
            maxsize: 10 * 1024,
            level: "info",
        }),
        new winston.transports.File({
            filename: path.join(loggingDir, 'test_error.log'),
            maxFiles: 5,
            maxsize: 10 * 1024,
            level: "error",
        }),
    ],
});

export default logger;