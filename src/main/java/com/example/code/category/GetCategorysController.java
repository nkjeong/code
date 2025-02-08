package com.example.code.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
public class GetCategorysController {

    @Autowired
    private CategoryFirstRepository categoryFirstRepository;
    
    @Autowired
    private CategorySecondRepository categorySecondRepository;
    
    @Autowired
    private CategoryThirdRepository categoryThirdRepository;

    
    // 카테고리 이름 수정 API
    @PutMapping("/categories/{idx}/update")
    public ResponseEntity<?> updateCategoryName(@PathVariable String idx, @RequestBody CategoryUpdateRequest request) {
        Optional<CategoryFirst> categoryOptional = categoryFirstRepository.findById(idx);

        if (categoryOptional.isPresent()) {
            CategoryFirst category = categoryOptional.get();
            category.setCateName(request.getCateName()); // 새로운 이름 설정
            categoryFirstRepository.save(category); // 저장

            return ResponseEntity.ok("{\"success\": true, \"message\": \"카테고리 이름이 수정되었습니다.\"}");
        } else {
            return ResponseEntity.status(404).body("{\"success\": false, \"message\": \"해당 카테고리를 찾을 수 없습니다.\"}");
        }
    }
    
    // 카테고리 추가 API
    @PostMapping("/categories/add")
    @Transactional
    public ResponseEntity<?> addCategory(@RequestBody CategoryUpdateRequest request) {
        // 1. 입력값 검증 (서버에서도 필수 체크)
        if (request.getCateName() == null || request.getCateName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"success\": false, \"message\": \"카테고리 이름을 입력하세요.\"}");
        }

        if (request.getCateName().length() > 30) {
            return ResponseEntity.badRequest().body("{\"success\": false, \"message\": \"카테고리 이름은 30자 이하여야 합니다.\"}");
        }
        
        // 2. 마지막 idx 값 조회하여 +1 증가
        Optional<String> lastIdxOpt = categoryFirstRepository.findLastIdx();
        int newIdx = lastIdxOpt.map(idx -> Integer.parseInt(idx) + 1).orElse(1);
        String formattedIdx = String.format("%02d", newIdx); // 두 자리 숫자로 포맷

        // 3. 새 카테고리 생성
        CategoryFirst newCategory = new CategoryFirst();
        newCategory.setIdx(formattedIdx);
        newCategory.setCateName(request.getCateName().trim()); // 앞뒤 공백 제거 후 저장

        // 4. 데이터 저장
        categoryFirstRepository.save(newCategory);

        // 5. 응답 반환
        return ResponseEntity.ok("{\"success\": true, \"message\": \"카테고리가 추가되었습니다.\", \"idx\": \"" + formattedIdx + "\"}");
    }
    
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
    
    @GetMapping("/categories/{idx}/second")
    public List<CategorySecond> getSecondCategories(@PathVariable String idx) {
        return categorySecondRepository.findByCategoryFirstIdx(idx);
    }
    
    @GetMapping("/categories/third")
    public ResponseEntity<?> getCategoryThirds(@RequestParam String fIdx, @RequestParam String sIdx) {
        List<CategoryThird> categoryThirds = categoryThirdRepository.findByCategoryFirstIdxAndCategorySecondIdx(fIdx, sIdx);

        if (categoryThirds.isEmpty()) {
            // 404 대신 200 OK 응답을 반환하고 success: false 메시지 전달
            return ResponseEntity.ok("{\"success\": false, \"message\": \"해당 조건에 맞는 데이터가 없습니다.\", \"data\": []}");
        }

        return ResponseEntity.ok(categoryThirds);
    }

}
