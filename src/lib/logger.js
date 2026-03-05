/**
 * Production-safe logger utility.
 * Logs errors only in development mode to avoid exposing
 * sensitive information to users in production (CWE-209).
 */

const isDev = import.meta.env.DEV;

const logger = {
    error: (...args) => {
        if (isDev) {
            console.error(...args);
        }
    },
    warn: (...args) => {
        if (isDev) {
            console.warn(...args);
        }
    },
    info: (...args) => {
        if (isDev) {
            console.info(...args);
        }
    },
};

export default logger;
