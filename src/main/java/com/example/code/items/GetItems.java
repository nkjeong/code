package com.example.code.items;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

@RestController
public class GetItems {

    @Autowired
    private DataSource dataSource;

    // 데이터 모델 클래스 정의
    public static class Goods {
        public String code;
        public String barcode;
        public String itemName;
        public String itemNameReg;
        public String itemNumber;
        public String itemStandard;
        public String itemOrigin;
        public String manufacturingCompanyCode;
        public String itemUnit;
        public Integer itemRetailPrice;
        public Integer itemPurchasePrice;
        public Integer itemSalePrice1;
        public Integer itemSalePrice2;
        public Integer itemSalePrice3;
        public String notice;
        public String keyword;
        public String category;
        public Timestamp registrationDate;
        public Timestamp modifyDate;
        public String discontinued;
        public String outOfStock;
        public String option;
        public Integer hit;
        public String mullyuCode;
        public String promotionRate;
        public Timestamp promotionStart;
        public Timestamp promotionEnd;
        public String promotion;
        public String recommended;
        public String manufacturingCompanyName;
    }

    @GetMapping("/goods/all")
    public List<Goods> getAllGoods() throws SQLException {
        String query = "SELECT g.*, mc.nameEng AS manufacturingCompanyName " +
                       "FROM goods g " +
                       "LEFT JOIN manufacturingcompany mc " +
                       "ON g.manufacturing_company_code = mc.code";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {

            List<Goods> goodsList = new ArrayList<>();
            while (resultSet.next()) {
                Goods goods = mapGoods(resultSet);
                goodsList.add(goods);
            }
            return goodsList;
        }
    }

    @GetMapping("/goods/new")
    public List<Goods> getNewGoods() throws SQLException {
        String query = "SELECT g.*, mc.nameEng AS manufacturingCompanyName " +
                       "FROM goods g " +
                       "LEFT JOIN manufacturingcompany mc " +
                       "ON g.manufacturing_company_code = mc.code " +
                       "ORDER BY g.registration_date DESC LIMIT 10";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {

            List<Goods> goodsList = new ArrayList<>();
            while (resultSet.next()) {
                Goods goods = mapGoods(resultSet);
                goodsList.add(goods);
            }
            return goodsList;
        }
    }
    
    @GetMapping("/goods/by-category")
    public List<Goods> getGoodsByCategory(@RequestParam String idx) throws SQLException {
        String query = "SELECT g.*, mc.nameEng AS manufacturingCompanyName " +
                       "FROM goods g " +
                       "LEFT JOIN manufacturingcompany mc " +
                       "ON g.manufacturing_company_code = mc.code " +
                       "WHERE g.category LIKE ? " +
                       "LIMIT 10";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setString(1, idx + "%"); // idx로 시작하는 값 검색
            ResultSet resultSet = statement.executeQuery();

            List<Goods> goodsList = new ArrayList<>();
            while (resultSet.next()) {
                Goods goods = mapGoods(resultSet);
                goodsList.add(goods);
            }
            return goodsList;
        }
    }

    private Goods mapGoods(ResultSet resultSet) throws SQLException {
        Goods goods = new Goods();
        goods.code = resultSet.getString("code");
        goods.barcode = resultSet.getString("barcode");
        goods.itemName = resultSet.getString("item_name");
        goods.itemNameReg = resultSet.getString("item_name_reg");
        goods.itemNumber = resultSet.getString("item_number");
        goods.itemStandard = resultSet.getString("item_standard");
        goods.itemOrigin = resultSet.getString("item_origin");
        goods.manufacturingCompanyCode = resultSet.getString("manufacturing_company_code");
        goods.itemUnit = resultSet.getString("item_unit");
        goods.itemRetailPrice = resultSet.getInt("item_retail_price");
        goods.itemPurchasePrice = resultSet.getInt("item_purchase_price");
        goods.itemSalePrice1 = resultSet.getInt("item_sale_price_1");
        goods.itemSalePrice2 = resultSet.getInt("item_sale_price_2");
        goods.itemSalePrice3 = resultSet.getInt("item_sale_price_3");
        goods.notice = resultSet.getString("notice");
        goods.keyword = resultSet.getString("keyword");
        goods.category = resultSet.getString("category");
        goods.registrationDate = resultSet.getTimestamp("registration_date");
        goods.modifyDate = resultSet.getTimestamp("modify_date");
        goods.discontinued = resultSet.getString("discontinued");
        goods.outOfStock = resultSet.getString("out_of_stock");
        goods.option = resultSet.getString("option");
        goods.hit = resultSet.getInt("hit");
        goods.mullyuCode = resultSet.getString("mullyu_code");
        goods.promotionRate = resultSet.getString("promotion_rate");
        goods.promotionStart = resultSet.getTimestamp("promotion_start");
        goods.promotionEnd = resultSet.getTimestamp("promotion_end");
        goods.promotion = resultSet.getString("promotion");
        goods.recommended = resultSet.getString("recommended");
        goods.manufacturingCompanyName = resultSet.getString("manufacturingCompanyName");
        return goods;
    }
}
