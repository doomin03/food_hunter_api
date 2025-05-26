import puppeteer from "puppeteer"

const browser = await puppeteer.launch({headless: false,  defaultViewport: null,});
const page = await browser.newPage();

const context = browser.defaultBrowserContext();
await context.overridePermissions("https://map.naver.com/", []);

const point = []

page.on("response", async (res)=>{
    const url = res.url();
    if(url.includes('/api/search/allSearch')){
        const data = await res.json();
        data.result.place.list.forEach((item)=>{
            console.log(item.name);
            console.log(item.x);
            console.log(item.y);
            console.log("__________")
        })
    }
});


await page.goto("https://map.naver.com/")


