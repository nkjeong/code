"use strict";

const setGransenInfo = async (url, cls) => {
	const getEle = document.querySelector('.'+cls);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        let html;
        if(cls == 'since'){
			html = `
	        	2023 - ${data.year}
	        `;
		}else if(cls == 'setTodate'){
			html = `
	        	${data.year} / ${data.month} / ${data.date} / ${data.toDay}
	        `;
		}
        getEle.innerHTML = html;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}
//if(window.location.pathname === '/') {
	setGransenInfo('/calendar', 'since');
	setGransenInfo('/calendar', 'setTodate');
//}