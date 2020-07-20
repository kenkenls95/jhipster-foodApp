package com.foodapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.foodapp.web.rest.TestUtil;

public class BilldetailTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Billdetail.class);
        Billdetail billdetail1 = new Billdetail();
        billdetail1.setId(1L);
        Billdetail billdetail2 = new Billdetail();
        billdetail2.setId(billdetail1.getId());
        assertThat(billdetail1).isEqualTo(billdetail2);
        billdetail2.setId(2L);
        assertThat(billdetail1).isNotEqualTo(billdetail2);
        billdetail1.setId(null);
        assertThat(billdetail1).isNotEqualTo(billdetail2);
    }
}
