package com.foodapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * A Bill.
 */
@Entity
@Table(name = "bill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "billid")
    private Integer billid;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "totalprice", precision = 21, scale = 2)
    private BigDecimal totalprice;

    @Column(name = "couponid")
    private Integer couponid;

    @Column(name = "shipping")
    private Boolean shipping;

    @OneToOne(mappedBy = "bill")
    @JsonIgnore
    private Coupon coupon;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBillid() {
        return billid;
    }

    public Bill billid(Integer billid) {
        this.billid = billid;
        return this;
    }

    public void setBillid(Integer billid) {
        this.billid = billid;
    }

    public LocalDate getDate() {
        return date;
    }

    public Bill date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getTotalprice() {
        return totalprice;
    }

    public Bill totalprice(BigDecimal totalprice) {
        this.totalprice = totalprice;
        return this;
    }

    public void setTotalprice(BigDecimal totalprice) {
        this.totalprice = totalprice;
    }

    public Integer getCouponid() {
        return couponid;
    }

    public Bill couponid(Integer couponid) {
        this.couponid = couponid;
        return this;
    }

    public void setCouponid(Integer couponid) {
        this.couponid = couponid;
    }

    public Boolean isShipping() {
        return shipping;
    }

    public Bill shipping(Boolean shipping) {
        this.shipping = shipping;
        return this;
    }

    public void setShipping(Boolean shipping) {
        this.shipping = shipping;
    }

    public Coupon getCoupon() {
        return coupon;
    }

    public Bill coupon(Coupon coupon) {
        this.coupon = coupon;
        return this;
    }

    public void setCoupon(Coupon coupon) {
        this.coupon = coupon;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bill)) {
            return false;
        }
        return id != null && id.equals(((Bill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bill{" +
            "id=" + getId() +
            ", billid=" + getBillid() +
            ", date='" + getDate() + "'" +
            ", totalprice=" + getTotalprice() +
            ", couponid=" + getCouponid() +
            ", shipping='" + isShipping() + "'" +
            "}";
    }
}
