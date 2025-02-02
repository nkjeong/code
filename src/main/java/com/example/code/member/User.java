package com.example.code.member;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "idx", length = 4)
    private String id;

    @Column(name = "userId")
    private String userId;

    @Column(name = "userPw")
    private String userPw;
    
    @Column(name = "userEmail")
    private String userEmail;
    
    @Column(name = "userCellphone")
    private String userCellphone;
    
    @Column(name = "companyName")
    private String companyName;
    
    @Column(name = "companyRegistrationNumber")
    private String companyRegistrationNumber;
    
    @Column(name = "companyPhone")
    private String companyPhone;
    
    @Column(name = "companyfax")
    private String companyfax;

    @Column(name = "companyZipcode")
    private String companyZipcode;
    
    @Column(name = "companyAddress_1")
    private String companyAddress_1;

    @Column(name = "companyAddress_2")
    private String companyAddress_2;
    
    @Column(name = "registrationDate")
    private LocalDateTime registrationDate;
    
    @Column(name = "modifyDate")
    private LocalDateTime modifyDate;
    
    @Column(name = "authority")
    private String authority;



    @PrePersist
    protected void onCreate() {
    	registrationDate = LocalDateTime.now();
        modifyDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        modifyDate = LocalDateTime.now();
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserPw() {
        return userPw;
    }

    public void setUserPw(String userPw) {
        this.userPw = userPw;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyPhone() {
        return companyPhone;
    }

    public void setCompanyPhone(String companyPhone) {
        this.companyPhone = companyPhone;
    }

    public LocalDateTime getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(LocalDateTime modifyDate) {
        this.modifyDate = modifyDate;
    }

	public String getUserCellphone() {
		return userCellphone;
	}

	public void setUserCellphone(String userCellphone) {
		this.userCellphone = userCellphone;
	}

	public String getCompanyRegistrationNumber() {
		return companyRegistrationNumber;
	}

	public void setCompanyRegistrationNumber(String companyRegistrationNumber) {
		this.companyRegistrationNumber = companyRegistrationNumber;
	}

	public String getCompanyfax() {
		return companyfax;
	}

	public void setCompanyfax(String companyfax) {
		this.companyfax = companyfax;
	}

	public String getCompanyZipcode() {
		return companyZipcode;
	}

	public void setCompanyZipcode(String companyZipcode) {
		this.companyZipcode = companyZipcode;
	}

	public String getCompanyAddress_1() {
		return companyAddress_1;
	}

	public void setCompanyAddress_1(String companyAddress_1) {
		this.companyAddress_1 = companyAddress_1;
	}

	public String getCompanyAddress_2() {
		return companyAddress_2;
	}

	public void setCompanyAddress_2(String companyAddress_2) {
		this.companyAddress_2 = companyAddress_2;
	}

	public LocalDateTime getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(LocalDateTime registrationDate) {
		this.registrationDate = registrationDate;
	}
    
}
