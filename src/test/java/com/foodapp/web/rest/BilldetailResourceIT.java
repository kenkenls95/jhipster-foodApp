package com.foodapp.web.rest;

import com.foodapp.FoodApp;
import com.foodapp.domain.Billdetail;
import com.foodapp.repository.BilldetailRepository;

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
 * Integration tests for the {@link BilldetailResource} REST controller.
 */
@SpringBootTest(classes = FoodApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BilldetailResourceIT {

    private static final Integer DEFAULT_BILLDETAILID = 1;
    private static final Integer UPDATED_BILLDETAILID = 2;

    private static final Integer DEFAULT_FOODID = 1;
    private static final Integer UPDATED_FOODID = 2;

    @Autowired
    private BilldetailRepository billdetailRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBilldetailMockMvc;

    private Billdetail billdetail;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Billdetail createEntity(EntityManager em) {
        Billdetail billdetail = new Billdetail()
            .billdetailid(DEFAULT_BILLDETAILID)
            .foodid(DEFAULT_FOODID);
        return billdetail;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Billdetail createUpdatedEntity(EntityManager em) {
        Billdetail billdetail = new Billdetail()
            .billdetailid(UPDATED_BILLDETAILID)
            .foodid(UPDATED_FOODID);
        return billdetail;
    }

    @BeforeEach
    public void initTest() {
        billdetail = createEntity(em);
    }

    @Test
    @Transactional
    public void createBilldetail() throws Exception {
        int databaseSizeBeforeCreate = billdetailRepository.findAll().size();
        // Create the Billdetail
        restBilldetailMockMvc.perform(post("/api/billdetails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(billdetail)))
            .andExpect(status().isCreated());

        // Validate the Billdetail in the database
        List<Billdetail> billdetailList = billdetailRepository.findAll();
        assertThat(billdetailList).hasSize(databaseSizeBeforeCreate + 1);
        Billdetail testBilldetail = billdetailList.get(billdetailList.size() - 1);
        assertThat(testBilldetail.getBilldetailid()).isEqualTo(DEFAULT_BILLDETAILID);
        assertThat(testBilldetail.getFoodid()).isEqualTo(DEFAULT_FOODID);
    }

    @Test
    @Transactional
    public void createBilldetailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = billdetailRepository.findAll().size();

        // Create the Billdetail with an existing ID
        billdetail.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBilldetailMockMvc.perform(post("/api/billdetails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(billdetail)))
            .andExpect(status().isBadRequest());

        // Validate the Billdetail in the database
        List<Billdetail> billdetailList = billdetailRepository.findAll();
        assertThat(billdetailList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBilldetails() throws Exception {
        // Initialize the database
        billdetailRepository.saveAndFlush(billdetail);

        // Get all the billdetailList
        restBilldetailMockMvc.perform(get("/api/billdetails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(billdetail.getId().intValue())))
            .andExpect(jsonPath("$.[*].billdetailid").value(hasItem(DEFAULT_BILLDETAILID)))
            .andExpect(jsonPath("$.[*].foodid").value(hasItem(DEFAULT_FOODID)));
    }
    
    @Test
    @Transactional
    public void getBilldetail() throws Exception {
        // Initialize the database
        billdetailRepository.saveAndFlush(billdetail);

        // Get the billdetail
        restBilldetailMockMvc.perform(get("/api/billdetails/{id}", billdetail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(billdetail.getId().intValue()))
            .andExpect(jsonPath("$.billdetailid").value(DEFAULT_BILLDETAILID))
            .andExpect(jsonPath("$.foodid").value(DEFAULT_FOODID));
    }
    @Test
    @Transactional
    public void getNonExistingBilldetail() throws Exception {
        // Get the billdetail
        restBilldetailMockMvc.perform(get("/api/billdetails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBilldetail() throws Exception {
        // Initialize the database
        billdetailRepository.saveAndFlush(billdetail);

        int databaseSizeBeforeUpdate = billdetailRepository.findAll().size();

        // Update the billdetail
        Billdetail updatedBilldetail = billdetailRepository.findById(billdetail.getId()).get();
        // Disconnect from session so that the updates on updatedBilldetail are not directly saved in db
        em.detach(updatedBilldetail);
        updatedBilldetail
            .billdetailid(UPDATED_BILLDETAILID)
            .foodid(UPDATED_FOODID);

        restBilldetailMockMvc.perform(put("/api/billdetails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBilldetail)))
            .andExpect(status().isOk());

        // Validate the Billdetail in the database
        List<Billdetail> billdetailList = billdetailRepository.findAll();
        assertThat(billdetailList).hasSize(databaseSizeBeforeUpdate);
        Billdetail testBilldetail = billdetailList.get(billdetailList.size() - 1);
        assertThat(testBilldetail.getBilldetailid()).isEqualTo(UPDATED_BILLDETAILID);
        assertThat(testBilldetail.getFoodid()).isEqualTo(UPDATED_FOODID);
    }

    @Test
    @Transactional
    public void updateNonExistingBilldetail() throws Exception {
        int databaseSizeBeforeUpdate = billdetailRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBilldetailMockMvc.perform(put("/api/billdetails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(billdetail)))
            .andExpect(status().isBadRequest());

        // Validate the Billdetail in the database
        List<Billdetail> billdetailList = billdetailRepository.findAll();
        assertThat(billdetailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBilldetail() throws Exception {
        // Initialize the database
        billdetailRepository.saveAndFlush(billdetail);

        int databaseSizeBeforeDelete = billdetailRepository.findAll().size();

        // Delete the billdetail
        restBilldetailMockMvc.perform(delete("/api/billdetails/{id}", billdetail.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Billdetail> billdetailList = billdetailRepository.findAll();
        assertThat(billdetailList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
