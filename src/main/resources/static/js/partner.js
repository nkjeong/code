"use strict";
const setPartner = (title) => {
	document.querySelector('.main-info-top').style.display = 'none';
	document.querySelector('.main-banner-top').style.display = 'none';
	document.querySelector('.line-decoration.main-line-decoration').style.display = 'none';
	const pageTitle = document.querySelector('.line-block-title.eng');
	const partnerContent = document.querySelector('.partner-content');
	let html = '';
	if(title === 'site'){
		pageTitle.innerText = '- Web Site -';
		html = site();
	}else if(title === 'shopping-mall'){
		pageTitle.innerText = '- Shopping Mall -';
		html = shoppingMall();
	}else{
		pageTitle.innerText = '- Open Market -';
		html = openMarket();
	}

	partnerContent.innerHTML = html;
}

const site = () => {
	return `
		<section class="comments_01">
			<article>
				<div>효과적인 홍보용 웹사이트 운영은 <span class="accentuation_1">미래 성장</span>을 위한 <span class="accentuation_1">필수 요소</span>입니다!</div>
				<div><span class="accentuation_2">홍보용 웹사이트는 단순한 소개 페이지를 넘어, 브랜드의 가치를 높이고, 고객과 소통하며, 매출 증대까지 이어지는 강력한 마케팅 도구입니다.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_01.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_1">고객 유치</span> 및 <span class="accentuation_1">마케팅 비용 절감</span></div>
			</article>
			<article>
				<div><span class="accentuation_2">전통적인 광고(신문, TV, 라디오 등)보다 비용이 저렴하고, 유지보수가 쉽습니다.</span></div>
				<div><span class="accentuation_2">SEO(Search Engine Optimization, 검색엔진 최적화)를 통해 구글, 네이버 등 검색엔진에서 상위 노출되면, 자연스럽게 신규 고객이 유입됩니다.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<article class="partner-img-banner-01">
				<div></div>
				<div></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_04.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_1">브랜드</span> 이미지 및 신뢰도 <span class="accentuation_1">향상</span></div>
			</article>
			<article>
				<div><span class="accentuation_2">전문적인 웹사이트는 브랜드의 신뢰도를 높이고, 경쟁력을 강화합니다.</span></div>
				<div><span class="accentuation_2">고객에게 회사의 비전, 미션, 철학을 전달하는 창구가 됩니다.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_05.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_1">온라인 접근성 향상</div>
			</article>
			<article>
				<div><span class="accentuation_2">24시간 365일 운영되는 온라인 매장 역할을 합니다.</span></div>
				<div><span class="accentuation_2">고객이 언제 어디서든 회사와 제품 정보를 확인할 수 있습니다.</span></div>
				<div><span class="accentuation_2">모바일, 태블릿, PC 등 다양한 디바이스에서 접근 가능하도록 최적화 가능.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_06.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_3">현대 비즈니스 환경에서는 <span class="accentuation_3_accent">온라인 마케팅과 디지털 브랜딩이 필수 요소</span>가 되었습니다.</span></div>
				<div><span class="accentuation_3">홍보용 웹사이트는 단순한 기업 소개를 넘어 고객과의 <span class="accentuation_3_accent">소통, 브랜드 신뢰 형성, 매출 증대 등 다양한 역할</span>을 수행합니다.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_07.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div>홍보용 웹사이트를 운영하면 <span class="accentuation_1">기업이나 브랜드</span>에 다양한 <span class="accentuation_1">긍정적인 효과</span>를 가져옵니다.</div>
				<div><span class="accentuation_2">기존 오프라인 영업에만 의존하던 방식에서 벗어나, 온라인 시장으로 확장 가능.</span></div>
				<div><span class="accentuation_2">온라인 포털사이트에서 검색 노출을 극대화하여 신규 고객 유입이 증가.</span></div>
				<div><span class="accentuation_2">온라인에서 브랜드를 발견한 고객들이 전화, 이메일, 채팅 등을 통해 문의.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<article class="partner-img-banner-02 triple-img">
				<div></div>
				<div></div>
				<div></div>
			</article>
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_2">온라인에서 제품과 서비스를 소개하면 고객이 쉽게 정보를 얻고, 구매 전환율이 높아짐.</span></div>
				<div><span class="accentuation_2">정리된 회사 소개, 대표 인사말, 고객 후기 등을 통해 브랜드 신뢰도 상승.</span></div>
				<div><span class="accentuation_2">경쟁사와 차별화된 고급스러운 웹사이트 디자인으로 프리미엄 브랜드 이미지를 구축.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<article class="partner-img-banner-03 triple-img">
				<div></div>
				<div></div>
				<div></div>
			</article>
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_3">홍보용 웹사이트는 단순한 소개 페이지를 넘어</div>
				<div><span class="accentuation_3"><span class="accentuation_3_accent">브랜드의 가치를 높이고, 고객과 소통하며, 매출 증대까지 이어지는 강력한 마케팅 도구</span>입니다.</div>
				<div><span class="accentuation_3"><span class="accentuation_3_accent">앞으로도 디지털 트렌드에 맞춰 지속적인 개선과 새로운 기능 추가</span>를</div>
				<div><span class="accentuation_3">통해 더욱 <span class="accentuation_3_accent">높은 가치를 창출</span>할 수 있습니다.</div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_14.jpg">
		</section>
		<section class="comments_01 last-comments">
			<article>
				<div>홈페이지 제작! <span>지음오피스</span>에 맡겨 보세요!</div>
				<div><span class="accentuation_2">지음오피스는 홈페이지를 직접 제작하며 원하는 구성을 합리적인 가격에 의뢰 할 수 있습니다.</span></div>
				<div><span class="accentuation_2">도메인 구입, 호스팅 서정도 함께 합니다.</span></div>
				<div><span class="accentuation_2">최신 트랜드에 맞춰 디자인과 기능을 구성합니다.</span></div>
				<div class="icon">
					<article><img src="/images/partnet/icon_ch.jpg"></article>
					<article><img src="/images/partnet/icon_talk.jpg"></article>
					<article><img src="/images/partnet/icon_google.jpg"></article>
					<article><img src="/images/partnet/icon_naver.jpg"></article>
				</div>
				<div><span class="accentuation_4">견적문의</span></div>
				<div><span class="accentuation_4">E-mail : wmullyu@gmail.com, Tel : 051-710-8103</span></div>
			</article>
		</section>
		<section class="comments_01 last-logo eng">
			WORLD TOTAL MULLYU Co.,Ltd
		</section>
	`;
}

