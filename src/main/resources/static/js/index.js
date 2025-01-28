"use strict";
const rootURL = 'https://www.wmullyu.co.kr';

window.addEventListener('scroll', () => {
    let scroll_y = window.scrollY; // 또는 window.pageYOffset
	if(scroll_y > 20){
		scrollHeader(scroll_y);
	}else{
		zeroScrollHeader();
	}
});

const scrollHeader = (scroll_y) => {
	const header = document.querySelector('header');
	const main = document.querySelector('main');
	main.classList.add('scroll-main');
	header.classList.add('scroll-header');
	header.style.top = `${scroll_y}px`;
}
const zeroScrollHeader = () => {
	const header = document.querySelector('header');
	const main = document.querySelector('main');
	header.classList.remove('scroll-header');
	main.classList.remove('scroll-main');
}

// 요소의 크기를 가져오는 함수
const getSize = (element) => {
    const { width, height } = element.getBoundingClientRect();
    return { width, height };
};

// 요소들의 너비를 지정하는 함수
const setElementWidths = (elements, width) => {
    elements.forEach((element) => {
        element.style.width = `${width}px`;
    });
};

// 특정 요소의 너비를 기반으로 여러 다른 요소들의 너비를 설정하는 함수
const lineDecoration = (sourceElement, targetSelector) => {
    const { width } = getSize(sourceElement); // sourceElement 크기 가져오기
    const targetElements = document.querySelectorAll(targetSelector);
    setElementWidths(targetElements, width);
};

// 배너 내부 섹션의 너비를 균등하게 설정하는 함수
const bannerCenter = (sourceSelector, targetSelector) => {
    const { width } = getSize(document.querySelector(sourceSelector));
    const targetElements = document.querySelectorAll(targetSelector);
    const elementCount = targetElements.length;

    // 각 섹션의 너비 계산 (여백 포함)
    const elementWidth = Math.ceil(width / elementCount) - 20;

    // 계산된 너비를 적용
    setElementWidths(targetElements, elementWidth);
};

// 실행 코드: main-banner-top을 기준으로 다양한 요소들의 크기를 설정
const mainBannerTop = document.querySelector('.main-banner-top');

// 각 그룹에 대해 lineDecoration 실행
[
    '.line-decoration .in-line',
    '.line-decoration .out-line',
    '.main-info-top',
    '.new-goods',
    '.category-random-goods',
    '.banner-center'
].forEach((selector) => lineDecoration(mainBannerTop, selector));

// 배너 내부 섹션에 대해 bannerCenter 실행
bannerCenter('.main-banner-top', '.banner-center > section');


const getItems = async (url, element) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
		let html = '';
		let itemName = '';
        data.forEach(item => {
			if(item.itemName.length > 15){
				itemName = item.itemName.substring(0, 15)+'...';
			}else{
				itemName = item.itemName;
			}
			html += `
				<section class="item">
					<section data-code="${item.code}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${item.itemName}" class="representative-image">
						<img src="${rootURL}/images/1000/${item.manufacturingCompanyName.toLowerCase()}_${item.code}.jpg">
						<article class="in-logo">
							<img src="/images/source/in_logo.png">
						</article>
					</section>
					<section>
						<article>
							${itemName}
						</article>
						<article>
							<span>${getCurrentMony(item.itemRetailPrice)}</span><span><i class="bi bi-caret-right-fill"></i></span><span class="purchase-price">${getCurrentMony(item.itemPurchasePrice)}</span><span>${getDiscountRate(item.itemRetailPrice, item.itemPurchasePrice)}%</span><span><i class="bi bi-caret-down"></i></span>
						</article>
					</section>
				</section>
			`;
        });
		element.innerHTML = html;
		vanillaTiltEle(element, ".representative-image");
		const tooltipTriggerList = element.querySelectorAll('[data-bs-toggle="tooltip"]');
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    } catch (error) {
        console.error('Error fetching items:', error);
        element.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
};

// Example usage for /goods/all
/*const allGoodsElement = document.getElementById('all-goods');
getItems('/goods/all', allGoodsElement);*/

// Example usage for /goods/new
const newGoodsElement = document.querySelector('.new-goods');
getItems('/goods/new', newGoodsElement);


const getRandomCategory = async () => {
    try {
        const response = await fetch('/categories/random');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const randomCategory = await response.json();
        return randomCategory;
    } catch (error) {
        console.error('Error fetching random category:', error);
        return null;
    }
};

getRandomCategory().then((category) => {
    if (category) {
		const randomCategory = document.querySelector('.random-category');
		randomCategory.innerHTML = `
			- Category items - [<span class="kor">${category.cateName}</span>]
		`;
		const categoryRandomGoods = document.querySelector('.category-random-goods');
		getItems(`/goods/by-category?idx=${encodeURIComponent(category.idx)}`, categoryRandomGoods);
    } else {
        console.log('카테고리가 없거나 오류가 발생했습니다.');
    }
});

const vanillaTiltEle = (ele, cls) => {
	VanillaTilt.init(ele.querySelectorAll(cls), {
	    max: 25,
	    speed: 400,
		perspective: 1000,
	    glare: true,
	    "max-glare":1,
	});
}