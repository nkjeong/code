"use strict";

// 공통 API 호출 함수
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

// 1차 카테고리 가져오기
const getCategory = async (url) => {
    const data = await fetchData(url);
    if (!data) return;

    const categoryList = document.querySelector('header section.nav');
    let html = `
        <article class="home btn-str" onclick="location.href='/'">
            <span class="eng">HOME</span>
        </article>
        <article class="language btn-str" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <span class="eng">language</span>
        </article>
		<article class="all-items btn-str" onclick="location.href='/all?items=all'">
            <span class="eng">All items</span>
        </article>
		<article class="brand-items btn-str" data-bs-toggle="modal" data-bs-target="#brandModal">
		    <span class="eng">BRAND</span>
		</article>
    `;
	
	if(admin === 'Y'){
		html += `
			<article class="admin btn-str" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
	            <span class="eng">ADMINISTRATOR</span>
	        </article>
		`;
	}

    for (const category of data) {
        html += `
            <article class="nav-btn">
                <span class="btn-str" data-mode="category" data-name="${category.cateName}" data-code="${category.idx}">${category.cateName}</span>
                <span class="arrow-down">
                    <i class="bi bi-caret-down-fill"></i>
                </span>
                <article class="sub-menu" data-idx="${category.idx}">
                    ${await getCategorySecond(category.idx)}
                </article>
            </article>
        `;
    }

    categoryList.innerHTML = html;
};

// 2차 카테고리 가져오기 및 HTML 반환
const getCategorySecond = async (idx, adminPage) => {
    const url = `/categories/${idx}/second`;
    const data = await fetchData(url);
    if (!data) return '';
	if (adminPage) return data;

    let html = '<ul>';
    for (const category of data) {
        html += `
            <li data-idx="${category.idx}" onclick="location.href='/items?idx=${idx}${category.idx}'">
                <span>${category.name}</span>
				<article class="third_menu">
					${await getCategoryThird(idx, category.idx)}
				</article>
            </li>
        `;
    }
    html += '</ul>';

    return html;
};

const getCategoryThird = async (fIdx, sIdx, adminPage) => {
    const url = `/categories/third?fIdx=${fIdx}&sIdx=${sIdx}`;

    try {
        const data = await fetchData(url);

        // 서버에서 응답이 없거나 데이터가 비어 있는 경우
        if (!data || (Array.isArray(data) && data.length === 0)) {
            console.warn(`No data found for fIdx=${fIdx}, sIdx=${sIdx}`);
            return '<p>해당 조건에 맞는 데이터가 없습니다.</p>';
        }

        // 관리자 페이지에서 데이터가 필요할 경우 원본 반환
        if (adminPage) return data;

        let html = '<ul>';
        for (const category of data) {
            html += `
                <li data-fidx="${fIdx}" data-sidx="${sIdx}" data-tidx="${category.idx}">
                    <span>${category.name}</span>
                </li>
            `;
        }
        html += '</ul>';

        return html;
    } catch (error) {
        console.error("Error fetching categoryThird:", error);
        return '<p>데이터를 가져오는 중 오류가 발생했습니다.</p>';
    }
};


// 초기화
document.addEventListener('DOMContentLoaded', () => {
    getCategory('/categories');
});