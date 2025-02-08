package com.example.code.administrator;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class Administrator {

    @GetMapping("/admin")
    public String adminPage(@RequestParam(name = "fn", required = false, defaultValue = "default") String fn, Model model) {
        model.addAttribute("fn", fn);
        return "administrator"; // Mustache 파일명 (administrator.mustache)
    }
}