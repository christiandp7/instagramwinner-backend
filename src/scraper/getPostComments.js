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

//const POST_URL = 'https://www.instagram.com/p/CEg1LwLAmUm/'; //pruebas
const POST_URL = 'https://www.instagram.com/p/CEifPHgF0qe/';


const LOAD_MORE_COMMENTS__BUTTON = '.dCJp8';

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
  await page.goto(POST_URL, { waitUntil: 'networkidle2' });


  while (true) {
    let buttonExist = await page.$(LOAD_MORE_COMMENTS__BUTTON);
    if (buttonExist) {
      await page.click(LOAD_MORE_COMMENTS__BUTTON);
      await console.log('loading comments...')
      await page.waitFor(5000)
    }
    else {
      await console.log('comments loaded successfully!')
      break;
    }
    
  }


  let allComments = await page.$$('.Mr508');
  await console.log("total comments: " + allComments.length)

  /*await page.evaluate(() => {
    allComments = document.querySelectorAll('.Mr508');
    return console.log("total comments: " + allComments.length)
  })*/

  /*await page.on('response', e => {
    console.log(e.request().url())
  })*/



  
  /*await page.waitForSelector(LOAD_MORE_COMMENTS__BUTTON);
  await page.click(LOAD_MORE_COMMENTS__BUTTON);
  await console.log('First click')
  
  await page.waitForSelector(LOAD_MORE_COMMENTS__BUTTON, {
    visible: true,
  })
  await page.click(LOAD_MORE_COMMENTS__BUTTON);
  await console.log('second click')*/


  

  /*await page.waitForSelector(LOAD_MORE_COMMENTS__BUTTON, {
    timeout: 5000
  });
  await page.click(LOAD_MORE_COMMENTS__BUTTON);
  await console.log('vuelta nro: ' + iterations);
  //await iterations++;


  let iterations = 1;

  while(true) {
    
    if(buttonExist) {
      await console.log("existeee")
    } else {
      await console.log("NOOO existe")
    }

    
  }

  /*let comments = await page.$$('.Mr508')
  await console.log(comments.length)*/

  //await page.waitForSelector('.By4nA', { hidden: true }); // esperar a que el loader se esconda


  await page.waitFor(50000)

  await browser.close();

})();