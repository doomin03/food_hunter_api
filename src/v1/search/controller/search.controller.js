import Response from "../../../crawler/event/response.js";
import puppeteer from "puppeteer"

class SearchNaverMap{
    constructor(){
        this.browser = null;
        this.page = null;
    }

    async init(){
        this.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });

        this.page = await this.browser.newPage();

        const context = this.browser.defaultBrowserContext();
        await context.overridePermissions("https://map.naver.com/", []);

        return this;
    }

    setEvent(){
        this.page.on("response", async (res) => {
            let event = new Response({
                url: '/api/search/allSearch',
                struct: 'result.place.list',
                key: {
                    name : 'name',
                    x : 'x',
                    y : 'y'
                }
            });
            event.parseIfMatch(res).then(data => {
                if(data){
                    console.log(data);
                }
            });
        })

        return this;
    }

    async search(keyword){
        await this.page.goto("https://map.naver.com/");
        await this.page.waitForSelector('input[class = input_search]');

        await this.page.type('input[class = input_search]', '서현 초밥');
        await this.page.keyboard.press('Enter');
    }
}

(async () => {
    const crawler = await new SearchNaverMap().init();
    crawler.setEvent();
    await crawler.search("서현 초밥");
})();
