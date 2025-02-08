package com.example.code.category;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryThirdRepository extends JpaRepository<CategoryThird, String> {
    
    // category_first_idx와 category_second_idx를 조건으로 데이터 조회
    List<CategoryThird> findByCategoryFirstIdxAndCategorySecondIdx(String categoryFirstIdx, String categorySecondIdx);
}
