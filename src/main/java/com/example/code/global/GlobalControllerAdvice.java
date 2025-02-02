package com.example.code.global;

import jakarta.servlet.http.HttpSession;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import com.example.code.member.User;

@ControllerAdvice
public class GlobalControllerAdvice {

    @ModelAttribute
    public void addGlobalAttributes(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        Boolean isAdmin = (Boolean) session.getAttribute("isAdmin");

        if (user != null && user.getUserId() != null) { // 로그인된 경우
            model.addAttribute("user", user);
            model.addAttribute("userId", user.getUserId());
            model.addAttribute("authority", user.getAuthority());
            model.addAttribute("isAdmin", isAdmin != null ? isAdmin : false);
        } else {
            session.removeAttribute("user"); // 세션에서 user 완전히 제거
            model.addAttribute("user", null); // Mustache에서 null 인식 가능하도록 강제 설정
            model.addAttribute("userId", ""); // userId가 없음을 명확히 표시
        }
    }
}
