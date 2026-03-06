(() => {
  const MEALS_PER_DOLLAR = 1.6;

  // Elements
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customWrap = document.getElementById('custom-amount');
  const customInput = document.getElementById('custom-input');
  const customMeals = document.getElementById('custom-meals');
  const giveNowBtn = document.getElementById('give-now-btn');
  const paymentPanel = document.getElementById('payment-panel');
  const completeBtn = document.getElementById('complete-btn');
  const successPanel = document.getElementById('success-panel');
  const successMeals = document.getElementById('success-meals');
  const shareBtn = document.getElementById('share-btn');
  const giveAgainBtn = document.getElementById('give-again-btn');
  const coverFeesCheckbox = document.getElementById('cover-fees-checkbox');
  const shareCheckbox = document.getElementById('share-checkbox');
  const subtotalEl = document.getElementById('subtotal');
  const additionalTotalEl = document.getElementById('additional-total');
  const totalAmountEl = document.getElementById('total-amount');

  let selectedAmount = 5;

  // Update totals for PayPal checkout
  function updateCheckoutTotals() {
    let additional = 0;
    if (coverFeesCheckbox.checked) additional += 0.05;
    if (shareCheckbox.checked) additional += 3.00;

    subtotalEl.textContent = `$${selectedAmount.toFixed(2)}`;
    additionalTotalEl.textContent = `$${additional.toFixed(2)}`;
    totalAmountEl.textContent = `$${(selectedAmount + additional).toFixed(2)}`;
  }

  // Amount button toggle
  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const val = btn.dataset.amount;
      if (val === 'other') {
        customWrap.classList.remove('hidden');
        customInput.focus();
        selectedAmount = parseFloat(customInput.value) || 0;
      } else {
        customWrap.classList.add('hidden');
        selectedAmount = parseFloat(val);
      }
      if (!paymentPanel.classList.contains('hidden')) updateCheckoutTotals();
    });
  });

  // Custom amount live meal counter
  customInput.addEventListener('input', () => {
    const val = parseFloat(customInput.value) || 0;
    selectedAmount = val;
    if (val > 0) {
      const meals = Math.round(val * MEALS_PER_DOLLAR);
      customMeals.textContent = `$${val.toFixed(2)} = ${meals} meal${meals !== 1 ? 's' : ''}`;
    } else {
      customMeals.textContent = '';
    }
    if (!paymentPanel.classList.contains('hidden')) updateCheckoutTotals();
  });

  // Give Now → show payment panel
  giveNowBtn.addEventListener('click', () => {
    if (selectedAmount <= 0) {
      customInput.focus();
      return;
    }
    giveNowBtn.classList.add('hidden');
    paymentPanel.classList.remove('hidden');
    updateCheckoutTotals();
  });

  // Checkbox listeners for PayPal options
  coverFeesCheckbox.addEventListener('change', updateCheckoutTotals);
  shareCheckbox.addEventListener('change', updateCheckoutTotals);

  // Complete Donation → mock processing
  completeBtn.addEventListener('click', () => {
    completeBtn.disabled = true;
    completeBtn.innerHTML = '<span class="spinner"></span>';

    setTimeout(() => {
      paymentPanel.classList.add('hidden');

      const meals = Math.round(selectedAmount * MEALS_PER_DOLLAR);
      successMeals.textContent = `${meals} meal${meals !== 1 ? 's' : ''}`;

      successPanel.classList.remove('hidden');
      document.getElementById('amount-buttons').classList.add('hidden');
      customWrap.classList.add('hidden');
    }, 1500);
  });

  // Copy link
  shareBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      shareBtn.textContent = 'Copied!';
      setTimeout(() => { shareBtn.textContent = 'Copy Link'; }, 2000);
    });
  });

  // Give Again → reset
  giveAgainBtn.addEventListener('click', () => {
    successPanel.classList.add('hidden');
    document.getElementById('amount-buttons').classList.remove('hidden');
    giveNowBtn.classList.remove('hidden');
    completeBtn.disabled = false;
    completeBtn.textContent = 'Continue to PayPal';
    selectedAmount = 5;

    amountBtns.forEach(b => b.classList.remove('selected'));
    document.querySelector('[data-amount="5"]').classList.add('selected');
    customWrap.classList.add('hidden');
    customInput.value = '';
    customMeals.textContent = '';

    // Reset checkboxes
    coverFeesCheckbox.checked = false;
    shareCheckbox.checked = false;
  });
})();
