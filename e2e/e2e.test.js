import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 50,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should valid class add', async () => {
    await page.goto(baseUrl);

    const input = await page.$('.form-control');
    const submit = await page.$('#submitform');

    await input.type('4024007111746516');
    await submit.click();

    await page.waitForSelector('.form-control_valid');
    await page.waitForSelector('.succses-img', { hidden: false });
  });

  test('should tooltip render and unvalid class add', async () => {
    await page.goto(baseUrl);

    const input = await page.$('.form-control');
    const submit = await page.$('#submitform');

    await input.type('40240071117465167');
    await submit.click();

    await page.waitForSelector('.form-control_unvalid');
    await page.waitForSelector('.tooltip', { hidden: false });
  });
});
