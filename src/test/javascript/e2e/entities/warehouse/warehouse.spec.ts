import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WarehouseComponentsPage, WarehouseDeleteDialog, WarehouseUpdatePage } from './warehouse.page-object';

const expect = chai.expect;

describe('Warehouse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let warehouseComponentsPage: WarehouseComponentsPage;
  let warehouseUpdatePage: WarehouseUpdatePage;
  let warehouseDeleteDialog: WarehouseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Warehouses', async () => {
    await navBarPage.goToEntity('warehouse');
    warehouseComponentsPage = new WarehouseComponentsPage();
    await browser.wait(ec.visibilityOf(warehouseComponentsPage.title), 5000);
    expect(await warehouseComponentsPage.getTitle()).to.eq('foodApp.warehouse.home.title');
    await browser.wait(ec.or(ec.visibilityOf(warehouseComponentsPage.entities), ec.visibilityOf(warehouseComponentsPage.noResult)), 1000);
  });

  it('should load create Warehouse page', async () => {
    await warehouseComponentsPage.clickOnCreateButton();
    warehouseUpdatePage = new WarehouseUpdatePage();
    expect(await warehouseUpdatePage.getPageTitle()).to.eq('foodApp.warehouse.home.createOrEditLabel');
    await warehouseUpdatePage.cancel();
  });

  it('should create and save Warehouses', async () => {
    const nbButtonsBeforeCreate = await warehouseComponentsPage.countDeleteButtons();

    await warehouseComponentsPage.clickOnCreateButton();

    await promise.all([
      warehouseUpdatePage.setWarehouseidInput('5'),
      warehouseUpdatePage.setFoodidInput('5'),
      warehouseUpdatePage.setQuantityInput('5'),
      warehouseUpdatePage.setDateInput('2000-12-31'),
      warehouseUpdatePage.foodSelectLastOption(),
    ]);

    expect(await warehouseUpdatePage.getWarehouseidInput()).to.eq('5', 'Expected warehouseid value to be equals to 5');
    expect(await warehouseUpdatePage.getFoodidInput()).to.eq('5', 'Expected foodid value to be equals to 5');
    expect(await warehouseUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');
    expect(await warehouseUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');

    await warehouseUpdatePage.save();
    expect(await warehouseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await warehouseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Warehouse', async () => {
    const nbButtonsBeforeDelete = await warehouseComponentsPage.countDeleteButtons();
    await warehouseComponentsPage.clickOnLastDeleteButton();

    warehouseDeleteDialog = new WarehouseDeleteDialog();
    expect(await warehouseDeleteDialog.getDialogTitle()).to.eq('foodApp.warehouse.delete.question');
    await warehouseDeleteDialog.clickOnConfirmButton();

    expect(await warehouseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
