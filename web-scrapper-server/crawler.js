// import puppeteer from "puppeteer";
const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function crawlerFunc(url,filename,bool) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${url}`);
  await page.screenshot({path:`${filename}`, fullPage:bool})
  await browser.close()
  
}

;

module.exports = {crawlerFunc}