package com.foodapp.web.rest;

import com.foodapp.FoodApp;
import com.foodapp.domain.Coupon;
import com.foodapp.repository.CouponRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CouponResource} REST controller.
 */
@SpringBootTest(classes = FoodApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CouponResourceIT {

    private static final Integer DEFAULT_COUPONID = 1;
    private static final Integer UPDATED_COUPONID = 2;

    private static final String DEFAULT_COUPONNAME = "AAAAAAAAAA";
    private static final String UPDATED_COUPONNAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_COUPON = 1;
    private static final Integer UPDATED_COUPON = 2;

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCouponMockMvc;

    private Coupon coupon;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Coupon createEntity(EntityManager em) {
        Coupon coupon = new Coupon()
            .couponid(DEFAULT_COUPONID)
            .couponname(DEFAULT_COUPONNAME)
            .coupon(DEFAULT_COUPON)
            .type(DEFAULT_TYPE);
        return coupon;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Coupon createUpdatedEntity(EntityManager em) {
        Coupon coupon = new Coupon()
            .couponid(UPDATED_COUPONID)
            .couponname(UPDATED_COUPONNAME)
            .coupon(UPDATED_COUPON)
            .type(UPDATED_TYPE);
        return coupon;
    }

    @BeforeEach
    public void initTest() {
        coupon = createEntity(em);
    }

    @Test
    @Transactional
    public void createCoupon() throws Exception {
        int databaseSizeBeforeCreate = couponRepository.findAll().size();
        // Create the Coupon
        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coupon)))
            .andExpect(status().isCreated());

        // Validate the Coupon in the database
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeCreate + 1);
        Coupon testCoupon = couponList.get(couponList.size() - 1);
        assertThat(testCoupon.getCouponid()).isEqualTo(DEFAULT_COUPONID);
        assertThat(testCoupon.getCouponname()).isEqualTo(DEFAULT_COUPONNAME);
        assertThat(testCoupon.getCoupon()).isEqualTo(DEFAULT_COUPON);
        assertThat(testCoupon.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createCouponWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = couponRepository.findAll().size();

        // Create the Coupon with an existing ID
        coupon.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coupon)))
            .andExpect(status().isBadRequest());

        // Validate the Coupon in the database
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCoupons() throws Exception {
        // Initialize the database
        couponRepository.saveAndFlush(coupon);

        // Get all the couponList
        restCouponMockMvc.perform(get("/api/coupons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coupon.getId().intValue())))
            .andExpect(jsonPath("$.[*].couponid").value(hasItem(DEFAULT_COUPONID)))
            .andExpect(jsonPath("$.[*].couponname").value(hasItem(DEFAULT_COUPONNAME)))
            .andExpect(jsonPath("$.[*].coupon").value(hasItem(DEFAULT_COUPON)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getCoupon() throws Exception {
        // Initialize the database
        couponRepository.saveAndFlush(coupon);

        // Get the coupon
        restCouponMockMvc.perform(get("/api/coupons/{id}", coupon.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(coupon.getId().intValue()))
            .andExpect(jsonPath("$.couponid").value(DEFAULT_COUPONID))
            .andExpect(jsonPath("$.couponname").value(DEFAULT_COUPONNAME))
            .andExpect(jsonPath("$.coupon").value(DEFAULT_COUPON))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }
    @Test
    @Transactional
    public void getNonExistingCoupon() throws Exception {
        // Get the coupon
        restCouponMockMvc.perform(get("/api/coupons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoupon() throws Exception {
        // Initialize the database
        couponRepository.saveAndFlush(coupon);

        int databaseSizeBeforeUpdate = couponRepository.findAll().size();

        // Update the coupon
        Coupon updatedCoupon = couponRepository.findById(coupon.getId()).get();
        // Disconnect from session so that the updates on updatedCoupon are not directly saved in db
        em.detach(updatedCoupon);
        updatedCoupon
            .couponid(UPDATED_COUPONID)
            .couponname(UPDATED_COUPONNAME)
            .coupon(UPDATED_COUPON)
            .type(UPDATED_TYPE);

        restCouponMockMvc.perform(put("/api/coupons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCoupon)))
            .andExpect(status().isOk());

        // Validate the Coupon in the database
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeUpdate);
        Coupon testCoupon = couponList.get(couponList.size() - 1);
        assertThat(testCoupon.getCouponid()).isEqualTo(UPDATED_COUPONID);
        assertThat(testCoupon.getCouponname()).isEqualTo(UPDATED_COUPONNAME);
        assertThat(testCoupon.getCoupon()).isEqualTo(UPDATED_COUPON);
        assertThat(testCoupon.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCoupon() throws Exception {
        int databaseSizeBeforeUpdate = couponRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCouponMockMvc.perform(put("/api/coupons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coupon)))
            .andExpect(status().isBadRequest());

        // Validate the Coupon in the database
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCoupon() throws Exception {
        // Initialize the database
        couponRepository.saveAndFlush(coupon);

        int databaseSizeBeforeDelete = couponRepository.findAll().size();

        // Delete the coupon
        restCouponMockMvc.perform(delete("/api/coupons/{id}", coupon.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
