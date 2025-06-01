import puppeteer from "puppeteer"

export default (async () => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null,});
    const page = await browser.newPage();

    const context = browser.defaultBrowserContext();
    await context.overridePermissions("https://map.naver.com/", []);

    const point = []

    page.on("response", async (res) => {
        const url = res.url();
        if (url.includes('/api/search/allSearch')) {
            const data = await res.json();
            data.result.place.list.forEach((item) => {
                console.log(item.name);
                console.log(item.x);
                console.log(item.y);
            })
        }
    });


    await page.goto("https://map.naver.com/");
    await page.waitForSelector('input[class = input_search]');


    const _searchInput = await page.$('input[class = input_search]');


    await page.type('input[class = input_search]', '서현 초밥');
    await page.keyboard.press('Enter');
})();



