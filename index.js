'use strict';

const store = {
  subTotal: 0.00,
  tip: 0.00,
  total: 0.00,
  tipTotal: 0.00,
  mealCount: 0,
  avgTip: 0.00
};

function watchResetButton() {
  $('.reset-button').on('click', event => {
    event.preventDefault();
    store.subTotal = 0;
    store.tip = 0;
    store.total = 0;
    store.tipTotal = 0;
    store.mealCount = 0;
    store.avgTip = 0;
    handleCharges();
    handleEarningsInfo();
  });
}

function watchCancelButton() {
  $('.cancel-button').on('click', event => {
    event.preventDefault();
    $('.meal-price-entry').val('');
    $('.tax-rate-entry').val('');
    $('.tip-percentage-entry').val('');
  });
}

function watchForm () {
  $('#meal-details-form').submit( event => {
    event.preventDefault();
    const mealPrice = $('.meal-price-entry').val();
    const taxRate = $('.tax-rate-entry').val();
    const tipPercentage = $('.tip-percentage-entry').val();
    $('.meal-price-entry').val('');
    $('.tax-rate-entry').val('');
    $('.tip-percentage-entry').val('');
    console.log(mealPrice);
    doTheChargesMath(mealPrice, taxRate, tipPercentage);
  });
}

function doTheChargesMath (mealPrice, taxRate, tipPercentage) {
  const newTaxRate = taxRate / 100;
  const newTipPercentage = tipPercentage / 100;
  store.subTotal = (mealPrice * 1) + (mealPrice * newTaxRate);
  store.tip = mealPrice * newTipPercentage;
  store.total = store.subTotal + store.tip;
  handleCharges();
  doTheEarningsMath();
}

function doTheEarningsMath () {
  store.tipTotal += store.tip;
  store.mealCount++;
  store.avgTip = (store.tipTotal / store.mealCount)
  handleEarningsInfo();
}

function handleCharges () {
  $('.right-side-charges').html(`
      <h2><i>Charges</i></h2>
      <p>Subtotal $${store.subTotal}</p>
      <p>Tip $${store.tip}</p>
      <p>Total $${store.total}</p>
    `);
}

function handleEarningsInfo () {
  $('.right-side-earnings').html(`
    <h2><i>Earnings Info</i></h2>
    <p>Tip Total: $${store.tipTotal}</p>
    <p>Meal Count: ${store.mealCount}</p>
    <p>Average Tip per Meal: $${store.avgTip}</p>
  `);
}

function renderPage() {
  watchForm();
  watchResetButton();
  watchCancelButton();
}

$(renderPage);