const shoppingMall = () => {
	return `
		<section class="comments_01">
			<article>
				<div>디지털 시대의 필수 요소 <span class="accentuation_1">자사 쇼핑몰!</span></div>
				<div><span class="accentuation_2">현대 소비자들은 더 이상 오프라인 매장에 직접 방문하지 않고, <span class="accentuation_3_accent">온라인 쇼핑을 선호하는 경향</span>이 강합니다.<br>스마트폰과 인터넷이 보편화되면서 <span class="accentuation_3_accent">언제 어디서든 쉽게 상품을 검색</span>하고 구매할 수 있는 <span class="accentuation_3_accent">온라인 쇼핑몰의 필요성</span>이 증가하고 있습니다.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/shopping_banner_01.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_1">운영 비용 절감</span> 및 <span class="accentuation_1">효율성 증가</span></div>
			</article>
			<article>
				<div><span class="accentuation_2">오프라인 매장 운영보다 <span class="accentuation_3_accent">임대료, 인건비, 운영비 절감</span> 가능</span></div>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">24시간 운영이 가능</span>하므로 <span class="accentuation_3_accent">매출 극대화 가능<span></span></div>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">자동화된 주문 및 결제 시스템</span>을 통해 <span class="accentuation_3_accent">업무 효율성 증가</span></span></div>
			</article>
		</section>
		<section class="comments_01">
			<article class="shopping-img-banner-01">
				<div></div>
				<div></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/shopping_banner_04.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_1">온라인(전국 소비자) 시장 진출 가능</div>
			</article>
			<article>
				<div><span class="accentuation_2">지역에 국한되지 않고, <span class="accentuation_3_accent">전국 소비자에게 상품을 판매</span>할 수 있음</span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/shopping_banner_05.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_1">소비자 편의성 제공</div>
			</article>
			<article>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">비대면 쇼핑 가능</span> (언제 어디서나 구매 가능)</span></div>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">다양한 결제 수단 지원</span> (신용카드, 가상계좌, 간편결제 등)</span></div>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">상품 비교, 리뷰 확인 가능</span> → 소비자가 보다 신뢰할 수 있는 <span class="accentuation_3_accent">구매 환경 조성</span></span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/shopping_banner_06.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_3"><span class="accentuation_3_accent">쇼핑몰 운영</span>은 단순한 온라인 판매 공간을 넘어 <span class="accentuation_3_accent">브랜드의 가치를 높이고</span></div>
				<div><span class="accentuation_3">고객과의 <span class="accentuation_3_accent">소통을 강화</span>하며, 장기적인 <span class="accentuation_3_accent">수익 창출</span>로 이어지는 <span class="accentuation_3_accent">중요한 플랫폼</span>입니다.</div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/shopping_banner_07.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div>온라인 쇼핑몰은 <span class="accentuation_3_accent">미래의 핵심 비즈니스 모델</span>이며, 지금 시작하는 것이 <span class="accentuation_3_accent">가장 좋은 기회</span>입니다!</div>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">e-Commerce 시장</span>의 지속 성장</span></div>
				<div><span class="accentuation_2">개별 <span class="accentuation_3_accent">맞춤형 쇼핑 경험</span> 제공</span></div>
				<div><span class="accentuation_2">물류 및 배송 <span class="accentuation_3_accent">시스템의 혁신</span></span></div>
				<div><span class="accentuation_2">글로벌 e-Commerce <span class="accentuation_3_accent">시장 확장</span></span></div>
			</article>
		</section>
		<section class="comments_01">
			<article class="shopping-img-banner-02 triple-img">
				<div></div>
				<div></div>
				<div></div>
			</article>
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">매출 증가</span></span></div>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">브랜드 가치 상승</span></span></div>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">고객 데이터 분석 가능</span></span></div>
				<div><span class="accentuation_2"><span class="accentuation_3_accent">반복 구매 및 충성 고객 확보</span></span></div>
			</article>
		</section>
		<section class="comments_01">
			<article class="shopping-img-banner-03 triple-img">
				<div></div>
				<div></div>
				<div></div>
			</article>
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_3">온라인 쇼핑몰은 오프라인 매장이 가지는 <span class="accentuation_3_accent">한계를 보완</span>하고 극복할 수 있는 <span class="accentuation_3_accent">강력한 도구</span>입니다.</div>
				<div><span class="accentuation_3"><span class="accentuation_3_accent">공간과 시간</span>의 제약이 없음</div>
				<div><span class="accentuation_3">운영 <span class="accentuation_3_accent">비용 절감</span></div>
				<div><span class="accentuation_3">과거에는 고객이 직접 매장에 방문하여 제품을 보고 구매하는 것이 일반적이었지만, 이제는 <span class="accentuation_3_accent">온라인에서 제품을 검색하고 비교</span>한 후 구매하는 것이 <span class="accentuation_3_accent">기본적인 소비 패턴</span>이 되었습니다.</div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/shopping_banner_14.jpg">
		</section>
		<section class="comments_01 last-comments">
			<article>
				<div>쇼핑몰 제작! <span>지음오피스</span>에 맡겨 보세요!</div>
				<div><span class="accentuation_2">지음오피스는 안정적인 솔루션(메이크샵, 고도몰)을 이용하여 쇼핑몰을 제작합니다.</span></div>
				<div><span class="accentuation_2">기존 기능을 유지 하며 디자인을 원하는데로 구성 할 수 있습니다.</span></div>
				<div><span class="accentuation_2">공인된 서버와 확장 가능한 기술로 쇼핑몰을 제작합니다.</span></div>
				<div class="icon">
					<article><img src="/images/partnet/icon_ch.jpg"></article>
					<article><img src="/images/partnet/icon_talk.jpg"></article>
					<article><img src="/images/partnet/icon_google.jpg"></article>
					<article><img src="/images/partnet/icon_naver.jpg"></article>
					<article><img src="/images/partnet/icon_make.jpg"></article>
					<article><img src="/images/partnet/icon_godo.jpg"></article>
					<article><img src="/images/partnet/icon_payco.jpg"></article>
					<article><img src="/images/partnet/icon_naverpay.jpg"></article>
					<article><img src="/images/partnet/icon_kcp.jpg"></article>
				</div>
				<div><span class="accentuation_4">견적문의</span></div>
				<div><span class="accentuation_4">E-mail : wmullyu@gmail.com, Tel : 051-710-8103</span></div>
			</article>
		</section>
		<section class="comments_01 last-logo eng">
			WORLD TOTAL MULLYU Co.,Ltd
		</section>
	`;
}

