"use strict";

const adminMenu = document.querySelector('.admin-menu');
const left = document.querySelector('.admin-main .left');
document.querySelector('header .line-decoration .in-line').style.width = '1287.27px';

if(adminMenu){
	setAdminMenu(adminMenu.value);
}

function setAdminMenu(menu){
	let html = '';
	if(menu === 'item'){
		html = `
			<article class="eng">
				ITEM
			</article>
			<article class="item-menu">
				<div class="a-menu" data-menu="category">
					카테고리 관리
				</div>
				<div class="a-menu" data-menu="brand">
					제조사(브랜드) 관리
				</div>
				<div class="a-menu" data-menu="item">
					상품 관리
				</div>
			</article>
		`;
	}else if(menu === 'member'){
		html = `
			<article class="eng">
				MEMBER
			</article>
		`;
	}else if(menu === 'order'){
		html = `
			<article class="eng">
				ORDER
			</article>
		`;
	}else if(menu === 'site'){
		html = `
			<article class="eng">
				SITE
			</article>
		`;
	}
	left.innerHTML = html;
	const adminMenu = left.querySelectorAll('div.a-menu');
	if(adminMenu){
		adminMenu.forEach((btns)=>{
			btns.addEventListener('click', (btn)=>{
				const dataMenu = btn.currentTarget.dataset.menu;
				const menuName = btn.currentTarget.textContent;
				setRightContent(dataMenu, menuName);
			});
		});
	}
}

function setRightContent(dataMenu, menuName){
	const right = document.querySelector('.admin-main .right');
	let html = '';
	if(dataMenu === 'category'){
		html = setCategoryContentHTML(menuName);
	}else if(dataMenu === 'brand'){
		html = setBrandContentHTML(menuName);
	}else if(dataMenu === 'item'){
		html = setItemContentHTML(menuName);
	}
	right.innerHTML = html;
	
	if(dataMenu === 'category'){
		let html = '';
		const fCateTitle = right.querySelector('.f-cate-title');
		const categoryFirst = right.querySelector('.category_first');
		const navCategory = document.querySelectorAll('header .nav [data-mode="category"]');
		const categorySecond = right.querySelector('.category_second');
		const sCateTitle = right.querySelector('.s-cate-title');
		navCategory.forEach((cate, i)=>{
			html += `
				<article data-idx="${cate.dataset.code}" data-name="${cate.dataset.name}">
					<div class="form-check">
					  <input class="form-check-input" value="${cate.dataset.code}" type="radio" data-fname="${cate.dataset.name}" name="r-cate-f-code" id="f-flexRadioDefault1-${i}">
					  <label class="form-check-label" for="f-flexRadioDefault1-${i}">
					    ${cate.dataset.name}
					  </label>
					</div>
				</article>
			`;
		});
		categoryFirst.innerHTML = html;
		if (!categoryFirst.classList.contains('show')) {
		    categoryFirst.style.display = 'flex';
		    setTimeout(() => {
		        categoryFirst.classList.add('show');
		    }, 10);
		}
		const firstBtn = categoryFirst.querySelectorAll('article');
		
		
		firstBtn.forEach((btns) => {
		    btns.addEventListener('click', (btn) => {
		        const idx = btn.currentTarget.dataset.idx;
				const fCateName = btn.currentTarget.dataset.name;
				sCateTitle.innerHTML = `2차 카테고리 (${fCateName})  [<span class="create">추가</span>, <span class="update">수정</span>, <span class="delete">삭제</span>]`;
		        getCategorySecond(idx, 'yes').then((data) => {
		            let html = '';
					let i = 0;
		            for (const category of data) {
		                html += `
		                    <article data-idx="${category.idx}">
								<div class="form-check">
								  <input class="form-check-input" value="${category.idx}" type="radio" name="r-cate-s-code" id="s-flexRadioDefault1-${i}">
								  <label class="form-check-label" for="s-flexRadioDefault1-${i}">
								    ${category.name}
								  </label>
								</div>
		                    </article>
		                `;
						i++;
		            }
		            categorySecond.innerHTML = html;
		            categorySecond.classList.remove('show');
		            categorySecond.style.display = 'none';

		            setTimeout(() => {
		                categorySecond.style.display = 'flex';
		                void categorySecond.offsetHeight;
		                categorySecond.classList.add('show');
		            }, 50);
		        });
		    });
		});
		
		fCateCRUD(fCateTitle, categoryFirst);
	}
}

