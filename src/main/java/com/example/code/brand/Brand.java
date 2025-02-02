package com.example.code.brand;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "manufacturingcompany") // ✅ 테이블명 확인
@Getter
@Setter
public class Brand {
    
    @Id
    @Column(name = "code")  // ✅ 테이블 컬럼명과 정확히 일치
    private String code;

    @Column(name = "nameEng") // ✅ 컬럼명이 `nameEng`라면 정확히 일치해야 함
    private String nameEng;

    @Column(name = "nameKor") // ✅ 컬럼명이 `nameKor`라면 정확히 일치해야 함
    private String nameKor;
}
