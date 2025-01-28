"use strict";
const getCurrentMony = (money)=>{
	return Number(money).toLocaleString('ko-KR');
}

const getDiscountRate = (itemRetailPrice, itemPurchasePrice) => {
	let retailPrice = parseInt(itemRetailPrice);
	let purchasePrice = parseInt(itemPurchasePrice);

    const ratio = 100-((purchasePrice / retailPrice)*100);
    return ratio.toFixed(1); // 소수점 둘째 자리까지
}