require('dotenv').config()
const puppeteer = require('puppeteer');

const DISPLAY_WIDTH = 1280;
const DISPLAY_HEIGHT = 768;
const LOGIN_URL = 'https://www.instagram.com/accounts/login/';
const POST_URL = 'https://www.instagram.com/p/CEifPHgF0qe/';

const comment = 'Belozo soy 😍'

const credentials = {
  username: process.env.USERNAME_CHRISTIAN,
  password: process.env.PASSWORD_CHRISTIAN
};


(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `-window-size=${DISPLAY_WIDTH},${DISPLAY_HEIGHT}`
    ]
  });
  const page = await browser.newPage();
  page.setViewport({width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT})

  // Hacer Login
  await page.goto(LOGIN_URL);
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', credentials.username);
  await page.type('input[name="password"]', credentials.password);
  await page.click('button[type="submit"]');

  // Waiting for page to refresh
  await page.waitForNavigation();

  // Navigate to post and submitting the comment
  await page.goto('https://www.instagram.com/p/CDPlLXxAax-/');
  await page.waitForSelector('textarea');
  await page.type('textarea', comment);
  //await page.click('button[type="submit"]');

  await page.waitFor(4000)

  await browser.close();
})();