function setCategoryContentHTML(menuName){
	return `
		<section>
			<section>
				${menuName}
			</section>
			<section class="admin-content category">
				<section>
					<section class="f-cate-title">
						1차 카테고리 [<span class="create">추가</span>] [<span class="update">수정</span>] [<span class="delete">삭제</span>]
					</section>
					<section class="category_first">
					</section>
				</section>
				<section>
					<section class="s-cate-title">
						2차 카테고리
					</section>
					<section class="category_second">
					</section>
				</section>
				<section>
					<section class="t-cate-title">
						3차 카테고리
					</section>
					<section class="category_third">
					</section>
				</section>
			</section>
		</section>
	`;
}
function setBrandContentHTML(menuName){
	return `
		<section>
			<section>
				${menuName}
			</section>
			<section class="admin-content">
				<section>dfgdfgdfg</section>
				<section>dfgdfgdfg</section>
			</section>
		</section>
	`;
}
function setItemContentHTML(menuName){
	return `
		<section>
			<section>
				${menuName}
			</section>
			<section class="admin-content">
				<section>dfgdfgdfg</section>
				<section>dfgdfgdfg</section>
			</section>
		</section>
	`;
}

const fCateCRUD = (fCateTitle, categoryFirst) => {
	const getCheckRadio = categoryFirst.querySelectorAll('input[type="radio"');
	const buttons = fCateTitle.querySelectorAll('.create, .update, .delete');

	buttons.forEach(button => {
	    button.addEventListener('click', (event) => {
	        const action = event.target.classList.contains('create') ? 'create' :
	                       event.target.classList.contains('update') ? 'update' :
	                       event.target.classList.contains('delete') ? 'delete' :
	                       '알 수 없음';

	        if(action === 'create'){
				createFCate();
			}else if(action === 'update'){
				updateFCate(getCheckRadio);
			}else if(action === 'delete'){
				deleteFCate(getCheckRadio);
			}
	    });
	});
}

const updateFCate = (getCheckRadio) => {
    const checkedRadio = [...getCheckRadio].find(r => r.checked);
    if (checkedRadio) {
		let idx = checkedRadio.value;
		let newName = prompt('"'+checkedRadio.dataset.fname+'" 을 어떤 이름으로 바꾸실건가요? 바꿀 이름을 입력하세요');
		fetch(`/categories/${idx}/update`, {
		    method: "PUT",
		    headers: {
		        "Content-Type": "application/json"
		    },
		    body: JSON.stringify({ cateName: newName })
		})
		.then(response => response.json())
		.then(data => {
		    if (data.success) {
		        alert("카테고리 이름이 성공적으로 수정되었습니다.");
		    } else {
		        alert("오류: " + data.message);
		    }
		})
		.catch(error => console.error("Error:", error));
    } else {
        alert('수정 할 카테고리를 선택하세요!');
    }
};

const createFCate = () => {
	const newCategoryName = prompt('신규 1차카테고리를 입력하세요.(30자 이하로 입력하세요)');
	if (!newCategoryName || newCategoryName.trim().length === 0) {
	    alert("카테고리 이름을 입력하세요.");
	    return;
	}

	if (newCategoryName.length > 30) {
	    alert("카테고리 이름은 30자 이하여야 합니다.");
	    return;
	}

	// 2. 서버로 데이터 전송
	fetch("/categories/add", {
	    method: "POST",
	    headers: {
	        "Content-Type": "application/json"
	    },
	    body: JSON.stringify({ cateName: newCategoryName.trim() })
	})
	.then(response => response.json())
	.then(data => {
	    if (data.success) {
	        alert(`카테고리가 추가되었습니다! (idx: ${data.idx})`);
	    } else {
	        alert("오류: " + data.message);
	    }
	})
	.catch(error => console.error("Error:", error));
}

const deleteFCate = (getCheckRadio) => {
	const checkedRadio = [...getCheckRadio].find(r => r.checked);
    if (checkedRadio) {
		if(confirm(`선택하신 "${checkedRadio.dataset.fname}" 카테고리를 정말 삭제하시겠습니까? 삭제하시려면 확인을 누르고 카테고리 이름을 한번더 입력하세요!`)){
			const cateName = prompt(`"${checkedRadio.dataset.fname}" 을 다시한번 입력하세요`);
			if(cateName === checkedRadio.dataset.fname){
				
			}else{
				alert('카테고리 이름을 다시 확인하세요!')
			}
		}
		let idx = checkedRadio.value;
	} else {
	    alert('삭제 할 카테고리를 선택하세요!');
	}
}