import { element, by, ElementFinder } from 'protractor';

export class FoodComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-food div table .btn-danger'));
  title = element.all(by.css('jhi-food div h2#page-heading span')).first();
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

export class FoodUpdatePage {
  pageTitle = element(by.id('jhi-food-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  foodidInput = element(by.id('field_foodid'));
  categoryidInput = element(by.id('field_categoryid'));
  foodnameInput = element(by.id('field_foodname'));
  descriptionInput = element(by.id('field_description'));
  priceInput = element(by.id('field_price'));

  billdetailSelect = element(by.id('field_billdetail'));
  categorySelect = element(by.id('field_category'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFoodidInput(foodid: string): Promise<void> {
    await this.foodidInput.sendKeys(foodid);
  }

  async getFoodidInput(): Promise<string> {
    return await this.foodidInput.getAttribute('value');
  }

  async setCategoryidInput(categoryid: string): Promise<void> {
    await this.categoryidInput.sendKeys(categoryid);
  }

  async getCategoryidInput(): Promise<string> {
    return await this.categoryidInput.getAttribute('value');
  }

  async setFoodnameInput(foodname: string): Promise<void> {
    await this.foodnameInput.sendKeys(foodname);
  }

  async getFoodnameInput(): Promise<string> {
    return await this.foodnameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setPriceInput(price: string): Promise<void> {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput(): Promise<string> {
    return await this.priceInput.getAttribute('value');
  }

  async billdetailSelectLastOption(): Promise<void> {
    await this.billdetailSelect.all(by.tagName('option')).last().click();
  }

  async billdetailSelectOption(option: string): Promise<void> {
    await this.billdetailSelect.sendKeys(option);
  }

  getBilldetailSelect(): ElementFinder {
    return this.billdetailSelect;
  }

  async getBilldetailSelectedOption(): Promise<string> {
    return await this.billdetailSelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption(): Promise<void> {
    await this.categorySelect.all(by.tagName('option')).last().click();
  }

  async categorySelectOption(option: string): Promise<void> {
    await this.categorySelect.sendKeys(option);
  }

  getCategorySelect(): ElementFinder {
    return this.categorySelect;
  }

  async getCategorySelectedOption(): Promise<string> {
    return await this.categorySelect.element(by.css('option:checked')).getText();
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

export class FoodDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-food-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-food'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
