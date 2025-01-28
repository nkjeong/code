"use strict";

const getCategory = (url) => {
	// API 호출
	fetch(url) // Spring Boot 서버가 실행 중이어야 함
	  .then(response => {
	    if (!response.ok) {
	      throw new Error('HTTP error ' + response.status);
	    }
	    return response.json();
	  })
	  .then(data => {
	    const categoryList = document.querySelector('header section.nav');
		let html = `
			<article class="home" onclick="location.href='/'">
				<span class="btn-str eng">HOME</span>
			</article>
			<article class="language" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
				<span class="btn-str eng">language</span>
			</article>
		`;
	    data.forEach(category => {
			html += `
				<article class="nav-btn">
					<span class="btn-str">${category.cateName}</span>
					<span class="arrow-down">
						<i class="bi bi-caret-down-fill"></i>
					</span>
					<article class="sub-menu">
					</article>
				</article>
			`;
	    });
		categoryList.innerHTML = html;
	  })
	  .catch(error => {
	    console.error('Error fetching categories:', error);
	  });
}

getCategory('http://localhost:8080/categories');