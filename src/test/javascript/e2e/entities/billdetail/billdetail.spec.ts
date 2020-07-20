import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BilldetailComponentsPage, BilldetailDeleteDialog, BilldetailUpdatePage } from './billdetail.page-object';

const expect = chai.expect;

describe('Billdetail e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let billdetailComponentsPage: BilldetailComponentsPage;
  let billdetailUpdatePage: BilldetailUpdatePage;
  let billdetailDeleteDialog: BilldetailDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Billdetails', async () => {
    await navBarPage.goToEntity('billdetail');
    billdetailComponentsPage = new BilldetailComponentsPage();
    await browser.wait(ec.visibilityOf(billdetailComponentsPage.title), 5000);
    expect(await billdetailComponentsPage.getTitle()).to.eq('foodApp.billdetail.home.title');
    await browser.wait(ec.or(ec.visibilityOf(billdetailComponentsPage.entities), ec.visibilityOf(billdetailComponentsPage.noResult)), 1000);
  });

  it('should load create Billdetail page', async () => {
    await billdetailComponentsPage.clickOnCreateButton();
    billdetailUpdatePage = new BilldetailUpdatePage();
    expect(await billdetailUpdatePage.getPageTitle()).to.eq('foodApp.billdetail.home.createOrEditLabel');
    await billdetailUpdatePage.cancel();
  });

  it('should create and save Billdetails', async () => {
    const nbButtonsBeforeCreate = await billdetailComponentsPage.countDeleteButtons();

    await billdetailComponentsPage.clickOnCreateButton();

    await promise.all([billdetailUpdatePage.setBilldetailidInput('5'), billdetailUpdatePage.setFoodidInput('5')]);

    expect(await billdetailUpdatePage.getBilldetailidInput()).to.eq('5', 'Expected billdetailid value to be equals to 5');
    expect(await billdetailUpdatePage.getFoodidInput()).to.eq('5', 'Expected foodid value to be equals to 5');

    await billdetailUpdatePage.save();
    expect(await billdetailUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await billdetailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Billdetail', async () => {
    const nbButtonsBeforeDelete = await billdetailComponentsPage.countDeleteButtons();
    await billdetailComponentsPage.clickOnLastDeleteButton();

    billdetailDeleteDialog = new BilldetailDeleteDialog();
    expect(await billdetailDeleteDialog.getDialogTitle()).to.eq('foodApp.billdetail.delete.question');
    await billdetailDeleteDialog.clickOnConfirmButton();

    expect(await billdetailComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
