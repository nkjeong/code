package com.example.code.category;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category_second") // 2차 카테고리 테이블 매핑
public class CategorySecond {

    @Id
    private String idx; // 기본 키

    private String name; // 2차 카테고리 이름

    private String categoryFirstIdx; // 1차 카테고리 idx와 연결

    // Getter & Setter
    public String getIdx() {
        return idx;
    }

    public void setIdx(String idx) {
        this.idx = idx;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategoryFirstIdx() {
        return categoryFirstIdx;
    }

    public void setCategoryFirstIdx(String categoryFirstIdx) {
        this.categoryFirstIdx = categoryFirstIdx;
    }
}