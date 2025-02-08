package com.example.code.category;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "category_third")
@JsonIgnoreProperties(ignoreUnknown = true) // 불필요한 필드 무시
public class CategoryThird {

    @Id
    @Column(name = "idx", length = 2, nullable = false)
    @JsonProperty("idx") // JSON 필드명 명시
    private String idx;

    @Column(name = "name", length = 20, nullable = true)
    @JsonProperty("name")
    private String name;

    @Column(name = "category_first_idx", length = 2, nullable = false)
    @JsonProperty("categoryFirstIdx")
    private String categoryFirstIdx;

    @Column(name = "category_second_idx", length = 2, nullable = false)
    @JsonProperty("categorySecondIdx")
    private String categorySecondIdx;

    // Getter & Setter 추가
    public String getIdx() { return idx; }
    public void setIdx(String idx) { this.idx = idx; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategoryFirstIdx() { return categoryFirstIdx; }
    public void setCategoryFirstIdx(String categoryFirstIdx) { this.categoryFirstIdx = categoryFirstIdx; }

    public String getCategorySecondIdx() { return categorySecondIdx; }
    public void setCategorySecondIdx(String categorySecondIdx) { this.categorySecondIdx = categorySecondIdx; }
}
