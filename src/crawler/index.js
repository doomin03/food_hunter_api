import puppeteer from "puppeteer"

const browser = await puppeteer.launch({headless: false,  defaultViewport: null,});
const page = await browser.newPage();

const context = browser.defaultBrowserContext();
await context.overridePermissions("https://map.naver.com/", []);

page.on("response", async (res)=>{
    const url = res.url();
    if(url.includes('/roadEvents/summary')){
        console.log(res);
    }
});

await page.goto("https://map.naver.com/")


