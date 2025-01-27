"use strict";

const getSize = (element) => {
	let sizeH = element.getBoundingClientRect();
	let sizeW = element.getBoundingClientRect();
	return {"width":sizeW.width, "height":sizeH.height};
}

const lineDecoration = (element, setElement) => {
	let lineSize = getSize(element);
	setElement.forEach((ele) => {
		ele.style.width = `${lineSize.width}px`;
	});
}

lineDecoration(document.querySelector('.main-banner-top'), document.querySelectorAll('.line-decoration .in-line'));
lineDecoration(document.querySelector('.main-banner-top'), document.querySelectorAll('.line-decoration .out-line'));