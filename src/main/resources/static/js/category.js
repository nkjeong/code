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
        <article class="home" onclick="location.href='/'">
            <span class="btn-str eng">HOME</span>
        </article>
        <article class="language" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <span class="btn-str eng">language</span>
        </article>
		<article class="all-items" onclick="location.href='/all?items=all'">
            <span class="btn-str eng">All items</span>
        </article>
    `;

    for (const category of data) {
        html += `
            <article class="nav-btn">
                <span class="btn-str">${category.cateName}</span>
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
const getCategorySecond = async (idx) => {
    const url = `http://localhost:8080/categories/${idx}/second`;
    const data = await fetchData(url);
    if (!data) return '';

    let html = '<ul>';
    for (const category of data) {
        html += `
            <li data-idx="${category.idx}" onclick="location.href='/items?idx=${idx}${category.idx}'">
                ${category.name}
            </li>
        `;
    }
    html += '</ul>';

    return html;
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    getCategory('http://localhost:8080/categories');
});