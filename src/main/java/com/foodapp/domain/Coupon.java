package com.foodapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Coupon.
 */
@Entity
@Table(name = "coupon")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Coupon implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "couponid")
    private Integer couponid;

    @Column(name = "couponname")
    private String couponname;

    @Column(name = "coupon")
    private Integer coupon;

    @Column(name = "type")
    private String type;

    @OneToOne
    @JoinColumn(unique = true)
    private Bill bill;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCouponid() {
        return couponid;
    }

    public Coupon couponid(Integer couponid) {
        this.couponid = couponid;
        return this;
    }

    public void setCouponid(Integer couponid) {
        this.couponid = couponid;
    }

    public String getCouponname() {
        return couponname;
    }

    public Coupon couponname(String couponname) {
        this.couponname = couponname;
        return this;
    }

    public void setCouponname(String couponname) {
        this.couponname = couponname;
    }

    public Integer getCoupon() {
        return coupon;
    }

    public Coupon coupon(Integer coupon) {
        this.coupon = coupon;
        return this;
    }

    public void setCoupon(Integer coupon) {
        this.coupon = coupon;
    }

    public String getType() {
        return type;
    }

    public Coupon type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Bill getBill() {
        return bill;
    }

    public Coupon bill(Bill bill) {
        this.bill = bill;
        return this;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Coupon)) {
            return false;
        }
        return id != null && id.equals(((Coupon) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Coupon{" +
            "id=" + getId() +
            ", couponid=" + getCouponid() +
            ", couponname='" + getCouponname() + "'" +
            ", coupon=" + getCoupon() +
            ", type='" + getType() + "'" +
            "}";
    }
}
