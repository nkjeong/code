package com.example.code.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;

@RestController
public class GetCategorysController {

    @Autowired
    private CategoryFirstRepository categoryFirstRepository;

    // 모든 카테고리 반환
    @GetMapping("/categories")
    public List<CategoryFirst> getCategories() {
        return categoryFirstRepository.findAll();
    }

    // 랜덤으로 선택된 카테고리 반환
    @GetMapping("/categories/random")
    public CategoryFirst getRandomCategory() {
        List<CategoryFirst> categories = categoryFirstRepository.findAll();
        if (categories.isEmpty()) {
            return null; // 리스트가 비어있으면 null 반환
        }
        Random random = new Random();
        int randomIndex = random.nextInt(categories.size()); // 리스트 크기만큼 랜덤 인덱스 생성
        return categories.get(randomIndex); // 해당 인덱스의 카테고리 반환
    }
}
