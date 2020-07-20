package com.foodapp.repository;

import com.foodapp.domain.Food;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Food entity.
 */
@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    @Query(value = "select distinct food from Food food left join fetch food.categories",
        countQuery = "select count(distinct food) from Food food")
    Page<Food> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct food from Food food left join fetch food.categories")
    List<Food> findAllWithEagerRelationships();

    @Query("select food from Food food left join fetch food.categories where food.id =:id")
    Optional<Food> findOneWithEagerRelationships(@Param("id") Long id);
}
