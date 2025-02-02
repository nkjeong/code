package com.example.code.brand;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/brands")
public class BrandController {

    private final BrandRepository brandRepository;

    @Autowired
    public BrandController(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandRepository.findAll(); // ✅ JPA를 사용하여 모든 브랜드 가져오기
        return ResponseEntity.ok(brands); // ✅ JSON 응답 반환
    }
}
