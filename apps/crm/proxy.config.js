const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

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