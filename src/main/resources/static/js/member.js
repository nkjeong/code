"use strict";
document.querySelector(".btn-primary.eng").addEventListener("click", async () => {
    const userId = document.querySelector(".userId").value;
    const userPw = document.querySelector(".userPw").value;
	const info = {"userId":userId, "userPw":userPw}
	const msg = document.querySelector('.msg');
	try{
		msg.style.display = 'block';
		if(userId.trim() === '' || userPw.trim() === ''){
			msg.innerText = '아이디와 비밀번호를 입력 하세요!';
			return false;
		}else{
			const response = await fetch("/login/isMember", {
			    method: "POST",
			    headers: {
			        'Content-Type': 'application/json'
			    },
			    body: JSON.stringify(info)
			});

			const result = await response.text();
			console.log(result, response.ok)
			if (response.ok && result === 'SUCCESS') {
			    alert('로그인 성공! 메인 페이지로 이동합니다.');
			    location.href = '/';
			} else {
			    msg.innerText = '아이디 또는 비밀번호가 맞지 않습니다!';
			}
		}
	}catch(error){
		msg.innerHTML = error;
	}
});