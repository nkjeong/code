package com.example.code.member;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String loginForm() {
        return "login/index"; // 템플릿 경로 포함
    }

    @PostMapping("/login/isMember")
    @ResponseBody
    public String login(@RequestBody Map<String, String> requestData, HttpSession session, Model model) {
        // JSON 데이터에서 userId와 userPw 추출
        String userId = requestData.get("userId");
        String userPw = requestData.get("userPw");

        // 사용자 인증 로직
        User user = userService.findByUserId(userId);
        if (user != null && user.getUserPw().equals(userPw)) {
            // 새로운 User 객체 생성 (userPw 제외)
			/*
			 * User sessionUser = new User(); sessionUser.setId(user.getId());
			 * sessionUser.setUserId(user.getUserId());
			 * sessionUser.setAuthority(user.getAuthority());
			 * sessionUser.setUserEmail(user.getUserEmail());
			 * sessionUser.setCompanyName(user.getCompanyName());
			 * sessionUser.setCompanyPhone(user.getCompanyPhone());
			 * sessionUser.setModifyDate(user.getModifyDate());
			 * sessionUser.setUserCellphone(user.getUserCellphone());
			 * sessionUser.setCompanyRegistrationNumber(user.getCompanyRegistrationNumber())
			 * ; sessionUser.setCompanyfax(user.getCompanyfax());
			 * sessionUser.setCompanyZipcode(user.getCompanyZipcode());
			 * sessionUser.setCompanyAddress_1(user.getCompanyAddress_1());
			 * sessionUser.setCompanyAddress_2(user.getCompanyAddress_2());
			 * sessionUser.setRegistrationDate(user.getRegistrationDate());
			 */
            // 세션에 전체 User 객체 저장 (userPw는 제외 가능)
            session.setAttribute("user", user);
            session.setAttribute("userId", user.getUserId());
            session.setAttribute("authority", user.getAuthority());
            boolean isAdmin = "A".equals(user.getAuthority());
            session.setAttribute("isAdmin", isAdmin);

            // 모델에도 추가하여 Mustache에서 사용 가능하도록 설정
            model.addAttribute("user", user);
            model.addAttribute("userId", user.getUserId());
            model.addAttribute("authority", user.getAuthority());
            model.addAttribute("isAdmin", isAdmin);
            return "SUCCESS";
        } else {
            return "failure";
        }
    }
    
    
    
    @PostMapping("/update/user")
    @ResponseBody
    public String updateUser(@RequestBody Map<String, Object> requestData, HttpSession session) {
        String userId = (String) requestData.get("userId");
        String userPw = (String) requestData.get("userPw");

        User existingUser = userService.findByUserId(userId);

        if (existingUser != null && existingUser.getUserPw().equals(userPw)) {
            existingUser.setCompanyName((String) requestData.get("companyName"));
            existingUser.setUserEmail((String) requestData.get("userEmail"));
            existingUser.setCompanyPhone((String) requestData.get("companyPhone"));
            existingUser.setUserCellphone((String) requestData.get("userCellphone"));
            existingUser.setCompanyRegistrationNumber((String) requestData.get("companyRegistrationNumber"));
            existingUser.setCompanyfax((String) requestData.get("companyfax"));
            existingUser.setCompanyZipcode((String) requestData.get("companyZipcode"));
            existingUser.setCompanyAddress_1((String) requestData.get("companyAddress_1"));
            existingUser.setCompanyAddress_2((String) requestData.get("companyAddress_2"));

            // 수정일을 LocalDateTime으로 설정
            existingUser.setModifyDate(LocalDateTime.ofInstant(new Date().toInstant(), ZoneId.systemDefault()));

            userService.saveUser(existingUser);
            session.setAttribute("user", existingUser);

            return "SUCCESS";
        } else {
            return "failure";
        }
    }



    @GetMapping("/")
    public String home(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        Boolean isAdmin = (Boolean) session.getAttribute("isAdmin");

        if (user != null) {
            model.addAttribute("user", user);
            model.addAttribute("userId", user.getUserId());  // userId 추가
            model.addAttribute("isAdmin", isAdmin != null ? isAdmin : false);
        } else {
            model.addAttribute("user", new User());
            model.addAttribute("userId", "");  // userId가 없을 때 기본값 추가
            model.addAttribute("isAdmin", false);
        }

        return "index"; // Mustache 템플릿 파일
    }


    @GetMapping("/join")
    public String joinForm() {
        return "join/index"; // 회원 가입 템플릿 경로
    }

    @PostMapping("/join/memberJoin")
    @ResponseBody
    public String memberJoin(@RequestBody Map<String, Object> requestData) {
        User user = new User();
        user.setId(userService.generateNewIdx()); // 새로운 idx 값 설정

        // JSON 데이터를 User 객체에 매핑
        user.setId((String) requestData.get("id"));
        user.setUserId((String) requestData.get("userId"));
        user.setUserPw((String) requestData.get("userPw"));
        user.setAuthority((String) requestData.get("authority"));
        user.setUserEmail((String) requestData.get("userEmail"));
        user.setCompanyName((String) requestData.get("companyName"));
        user.setCompanyPhone((String) requestData.get("companyPhone"));
        user.setModifyDate((LocalDateTime) requestData.get("modifyDate"));
        user.setUserCellphone((String) requestData.get("userCellphone"));
        user.setCompanyRegistrationNumber((String) requestData.get("companyRegistrationNumber"));
        user.setCompanyfax((String) requestData.get("companyfax"));
        user.setCompanyZipcode((String) requestData.get("companyZipcode"));
        user.setCompanyAddress_1((String) requestData.get("companyAddress_1"));
        user.setCompanyAddress_2((String) requestData.get("companyAddress_2"));
        user.setRegistrationDate((LocalDateTime) requestData.get("registrationDate"));

        // 사용자 저장
        userService.saveUser(user);

        return "SUCCESS";
    }
    
    @GetMapping("/checkUserId")
    @ResponseBody
    public String checkUserId(@RequestParam("userId") String userId) {
        User user = userService.findByUserId(userId);
        return (user != null) ? "MEMBER" : "NO-MEMBER";
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
}
