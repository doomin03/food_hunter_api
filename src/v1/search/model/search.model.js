import { db } from "../../../firebase/firebase.js";

/**
 * 맛집 정보를 Firestore에 추가
 * @param {String} city - 저장할 데이터의 지역
 * @param {string} id - 문서 ID (예: place 고유 ID)
 * @param {Object} data - 저장할 데이터 (예: { name, address, tel, ... })
 * @returns {Promise<boolean>} - 성공 여부 반환
 */
async function addPlace(city, id, data){
    try {
        await db.collection(city).doc(id).set(data);
        return true;
    } catch (err) {
        console.error("[addPlace] 저장 실패:", err.message);
        return false;
    }
}

export default addPlace