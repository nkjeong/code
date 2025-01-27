package com.example.code.category;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category_first") // 테이블 이름과 매핑
public class CategoryFirst {
    @Id
    private String idx; // 기본 키로 설정

    private String cateName; // 컬럼 매핑 (cate_name)

    // Getter & Setter
    public String getIdx() {
        return idx;
    }

    public void setIdx(String idx) {
        this.idx = idx;
    }

    public String getCateName() {
        return cateName;
    }

    public void setCateName(String cateName) {
        this.cateName = cateName;
    }
}