const openMarket = () => {
	return `
		<section class="comments_01">
			<article>
				<div>효과적인 홍보용 웹사이트 운영은 <span class="accentuation_1">미래 성장</span>을 위한 <span class="accentuation_1">필수 요소</span>입니다!</div>
				<div><span class="accentuation_2">홍보용 웹사이트는 단순한 소개 페이지를 넘어, 브랜드의 가치를 높이고, 고객과 소통하며, 매출 증대까지 이어지는 강력한 마케팅 도구입니다.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<section class="open-market-banner-01">
				<section class="open-market-banners"></section>
				<section class="open-market-banners"></section>
				<section class="open-market-banners"></section>
				<section class="open-market-banners"></section>
				<section class="open-market-banners"></section>
			</section>
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_1">고객 유치</span> 및 <span class="accentuation_1">마케팅 비용 절감</span></div>
			</article>
			<article>
				<div><span class="accentuation_2">전통적인 광고(신문, TV, 라디오 등)보다 비용이 저렴하고, 유지보수가 쉽습니다.</span></div>
				<div><span class="accentuation_2">SEO(Search Engine Optimization, 검색엔진 최적화)를 통해 구글, 네이버 등 검색엔진에서 상위 노출되면, 자연스럽게 신규 고객이 유입됩니다.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<article class="partner-img-banner-01">
				<div></div>
				<div></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_04.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_1">브랜드</span> 이미지 및 신뢰도 <span class="accentuation_1">향상</span></div>
			</article>
			<article>
				<div><span class="accentuation_2">전문적인 웹사이트는 브랜드의 신뢰도를 높이고, 경쟁력을 강화합니다.</span></div>
				<div><span class="accentuation_2">고객에게 회사의 비전, 미션, 철학을 전달하는 창구가 됩니다.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_05.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_1">온라인 접근성 향상</div>
			</article>
			<article>
				<div><span class="accentuation_2">24시간 365일 운영되는 온라인 매장 역할을 합니다.</span></div>
				<div><span class="accentuation_2">고객이 언제 어디서든 회사와 제품 정보를 확인할 수 있습니다.</span></div>
				<div><span class="accentuation_2">모바일, 태블릿, PC 등 다양한 디바이스에서 접근 가능하도록 최적화 가능.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_06.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_3">현대 비즈니스 환경에서는 <span class="accentuation_3_accent">온라인 마케팅과 디지털 브랜딩이 필수 요소</span>가 되었습니다.</span></div>
				<div><span class="accentuation_3">홍보용 웹사이트는 단순한 기업 소개를 넘어 고객과의 <span class="accentuation_3_accent">소통, 브랜드 신뢰 형성, 매출 증대 등 다양한 역할</span>을 수행합니다.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_07.jpg">
		</section>
		<section class="comments_01">
			<article>
				<div>홍보용 웹사이트를 운영하면 <span class="accentuation_1">기업이나 브랜드</span>에 다양한 <span class="accentuation_1">긍정적인 효과</span>를 가져옵니다.</div>
				<div><span class="accentuation_2">기존 오프라인 영업에만 의존하던 방식에서 벗어나, 온라인 시장으로 확장 가능.</span></div>
				<div><span class="accentuation_2">온라인 포털사이트에서 검색 노출을 극대화하여 신규 고객 유입이 증가.</span></div>
				<div><span class="accentuation_2">온라인에서 브랜드를 발견한 고객들이 전화, 이메일, 채팅 등을 통해 문의.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<article class="partner-img-banner-02 triple-img">
				<div></div>
				<div></div>
				<div></div>
			</article>
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_2">온라인에서 제품과 서비스를 소개하면 고객이 쉽게 정보를 얻고, 구매 전환율이 높아짐.</span></div>
				<div><span class="accentuation_2">정리된 회사 소개, 대표 인사말, 고객 후기 등을 통해 브랜드 신뢰도 상승.</span></div>
				<div><span class="accentuation_2">경쟁사와 차별화된 고급스러운 웹사이트 디자인으로 프리미엄 브랜드 이미지를 구축.</span></div>
			</article>
		</section>
		<section class="comments_01">
			<article class="partner-img-banner-03 triple-img">
				<div></div>
				<div></div>
				<div></div>
			</article>
		</section>
		<section class="comments_01">
			<article>
				<div><span class="accentuation_3">홍보용 웹사이트는 단순한 소개 페이지를 넘어</div>
				<div><span class="accentuation_3"><span class="accentuation_3_accent">브랜드의 가치를 높이고, 고객과 소통하며, 매출 증대까지 이어지는 강력한 마케팅 도구</span>입니다.</div>
				<div><span class="accentuation_3"><span class="accentuation_3_accent">앞으로도 디지털 트렌드에 맞춰 지속적인 개선과 새로운 기능 추가</span>를</div>
				<div><span class="accentuation_3">통해 더욱 <span class="accentuation_3_accent">높은 가치를 창출</span>할 수 있습니다.</div>
			</article>
		</section>
		<section class="comments_01">
			<img src="/images/partnet/partner_banner_14.jpg">
		</section>
		<section class="comments_01 last-comments">
			<article>
				<div>홈페이지 제작! <span>지음오피스</span>에 맡겨 보세요!</div>
				<div><span class="accentuation_2">지음오피스는 홈페이지를 직접 제작하며 원하는 구성을 합리적인 가격에 의뢰 할 수 있습니다.</span></div>
				<div><span class="accentuation_2">도메인 구입, 호스팅 설정도 함께 합니다.</span></div>
				<div><span class="accentuation_2">최신 트랜드에 맞춰 디자인과 기능을 구성합니다.</span></div>
				<div class="icon">
					<article><img src="/images/partnet/icon_ch.jpg"></article>
					<article><img src="/images/partnet/icon_talk.jpg"></article>
					<article><img src="/images/partnet/icon_google.jpg"></article>
					<article><img src="/images/partnet/icon_naver.jpg"></article>
				</div>
				<div><span class="accentuation_4">견적문의</span></div>
				<div><span class="accentuation_4">E-mail : wmullyu@gmail.com, Tel : 051-710-8103</span></div>
			</article>
		</section>
		<section class="comments_01 last-logo eng">
			WORLD TOTAL MULLYU Co.,Ltd
		</section>
	`;
}

setPartner(partnerPageTitle);