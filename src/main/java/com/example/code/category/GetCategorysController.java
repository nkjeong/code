package com.example.code.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GetCategorysController {

    @Autowired
    private CategoryFirstRepository categoryFirstRepository;

    @GetMapping("/categories") // GET 요청 처리
    public List<CategoryFirst> getCategories() {
        return categoryFirstRepository.findAll();
    }
}