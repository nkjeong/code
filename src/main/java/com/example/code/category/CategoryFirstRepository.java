package com.example.code.category;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategoryFirstRepository extends JpaRepository<CategoryFirst, String> {
	// 마지막 idx 조회 (숫자로 정렬 후 최대값 가져오기)
    @Query("SELECT MAX(c.idx) FROM CategoryFirst c")
    Optional<String> findLastIdx();
}