import {Router} from 'express';
import SearchNaverMap from "./controller/search.controller.js";

const router = new Router();

router.post("/register", async (req, res) => {
    try {
        const { city, keyword } = req.body;
        const crawler = await new SearchNaverMap().init();
        crawler.setEvent(city);
        await crawler.search(keyword);

        res.status(200).json({ success: true, message: "크롤링 완료" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})

export default router;