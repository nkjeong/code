package com.example.code.items;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

@Controller
public class GetItems {

    @Autowired
    private DataSource dataSource;
    
    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON 변환기

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

    @GetMapping("/items")
    public String categoryItemsPage(@RequestParam(required = false) String idx, Model model) {
        model.addAttribute("categoryIdx", idx); // 선택한 카테고리 코드 전달
        return "items";
    }

    @GetMapping("/category-items")
    @ResponseBody
    public List<Goods> getCategoryItems(@RequestParam String idx) {
    	String query = "SELECT g.*, mc.nameEng AS manufacturingCompanyName " +
                "FROM goods g " +
                "LEFT JOIN manufacturingcompany mc " +
                "ON g.manufacturing_company_code = mc.code " +
                "WHERE g.category LIKE ?";

        List<Goods> goodsList = new ArrayList<>();
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setString(1, idx + "%");
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Goods goods = new Goods();

                // NULL 방지: 값이 NULL이면 기본값으로 설정
                goods.code = safeString(resultSet.getString("code"), "UNKNOWN");
                goods.barcode = safeString(resultSet.getString("barcode"), "N/A");
                goods.itemName = safeString(resultSet.getString("item_name"), "Unnamed Item");
                goods.itemNameReg = safeString(resultSet.getString("item_name_reg"), "N/A");
                goods.itemNumber = safeString(resultSet.getString("item_number"), "N/A");
                goods.itemStandard = safeString(resultSet.getString("item_standard"), "N/A");
                goods.itemOrigin = safeString(resultSet.getString("item_origin"), "Unknown");
                goods.manufacturingCompanyCode = safeString(resultSet.getString("manufacturing_company_code"), "0000");
                goods.itemUnit = safeString(resultSet.getString("item_unit"), "Unit");

                goods.itemRetailPrice = safeInt(resultSet.getInt("item_retail_price"), 0);
                goods.itemPurchasePrice = safeInt(resultSet.getInt("item_purchase_price"), 0);
                goods.itemSalePrice1 = safeInt(resultSet.getInt("item_sale_price_1"), 0);
                goods.itemSalePrice2 = safeInt(resultSet.getInt("item_sale_price_2"), 0);
                goods.itemSalePrice3 = safeInt(resultSet.getInt("item_sale_price_3"), 0);

                goods.notice = safeString(resultSet.getString("notice"), "No notice");
                goods.keyword = safeString(resultSet.getString("keyword"), "");
                goods.category = safeString(resultSet.getString("category"), "Uncategorized");

                goods.registrationDate = safeTimestamp(resultSet.getTimestamp("registration_date"));
                goods.modifyDate = safeTimestamp(resultSet.getTimestamp("modify_date"));

                goods.discontinued = safeString(resultSet.getString("discontinued"), "N");
                goods.outOfStock = safeString(resultSet.getString("out_of_stock"), "N");
                goods.option = safeString(resultSet.getString("option"), "N/A");

                goods.hit = safeInt(resultSet.getInt("hit"), 0);
                goods.mullyuCode = safeString(resultSet.getString("mullyu_code"), "0000");
                goods.promotionRate = safeString(resultSet.getString("promotion_rate"), "0%");
                goods.promotionStart = safeTimestamp(resultSet.getTimestamp("promotion_start"));
                goods.promotionEnd = safeTimestamp(resultSet.getTimestamp("promotion_end"));
                goods.promotion = safeString(resultSet.getString("promotion"), "N");
                goods.recommended = safeString(resultSet.getString("recommended"), "N");
                goods.manufacturingCompanyName = safeString(resultSet.getString("manufacturingCompanyName"), "Unknown Company");

                goodsList.add(goods);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return goodsList;
    }
 // NULL 값 방지 (String)
    private String safeString(String value, String defaultValue) {
        return (value != null) ? value : defaultValue;
    }

    // NULL 값 방지 (int)
    private int safeInt(int value, int defaultValue) {
        return value;
    }

    // NULL 값 방지 (Timestamp)
    private Timestamp safeTimestamp(Timestamp timestamp) {
        return (timestamp != null) ? timestamp : new Timestamp(System.currentTimeMillis()); // 기본값: 현재 시간
    }


    @GetMapping("/goods/all")
    @ResponseBody  // ✅ JSON 응답을 반환하도록 변경
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
                goodsList.add(mapGoods(resultSet));
            }
            return goodsList;  // ✅ JSON 반환
        }
    }

    @GetMapping("/goods/new")
    @ResponseBody  // ✅ JSON 응답을 반환하도록 변경
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
                goodsList.add(mapGoods(resultSet));
            }
            return goodsList;  // ✅ JSON 반환
        }
    }
    
    @GetMapping("/goods/by-category")
    @ResponseBody  // ✅ JSON 응답을 반환하도록 변경
    public List<Goods> getGoodsByCategory(@RequestParam String idx) throws SQLException {
        String query = "SELECT g.*, mc.nameEng AS manufacturingCompanyName " +
                       "FROM goods g " +
                       "LEFT JOIN manufacturingcompany mc " +
                       "ON g.manufacturing_company_code = mc.code " +
                       "WHERE g.category LIKE ? " +
                       "LIMIT 10";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setString(1, idx + "%"); 
            ResultSet resultSet = statement.executeQuery();

            List<Goods> goodsList = new ArrayList<>();
            while (resultSet.next()) {
                goodsList.add(mapGoods(resultSet));
            }
            return goodsList;  // ✅ JSON 반환
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
