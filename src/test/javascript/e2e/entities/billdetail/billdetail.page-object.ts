import { element, by, ElementFinder } from 'protractor';

export class BilldetailComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-billdetail div table .btn-danger'));
  title = element.all(by.css('jhi-billdetail div h2#page-heading span')).first();
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

export class BilldetailUpdatePage {
  pageTitle = element(by.id('jhi-billdetail-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  billdetailidInput = element(by.id('field_billdetailid'));
  foodidInput = element(by.id('field_foodid'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setBilldetailidInput(billdetailid: string): Promise<void> {
    await this.billdetailidInput.sendKeys(billdetailid);
  }

  async getBilldetailidInput(): Promise<string> {
    return await this.billdetailidInput.getAttribute('value');
  }

  async setFoodidInput(foodid: string): Promise<void> {
    await this.foodidInput.sendKeys(foodid);
  }

  async getFoodidInput(): Promise<string> {
    return await this.foodidInput.getAttribute('value');
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

export class BilldetailDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-billdetail-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-billdetail'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
