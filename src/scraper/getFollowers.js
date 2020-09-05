/*
  ------------------------
      NO FUNCIONA!!!!
  -----------------------
*/


require('dotenv').config()
const puppeteer = require('puppeteer');

const DISPLAY_WIDTH = 1280;
const DISPLAY_HEIGHT = 700;
const LOGIN_URL = 'https://www.instagram.com/accounts/login/';

const PROFILE_URL = 'https://www.instagram.com/peach_place99/';


const FOLLOWERS__BUTTON = '.k9GMp > li:nth-child(2)';

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

  // Navigate to post
  await page.goto(PROFILE_URL, { waitUntil: 'networkidle2' });


  await page.click(FOLLOWERS__BUTTON);

  await page.waitForSelector('.isgrP');

  await page.waitFor(2000)
  
  await page.mouse.move(
    DISPLAY_WIDTH / 2,
    DISPLAY_HEIGHT / 2
  );

  await page.waitFor(2000)

  await page.mouse.wheel({ deltaX: -500 })

  await page.mouse.wheel({ deltaY: -500 })



  await page.waitFor(5000)

  await browser.close();

})();