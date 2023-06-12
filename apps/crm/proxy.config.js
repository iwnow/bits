const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../../.private/.env'),
})

const config = [
    {
        context: [path.posix.join('/', process.env.BIT_API_PREFIX, '/**')],
        target: process.env.BIT_API_TARGET,
        logLevel: 'error',
        secure: false,
        changeOrigin: true,
    },
];

// console.log(config)

module.exports = config;