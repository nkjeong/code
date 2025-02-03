package com.example.code.brand;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "manufacturingcompany")
public class ManufacturingCompany {

    @Id
    @Column(length = 4)
    private String code;

    @Column(length = 25)
    private String nameEng;

    @Column(length = 25)
    private String nameKor;

    // 기본 생성자
    public ManufacturingCompany() {}

    // Getter 및 Setter
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNameEng() {
        return nameEng;
    }

    public void setNameEng(String nameEng) {
        this.nameEng = nameEng;
    }

    public String getNameKor() {
        return nameKor;
    }

    public void setNameKor(String nameKor) {
        this.nameKor = nameKor;
    }
}
