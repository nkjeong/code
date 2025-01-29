package com.example.code.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategorySecondRepository extends JpaRepository<CategorySecond, String> {

    // 특정 1차 카테고리와 매칭되는 2차 카테고리를 조회
    List<CategorySecond> findByCategoryFirstIdx(String categoryFirstIdx);
}
