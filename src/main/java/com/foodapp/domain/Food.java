package com.foodapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A Food.
 */
@Entity
@Table(name = "food")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Food implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "foodid")
    private Integer foodid;

    @Column(name = "categoryid")
    private Integer categoryid;

    @Column(name = "foodname")
    private String foodname;

    @Column(name = "description")
    private String description;

    @Column(name = "price", precision = 21, scale = 2)
    private BigDecimal price;

    @OneToOne
    @JoinColumn(unique = true)
    private Billdetail billdetail;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "food_category",
               joinColumns = @JoinColumn(name = "food_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"))
    private Set<Category> categories = new HashSet<>();

    @OneToOne(mappedBy = "food")
    @JsonIgnore
    private Warehouse warehouse;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getFoodid() {
        return foodid;
    }

    public Food foodid(Integer foodid) {
        this.foodid = foodid;
        return this;
    }

    public void setFoodid(Integer foodid) {
        this.foodid = foodid;
    }

    public Integer getCategoryid() {
        return categoryid;
    }

    public Food categoryid(Integer categoryid) {
        this.categoryid = categoryid;
        return this;
    }

    public void setCategoryid(Integer categoryid) {
        this.categoryid = categoryid;
    }

    public String getFoodname() {
        return foodname;
    }

    public Food foodname(String foodname) {
        this.foodname = foodname;
        return this;
    }

    public void setFoodname(String foodname) {
        this.foodname = foodname;
    }

    public String getDescription() {
        return description;
    }

    public Food description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Food price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Billdetail getBilldetail() {
        return billdetail;
    }

    public Food billdetail(Billdetail billdetail) {
        this.billdetail = billdetail;
        return this;
    }

    public void setBilldetail(Billdetail billdetail) {
        this.billdetail = billdetail;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Food categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Food addCategory(Category category) {
        this.categories.add(category);
        category.getFoods().add(this);
        return this;
    }

    public Food removeCategory(Category category) {
        this.categories.remove(category);
        category.getFoods().remove(this);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public Food warehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
        return this;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Food)) {
            return false;
        }
        return id != null && id.equals(((Food) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Food{" +
            "id=" + getId() +
            ", foodid=" + getFoodid() +
            ", categoryid=" + getCategoryid() +
            ", foodname='" + getFoodname() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
