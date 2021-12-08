import { PlaywrightTestConfig } from '@playwright/test';

const config : PlaywrightTestConfig ={
    reporter:[['html']],
    retries: 1,
    use: {
        headless: false,
        trace: 'on',
        video: 'on'
    },
};

module.exports = config;
