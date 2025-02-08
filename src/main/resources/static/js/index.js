"use strict";
const rootURL = 'https://www.wmullyu.co.kr';

const authority = document.querySelector('.authority');
const member = document.querySelector('.member');
let admin = '';
let mem = '';
if(authority){
	if(authority.value === 'A'){
		admin = 'Y';
	}else{
		admin = 'N';
	}
}else{
	admin = 'N';
}

if(member){
	if(member.value !== ''){
		mem = 'Y';
	}else{
		mem = 'N';
	}
}else{
	mem = 'N';
}

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
	if(element){
		const { width, height } = element.getBoundingClientRect();
		return { width, height };
	}
};

// 요소들의 너비를 지정하는 함수
const setElementWidths = (elements, width) => {
    elements.forEach((element) => {
        element.style.width = `${width}px`;
    });
};

// 특정 요소의 너비를 기반으로 여러 다른 요소들의 너비를 설정하는 함수
const lineDecoration = (sourceElement, targetSelector) => {
	if(sourceElement && targetSelector){
		const { width } = getSize(sourceElement); // sourceElement 크기 가져오기
		const targetElements = document.querySelectorAll(targetSelector);
		setElementWidths(targetElements, width);
	}
};

// 배너 내부 섹션의 너비를 균등하게 설정하는 함수
const bannerCenter = (sourceSelector, targetSelector) => {
	if(sourceSelector && targetSelector){
		if(document.querySelector(sourceSelector)){
			const { width } = getSize(document.querySelector(sourceSelector));
			const targetElements = document.querySelectorAll(targetSelector);
			const elementCount = targetElements.length;

			// 각 섹션의 너비 계산 (여백 포함)
			const elementWidth = Math.ceil(width / elementCount) - 20;

			// 계산된 너비를 적용
			setElementWidths(targetElements, elementWidth);
		}
	}
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
    '.banner-center',
	'.category-goods',
	'.all-items-wrapper',
	'.brand-items-wrapper',
	'.all-items-page.pagination-wrapper'
].forEach((selector) => lineDecoration(mainBannerTop, selector));

// 배너 내부 섹션에 대해 bannerCenter 실행
bannerCenter('.main-banner-top', '.banner-center > section');


const getItems = async (url, element, search) => {
    try {
		if(element){
			const response = await fetch(url);
			if (!response.ok) {
			    throw new Error(`HTTP error! status: ${response.status}`);
			}
			let data = await response.json();
			if(url.indexOf('/goods/all') != -1){
				const paginationElement = document.querySelectorAll(".pagination-wrapper");
				let currentPage = 1;
				data = data.items;
				const total = data.totalPages; // 전체 페이지 수
				const pageBlock = 10; // 플럭당 페이지 수
				const totalBlock = Math.ceil(total/pageBlock)// 전체 블럭
				paginationElement.forEach((ele) => {
					let html = `
					<span class="pageBtn"><i class="bi bi-chevron-double-left"></i></span>
					`;
					for (let i = 1; i <= 10/*total*/; i++) {
						html += `
							<span class="pageBtn" data-page="${i}">${i}</span>
						`;
					}
					html += `
						<span class="pageBtn"><i class="bi bi-chevron-double-right"></i></span>
					`;
					ele.innerHTML = html;
					const pageBtns = ele.querySelectorAll('span.pageBtn');
					pageBtns.forEach((btns)=>{
						btns.addEventListener('click', (btn) => {
							getItems(`/goods/all?page=${btn.currentTarget.dataset.page}`, element);
						});
					});
				});
			}
			
			let html = '';
			let itemName = '';
			let showPrice = '';
			data.forEach(item => {
				let itemString = JSON.stringify(item).replace(/"/g, '&quot;');
				if(item.itemName.length > 15){
					itemName = item.itemName.substring(0, 15)+'...';
				}else{
					itemName = item.itemName;
				}
				if(mem === 'Y'){
					showPrice = `
					<span><i class="bi bi-caret-right-fill"></i></span>
					<span class="purchase-price">${getCurrentMony(item.itemPurchasePrice)}</span>
					<span>${getDiscountRate(item.itemRetailPrice, item.itemPurchasePrice)}%</span>
					<span><i class="bi bi-caret-down"></i></span>
					`;
				}
				let monyStyle = '';
				if(mem === 'N'){
					monyStyle = 'text-decoration:none; font-size:1.1rem;';
				}
				html += `
					<section class="item">
						<section data-code="${item.code}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${item.itemName}" class="representative-image">
							<img class="rep-image" data-iteminfo="${itemString}" data-src="${rootURL}/images/1000/${item.manufacturingCompanyName.toLowerCase()}_${item.code}.jpg" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
							<article class="in-logo">
								<img src="/images/source/in_logo.png">
							</article>
						</section>
						<section>
							<article>
								${itemName}
							</article>
							<article class="eng">
								<span style="${monyStyle}">${getCurrentMony(item.itemRetailPrice)}</span>
								${showPrice}
							</article>
						</section>
					</section>
				`;
			});
			element.innerHTML = html;
			showImg(element);
			vanillaTiltEle(element, ".representative-image");
			const tooltipTriggerList = element.querySelectorAll('[data-bs-toggle="tooltip"]');
			const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
		}
    } catch (error) {
        console.error('Error fetching items:', error);
        element.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
};


const showImg = (ele) => {
	const images = ele.querySelectorAll('.rep-image');
			    const lazyLoad = (entries, observer) => {
			        entries.forEach(entry => {
			            if (entry.isIntersecting) {
			                const img = entry.target;
			                img.src = img.dataset.src; // data-src 속성의 값을 src로 설정
			                img.classList.add('loaded'); // 로드 완료된 이미지에 클래스 추가
			                observer.unobserve(img); // 더 이상 관찰하지 않음
			            }
			        });
			    };
			    const observer = new IntersectionObserver(lazyLoad, {
			        root: null, // 뷰포트를 기준으로 관찰
			        rootMargin: "0px",
			        threshold: 0.5 // 10%만 보여도 로드 시작
			    });
			    images.forEach(image => {
			        observer.observe(image); // 모든 이미지 관찰 시작
			    });
}

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
		if(randomCategory){
			randomCategory.innerHTML = `
				- Category items - [<span class="kor">${category.cateName}</span>]
			`;
		}
		const categoryRandomGoods = document.querySelector('.category-random-goods');
		if(categoryRandomGoods){
			getItems(`/goods/by-category?idx=${encodeURIComponent(category.idx)}`, categoryRandomGoods);
		}
    } else {
        console.log('카테고리가 없거나 오류가 발생했습니다.');
    }
});

