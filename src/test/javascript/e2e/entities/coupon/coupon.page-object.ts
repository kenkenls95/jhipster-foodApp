import { element, by, ElementFinder } from 'protractor';

export class CouponComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-coupon div table .btn-danger'));
  title = element.all(by.css('jhi-coupon div h2#page-heading span')).first();
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

export class CouponUpdatePage {
  pageTitle = element(by.id('jhi-coupon-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  couponidInput = element(by.id('field_couponid'));
  couponnameInput = element(by.id('field_couponname'));
  couponInput = element(by.id('field_coupon'));
  typeInput = element(by.id('field_type'));

  billSelect = element(by.id('field_bill'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCouponidInput(couponid: string): Promise<void> {
    await this.couponidInput.sendKeys(couponid);
  }

  async getCouponidInput(): Promise<string> {
    return await this.couponidInput.getAttribute('value');
  }

  async setCouponnameInput(couponname: string): Promise<void> {
    await this.couponnameInput.sendKeys(couponname);
  }

  async getCouponnameInput(): Promise<string> {
    return await this.couponnameInput.getAttribute('value');
  }

  async setCouponInput(coupon: string): Promise<void> {
    await this.couponInput.sendKeys(coupon);
  }

  async getCouponInput(): Promise<string> {
    return await this.couponInput.getAttribute('value');
  }

  async setTypeInput(type: string): Promise<void> {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput(): Promise<string> {
    return await this.typeInput.getAttribute('value');
  }

  async billSelectLastOption(): Promise<void> {
    await this.billSelect.all(by.tagName('option')).last().click();
  }

  async billSelectOption(option: string): Promise<void> {
    await this.billSelect.sendKeys(option);
  }

  getBillSelect(): ElementFinder {
    return this.billSelect;
  }

  async getBillSelectedOption(): Promise<string> {
    return await this.billSelect.element(by.css('option:checked')).getText();
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

export class CouponDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-coupon-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-coupon'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
