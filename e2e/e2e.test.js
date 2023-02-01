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
      headless: false,
      slowMo: 5,
      devtools: true, 
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should widget render', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.widget-container');
  });

  test('should valid class add', async () => {
    await page.goto(baseUrl);

    const input = await page.$('.form-control');
    const submit = await page.$('#submitform');

    await input.type('4024007111746516');
    await submit.click();

    await page.waitForSelector('.form-control_valid');
  });

  test('should tooltip render and unvalid class add', async () => {
    await page.goto(baseUrl);

    const input = await page.$('.form-control');
    const submit = await page.$('#submitform');

    await input.type('402400711174651');
    await submit.click();

    await page.waitForSelector('.form-control_unvalid');
  });


  // luhn check 

  test('should tooltip render and unvalid class add', async () => {
    await page.goto(baseUrl);

    const input = await page.$('.form-control');
    const submit = await page.$('#submitform');
    const tooltip = await page.$('.tooltip-inner');

    await input.type('4024007111746515');
    await submit.click();

    await page.waitForSelector('.form-control_unvalid');
    expect(await tooltip.evaluate(node => node.innerText)).toBe('Ошибка: Проверьте корректность данных');
  });
});