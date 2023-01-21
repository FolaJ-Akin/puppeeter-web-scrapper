import puppeteer from "puppeteer";
import fs from "fs/promises";

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://learnwebcode.github.io/practice-requests/");

  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".info strong")).map(
      (x) => x.textContent
    );
  });

  const photos = await page.$$eval("img", (imgs) => {
    console.log({ imgs });
    return imgs.map((x) => x.src);
  });

  console.log({ photos });
  for (const photo of photos) {
    const imgPage = await page.goto(photo);
    await fs.writeFile(photo.split("/").pop(), await imgPage.buffer());
  }

  //   await fs.writeFile("imgs-pract",)

  //   await fs.writeFile("names-pract.txt", names.join("\r\n"));

  // await page.screenshot({path:"pactice.jpeg",quality:1})

  await browser.close();
}

start();
