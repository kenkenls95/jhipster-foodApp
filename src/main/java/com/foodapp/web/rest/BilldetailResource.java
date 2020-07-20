package com.foodapp.web.rest;

import com.foodapp.domain.Billdetail;
import com.foodapp.repository.BilldetailRepository;
import com.foodapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.foodapp.domain.Billdetail}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BilldetailResource {

    private final Logger log = LoggerFactory.getLogger(BilldetailResource.class);

    private static final String ENTITY_NAME = "billdetail";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BilldetailRepository billdetailRepository;

    public BilldetailResource(BilldetailRepository billdetailRepository) {
        this.billdetailRepository = billdetailRepository;
    }

    /**
     * {@code POST  /billdetails} : Create a new billdetail.
     *
     * @param billdetail the billdetail to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new billdetail, or with status {@code 400 (Bad Request)} if the billdetail has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/billdetails")
    public ResponseEntity<Billdetail> createBilldetail(@RequestBody Billdetail billdetail) throws URISyntaxException {
        log.debug("REST request to save Billdetail : {}", billdetail);
        if (billdetail.getId() != null) {
            throw new BadRequestAlertException("A new billdetail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Billdetail result = billdetailRepository.save(billdetail);
        return ResponseEntity.created(new URI("/api/billdetails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /billdetails} : Updates an existing billdetail.
     *
     * @param billdetail the billdetail to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated billdetail,
     * or with status {@code 400 (Bad Request)} if the billdetail is not valid,
     * or with status {@code 500 (Internal Server Error)} if the billdetail couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/billdetails")
    public ResponseEntity<Billdetail> updateBilldetail(@RequestBody Billdetail billdetail) throws URISyntaxException {
        log.debug("REST request to update Billdetail : {}", billdetail);
        if (billdetail.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Billdetail result = billdetailRepository.save(billdetail);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, billdetail.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /billdetails} : get all the billdetails.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of billdetails in body.
     */
    @GetMapping("/billdetails")
    public List<Billdetail> getAllBilldetails(@RequestParam(required = false) String filter) {
        if ("food-is-null".equals(filter)) {
            log.debug("REST request to get all Billdetails where food is null");
            return StreamSupport
                .stream(billdetailRepository.findAll().spliterator(), false)
                .filter(billdetail -> billdetail.getFood() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Billdetails");
        return billdetailRepository.findAll();
    }

    /**
     * {@code GET  /billdetails/:id} : get the "id" billdetail.
     *
     * @param id the id of the billdetail to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the billdetail, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/billdetails/{id}")
    public ResponseEntity<Billdetail> getBilldetail(@PathVariable Long id) {
        log.debug("REST request to get Billdetail : {}", id);
        Optional<Billdetail> billdetail = billdetailRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(billdetail);
    }

    /**
     * {@code DELETE  /billdetails/:id} : delete the "id" billdetail.
     *
     * @param id the id of the billdetail to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/billdetails/{id}")
    public ResponseEntity<Void> deleteBilldetail(@PathVariable Long id) {
        log.debug("REST request to delete Billdetail : {}", id);
        billdetailRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
