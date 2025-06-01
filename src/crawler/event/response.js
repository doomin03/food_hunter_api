class Response {
    /**
     * @param {Object} option - { struct: 'a.b.c', key: { title: 'x.y' } }
     */
    constructor( option) {
        this.option = option;
    }

    /**
     * 응답의 URL이 일치하면 파싱 시도
     * @param {Object} response - Puppeteer Response 객체
     * @returns {Promise<array|null>}
     */
    async parseIfMatch(response) {
        const responseUrl = response.url();
        if (this.option?.url && responseUrl.includes(this.option.url)) {
            return await this.parseResponseData(response);
        }
        return null;
    }

    /**
     * JSON 응답 파싱 후 struct/keys 기반으로 데이터 추출
     * @param {Object} response
     * @returns {Promise<Array<Object>>}
     */
    async parseResponseData(response) {
        const jsonData = await response.json();
        const parsedList = this.extractStruct(jsonData);

        if (!Array.isArray(parsedList)) {
            throw new Error("struct 경로 결과가 배열이 아닙니다.");
        }

        const items = [];
        parsedList.forEach(item => {
            items.push(this.extractKeys(item));
        });

        return items;
    }

    /**
     * struct 옵션 경로 따라 데이터 추출
     * @param {Object} json
     * @returns {*}
     */
    extractStruct(json) {
        if (!this.option?.struct) {
            throw new Error("[Response] struct 옵션이 필요합니다.");
        }
        return this.resolvePath(this.option.struct, json);
    }

    /**
     * key 옵션에 정의된 경로대로 데이터 뽑아서 새 객체 생성
     * @param {Object} data
     * @returns {Object}
     */
    extractKeys(data) {
        if (!this.option?.key) {
            throw new Error("[Response] key 옵션이 필요합니다.");
        }

        let result = {};
        Object.keys(this.option.key).forEach(keyName => {
            result[keyName] = this.resolvePath(this.option.key[keyName], data);
        });

        return result;
    }

    /**
     * 'a.b.c' 같은 경로 문자열을 따라가며 값 추출
     * @param {string} path
     * @param {Object} source
     * @returns {*}
     */
    resolvePath(path, source) {
        return path.split('.').reduce((acc, key) => acc?.[key], source);
    }
}

export default Response;