const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

if (!process.env.BIT_API_TARGET) {
    envVarError('BIT_API_TARGET');
}

const config = [
    {
        context: [path.posix.join('/', process.env.BIT_API_PREFIX || '/api/', '/**')],
        target: process.env.BIT_API_TARGET,
        logLevel: 'error',
        secure: false,
        changeOrigin: true,
    },
];

// console.log(config)

module.exports = config;

function envVarError(name) {
    throw new Error(`Environment variable is not found ${name}`);
}