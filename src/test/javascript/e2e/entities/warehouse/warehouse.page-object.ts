import { element, by, ElementFinder } from 'protractor';

export class WarehouseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-warehouse div table .btn-danger'));
  title = element.all(by.css('jhi-warehouse div h2#page-heading span')).first();
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

export class WarehouseUpdatePage {
  pageTitle = element(by.id('jhi-warehouse-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  warehouseidInput = element(by.id('field_warehouseid'));
  foodidInput = element(by.id('field_foodid'));
  quantityInput = element(by.id('field_quantity'));
  dateInput = element(by.id('field_date'));

  foodSelect = element(by.id('field_food'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setWarehouseidInput(warehouseid: string): Promise<void> {
    await this.warehouseidInput.sendKeys(warehouseid);
  }

  async getWarehouseidInput(): Promise<string> {
    return await this.warehouseidInput.getAttribute('value');
  }

  async setFoodidInput(foodid: string): Promise<void> {
    await this.foodidInput.sendKeys(foodid);
  }

  async getFoodidInput(): Promise<string> {
    return await this.foodidInput.getAttribute('value');
  }

  async setQuantityInput(quantity: string): Promise<void> {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput(): Promise<string> {
    return await this.quantityInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async foodSelectLastOption(): Promise<void> {
    await this.foodSelect.all(by.tagName('option')).last().click();
  }

  async foodSelectOption(option: string): Promise<void> {
    await this.foodSelect.sendKeys(option);
  }

  getFoodSelect(): ElementFinder {
    return this.foodSelect;
  }

  async getFoodSelectedOption(): Promise<string> {
    return await this.foodSelect.element(by.css('option:checked')).getText();
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

export class WarehouseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-warehouse-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-warehouse'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