const search = () =>{
	const searchInput = document.querySelector(".keyword");
	const searchItemsWrapper = document.querySelector('.search-items-wrapper');
	const closeBtn = document.querySelector('.search-items-wrapper .btn-close.btn-close-white');
	const searchTitle = document.querySelector('.search-items-wrapper-close article.search-title');
	const searchItemsListWrapper = document.querySelector('.search-items-list-wrapper');
	let searchTimeout = null;
	
	closeBtn.addEventListener('click', ()=>{
		searchItemsWrapper.style.display = 'none';
	});
	
	searchInput.addEventListener('focus', () => {
		searchItemsWrapper.style.display = 'flex';
		if(window.scrollY > 0){
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setTimeout(() => {
			    window.scrollTo({ top: 0, behavior: 'smooth' });
			}, 10);
		}
	});
	
	searchInput.addEventListener('keyup', (event) => {
		let keyword = event.currentTarget.value;
		renderSearchResults(keyword, searchItemsListWrapper, searchTimeout, searchTitle);
	});
}

search();

const renderSearchResults = (text, ele, searchTimeout, searchTitle) => {
	clearTimeout(searchTimeout); // ✅ 빠른 입력 방지 (Debounce 적용)
    searchTimeout = setTimeout(async () => {
        const keyword = text.trim();
        if (keyword.length < 2) {
            ele.innerHTML = ""; // ✅ 최소 2글자 입력 후 검색
            return;
        }

        try {
            const response = await fetch(`/search?keyword=${encodeURIComponent(keyword)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const items = await response.json();
			searchResults(ele, items, searchTitle, keyword);
        } catch (error) {
            console.error("Error fetching search results:", error);
            ele.innerHTML = `<p class="error">검색 중 오류 발생</p>`;
        }
    }, 300);
}

const searchResults = (ele, items, searchTitle, keyword) => {
	searchTitle.innerText = `검색어 : ${keyword} [${items.length}개]`;
	let html = '';
	
	items.forEach((list)=>{
		let optionColor = '';
		if(list.option === 'Y'){
			optionColor = ' color:var(--base-color-red-a); font-weight:700;';
		}else{
			optionColor = '';
		}
		html += `
			<section class="search-item">
				<article class="item-img">
					<img src="${rootURL}/images/1000/${list.manufacturingCompanyName.toLowerCase()}_${list.code}.jpg">
				</article>
				<article>
					${list.code}
				</article>
				<article class="item-name">
					${list.itemName}
				</article>
				<article>
					${list.itemUnit}
				</article>
				<article>
					${list.itemNumber}
				</article>
				<article>
					${list.itemStandard}
				</article>
				<article>
					${list.itemOrigin}
				</article>
				<article class="option" style="position:relative; width:30px;${optionColor}" data-isoption="${list.option}" data-code="${list.code}" data-manufacturingcompanycode="${list.manufacturingCompanyCode}">
					<div>${list.option}</div>
				</article>
				<article style="justify-content:flex-end;">
					${getCurrentMony(list.itemRetailPrice)}
				</article>
				<article style="justify-content:flex-end;">
					${getCurrentMony(list.itemPurchasePrice)}
				</article>
			</section>
		`;
	});
	ele.innerHTML = html;
	const setOption = ele.querySelectorAll('article[data-isoption="Y"]');
	setOptions(setOption);
}

const setOptions = (ele) => {
	ele.forEach((y)=>{
		let isPption = y.dataset.isoption;
		let code = y.dataset.code;
		let manufacturingCompanyCode = y.dataset.manufacturingcompanycode;
		getOption(isPption, code, manufacturingCompanyCode).then((d)=>{
			y.innerHTML = `
				<div>${isPption}</div>
				<div class="option-value">
					<div>${d[0].name}</div>
					<div>:</div>
					<div>${d[0].optionValue}</div>
				</div>
			`;
		});
	});
}

const getOption = async (isPption, code, manufacturingcompanyCode) => {
	if(isPption === 'Y'){
		try {
		    const url = `/options?code=${encodeURIComponent(code)}&manufacturingcompanyCode=${encodeURIComponent(manufacturingcompanyCode)}`;
		    const response = await fetch(url);

		    if (!response.ok) {
		        throw new Error(`HTTP error! status: ${response.status}`);
		    }

		    const options = await response.json();
			return options;
		} catch (error) {
		    console.error("Error fetching item options:", error);
		}
	}else{
		return 'N';
	}
}

const vanillaTiltEle = (ele, cls) => {
	VanillaTilt.init(ele.querySelectorAll(cls), {
	    max: 25,
	    speed: 400,
		perspective: 1000,
	    glare: true,
	    "max-glare":1,
	});
}

//상세설명 offcanvas
const setOffcanvas = () => {
	const offcanvasElement = document.getElementById("offcanvasRight");

	offcanvasElement.addEventListener("shown.bs.offcanvas", (event) => {
		const offcanvas = event.currentTarget;
	    const getItem = event.relatedTarget;
		const itemInfo = getItem.dataset.iteminfo.replace(/&quot;/g, '"');
		const item = JSON.parse(itemInfo);
		const offcanvasHeader = offcanvas.querySelector('.offcanvas-header');
		const itemRepresentative = offcanvas.querySelector('.item-representative');
		const offcanvasBody = offcanvas.querySelector('.offcanvas-body');
		
		let optionColor = '';
		if(item.option === 'Y'){
			optionColor = ' color:var(--base-color-red-a); font-weight:700;';
		}else{
			optionColor = '';
		}
		
		offcanvasHeader.innerHTML = `<b>Item Information : ${item.itemName}</b>`;
		itemRepresentative.innerHTML = `
			<section>
				<img src="${rootURL}/images/1000/${item.manufacturingCompanyName.toLowerCase()}_${item.code}.jpg">
			</section>
			<section>
				<article>
					<div>소비자가</div>
					<div>${getCurrentMony(item.itemRetailPrice)}</div>
				</article>
				<article>
					<div>공급가</div>
					<div>${getCurrentMony(item.itemPurchasePrice)}</div>
				</article>
				<article>
					<div>바코드</div>
					<div>${item.barcode}</div>
				</article>
				<article>
					<div>원산지</div>
					<div>${item.itemOrigin}</div>
				</article>
				<article>
					<div>규격</div>
					<div>${item.itemStandard}</div>
				</article>
				<article>
					<div>품번</div>
					<div>${item.itemNumber}</div>
				</article>
				<article class="option">
					<div>옵션</div>
					<div style="position:relative;${optionColor}" data-isoption="${item.option}" data-code="${item.code}" data-manufacturingcompanycode="${item.manufacturingCompanyCode}">${item.option}</div>
				</article>
				<article>
					<div>검색어</div>
					<div>${item.keyword}</div>
				</article>
			</section>
		`;
		const setOption = itemRepresentative.querySelectorAll('div[data-isoption="Y"]');
		console.log(setOption)
		setOptions(setOption);
		offcanvasBody.innerHTML = `
			<img src="${rootURL}/images/detail/${item.manufacturingCompanyName.toLowerCase()}_${item.code}.jpg">
		`;
	});
}
setOffcanvas();


const brandModalElement = document.getElementById("brandModal");
brandModalElement.addEventListener("shown.bs.modal", (event) => {
	getBrands(event.currentTarget);
});


const getBrands = async (ele) => {
    try {
		await fetch("/api/brand/list")
		    .then(response => response.json())
		    .then(data => {
				const brandLength = data.length;
				const brandTitle = ele.querySelector('.modal-title');
				const brandBody = ele.querySelector('.modal-body');
				brandTitle.innerHTML = `BRAND (${brandLength}개)`;
				let html = '';
				data.forEach((list)=>{
					html += `
						<div title="${list.nameEng}" onclick="location.href='/brand?brandCode=${list.code}'">
							${list.nameKor}
						</div>
					`;
				});
				brandBody.innerHTML = html;
			})
		    .catch(error => console.error("Error fetching data:", error));
    } catch (error) {
        console.error("Error fetching brands:", error);
    }
}