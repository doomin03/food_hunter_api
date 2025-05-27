
class AllSearch {
    data = [];

    constructor(url){
        this.url = url;
    }

    async setList(res){
        let response = await res.json();
        const searchResult = response.result.place.list;
        if(searchResult.length > 0){
            this.data = searchResult;
        }
        return this;
    }


    getSearchResponse(){

        return this.data;
    }
}