import { element, by, ElementFinder } from 'protractor';

export class BillComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bill div table .btn-danger'));
  title = element.all(by.css('jhi-bill div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class BillUpdatePage {
  pageTitle = element(by.id('jhi-bill-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  billidInput = element(by.id('field_billid'));
  dateInput = element(by.id('field_date'));
  totalpriceInput = element(by.id('field_totalprice'));
  couponidInput = element(by.id('field_couponid'));
  shippingInput = element(by.id('field_shipping'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setBillidInput(billid: string): Promise<void> {
    await this.billidInput.sendKeys(billid);
  }

  async getBillidInput(): Promise<string> {
    return await this.billidInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setTotalpriceInput(totalprice: string): Promise<void> {
    await this.totalpriceInput.sendKeys(totalprice);
  }

  async getTotalpriceInput(): Promise<string> {
    return await this.totalpriceInput.getAttribute('value');
  }

  async setCouponidInput(couponid: string): Promise<void> {
    await this.couponidInput.sendKeys(couponid);
  }

  async getCouponidInput(): Promise<string> {
    return await this.couponidInput.getAttribute('value');
  }

  getShippingInput(): ElementFinder {
    return this.shippingInput;
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class BillDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bill-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bill'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
