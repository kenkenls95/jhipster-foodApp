package com.foodapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "categoryid")
    private Integer categoryid;

    @Column(name = "categoryname")
    private String categoryname;

    @ManyToMany(mappedBy = "categories")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Food> foods = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCategoryid() {
        return categoryid;
    }

    public Category categoryid(Integer categoryid) {
        this.categoryid = categoryid;
        return this;
    }

    public void setCategoryid(Integer categoryid) {
        this.categoryid = categoryid;
    }

    public String getCategoryname() {
        return categoryname;
    }

    public Category categoryname(String categoryname) {
        this.categoryname = categoryname;
        return this;
    }

    public void setCategoryname(String categoryname) {
        this.categoryname = categoryname;
    }

    public Set<Food> getFoods() {
        return foods;
    }

    public Category foods(Set<Food> foods) {
        this.foods = foods;
        return this;
    }

    public Category addFood(Food food) {
        this.foods.add(food);
        food.getCategories().add(this);
        return this;
    }

    public Category removeFood(Food food) {
        this.foods.remove(food);
        food.getCategories().remove(this);
        return this;
    }

    public void setFoods(Set<Food> foods) {
        this.foods = foods;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", categoryid=" + getCategoryid() +
            ", categoryname='" + getCategoryname() + "'" +
            "}";
    }
}
