package com.foodapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Billdetail.
 */
@Entity
@Table(name = "billdetail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Billdetail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "billdetailid")
    private Integer billdetailid;

    @Column(name = "foodid")
    private Integer foodid;

    @OneToOne(mappedBy = "billdetail")
    @JsonIgnore
    private Food food;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBilldetailid() {
        return billdetailid;
    }

    public Billdetail billdetailid(Integer billdetailid) {
        this.billdetailid = billdetailid;
        return this;
    }

    public void setBilldetailid(Integer billdetailid) {
        this.billdetailid = billdetailid;
    }

    public Integer getFoodid() {
        return foodid;
    }

    public Billdetail foodid(Integer foodid) {
        this.foodid = foodid;
        return this;
    }

    public void setFoodid(Integer foodid) {
        this.foodid = foodid;
    }

    public Food getFood() {
        return food;
    }

    public Billdetail food(Food food) {
        this.food = food;
        return this;
    }

    public void setFood(Food food) {
        this.food = food;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Billdetail)) {
            return false;
        }
        return id != null && id.equals(((Billdetail) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Billdetail{" +
            "id=" + getId() +
            ", billdetailid=" + getBilldetailid() +
            ", foodid=" + getFoodid() +
            "}";
    }
}
