package com.foodapp.repository;

import com.foodapp.domain.Billdetail;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Billdetail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BilldetailRepository extends JpaRepository<Billdetail, Long> {
}
