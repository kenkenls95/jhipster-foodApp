import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FoodComponentsPage, FoodDeleteDialog, FoodUpdatePage } from './food.page-object';

const expect = chai.expect;

describe('Food e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let foodComponentsPage: FoodComponentsPage;
  let foodUpdatePage: FoodUpdatePage;
  let foodDeleteDialog: FoodDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Foods', async () => {
    await navBarPage.goToEntity('food');
    foodComponentsPage = new FoodComponentsPage();
    await browser.wait(ec.visibilityOf(foodComponentsPage.title), 5000);
    expect(await foodComponentsPage.getTitle()).to.eq('foodApp.food.home.title');
    await browser.wait(ec.or(ec.visibilityOf(foodComponentsPage.entities), ec.visibilityOf(foodComponentsPage.noResult)), 1000);
  });

  it('should load create Food page', async () => {
    await foodComponentsPage.clickOnCreateButton();
    foodUpdatePage = new FoodUpdatePage();
    expect(await foodUpdatePage.getPageTitle()).to.eq('foodApp.food.home.createOrEditLabel');
    await foodUpdatePage.cancel();
  });

  it('should create and save Foods', async () => {
    const nbButtonsBeforeCreate = await foodComponentsPage.countDeleteButtons();

    await foodComponentsPage.clickOnCreateButton();

    await promise.all([
      foodUpdatePage.setFoodidInput('5'),
      foodUpdatePage.setCategoryidInput('5'),
      foodUpdatePage.setFoodnameInput('foodname'),
      foodUpdatePage.setDescriptionInput('description'),
      foodUpdatePage.setPriceInput('5'),
      foodUpdatePage.billdetailSelectLastOption(),
      // foodUpdatePage.categorySelectLastOption(),
    ]);

    expect(await foodUpdatePage.getFoodidInput()).to.eq('5', 'Expected foodid value to be equals to 5');
    expect(await foodUpdatePage.getCategoryidInput()).to.eq('5', 'Expected categoryid value to be equals to 5');
    expect(await foodUpdatePage.getFoodnameInput()).to.eq('foodname', 'Expected Foodname value to be equals to foodname');
    expect(await foodUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await foodUpdatePage.getPriceInput()).to.eq('5', 'Expected price value to be equals to 5');

    await foodUpdatePage.save();
    expect(await foodUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await foodComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Food', async () => {
    const nbButtonsBeforeDelete = await foodComponentsPage.countDeleteButtons();
    await foodComponentsPage.clickOnLastDeleteButton();

    foodDeleteDialog = new FoodDeleteDialog();
    expect(await foodDeleteDialog.getDialogTitle()).to.eq('foodApp.food.delete.question');
    await foodDeleteDialog.clickOnConfirmButton();

    expect(await foodComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
