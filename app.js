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

  let selectedAmount = 5;

  // Amount button toggle
  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const val = btn.dataset.amount;
      if (val === 'other') {
        customWrap.classList.remove('hidden');
        customInput.focus();
        selectedAmount = parseInt(customInput.value) || 0;
      } else {
        customWrap.classList.add('hidden');
        selectedAmount = parseInt(val);
      }
    });
  });

  // Custom amount live meal counter
  customInput.addEventListener('input', () => {
    const val = parseInt(customInput.value) || 0;
    selectedAmount = val;
    if (val > 0) {
      const meals = Math.round(val * MEALS_PER_DOLLAR);
      customMeals.textContent = `$${val} = ${meals} meal${meals !== 1 ? 's' : ''}`;
    } else {
      customMeals.textContent = '';
    }
  });

  // Give Now → show payment panel
  giveNowBtn.addEventListener('click', () => {
    if (selectedAmount <= 0) {
      customInput.focus();
      return;
    }
    giveNowBtn.classList.add('hidden');
    paymentPanel.classList.remove('hidden');
  });

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
    completeBtn.textContent = 'Complete Donation';
    selectedAmount = 5;

    amountBtns.forEach(b => b.classList.remove('selected'));
    document.querySelector('[data-amount="5"]').classList.add('selected');
    customWrap.classList.add('hidden');
    customInput.value = '';
    customMeals.textContent = '';
  });
})();
