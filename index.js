'use strict';

const store = {
  subTotal: 0.00,
  tip: 0.00,
  total: 0.00,
  tipTotal: 0.00,
  mealCount: 0,
  avgTip: 0.00
};

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
    doTheStaticMaths(mealPrice, taxRate, tipPercentage);
  });
}

function doTheStaticMaths (mealPrice, taxRate, tipPercentage) {
  const newTaxRate = taxRate / 100;
  const newTipPercentage = tipPercentage / 100;
  store.subTotal = (mealPrice * 1) + (mealPrice * newTaxRate);
  store.tip = mealPrice * newTipPercentage;
  store.total = store.subTotal + store.tip;
  console.log(mealPrice * newTipPercentage);
  handleCharges();
}

function handleCharges () {
  console.log('handleCharges fn is running!');
  $('.right-side-charges').html(`
      <h2><i>Charges</i></h2>
      <p>Subtotal $${store.subTotal}</p>
      <p>Tip $${store.tip}</p>
      <p>Total $${store.total}</p>
    `);
}

function handleEarningsInfo () {

}

function renderPage() {
  watchForm();
}

$(renderPage);