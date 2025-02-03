package com.example.code.brand;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/brand")
public class BrandController {

    private final ManufacturingCompanyRepository repository;

    public BrandController(ManufacturingCompanyRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/list")
    public List<ManufacturingCompany> getAllCompanies() {
        return repository.findAll();
    }
}
