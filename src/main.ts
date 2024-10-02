import './style.css'

const calcBtn = document.querySelector('#calcBtn') as HTMLInputElement;
const resultVAT = document.querySelector('#resultVAT') as HTMLElement;
const resultGross = document.querySelector('#resultGross') as HTMLElement;

let isToNetto: boolean = false;
let rate: number = 0.19;

const calcTaxResult = (): void => {
  const amountInput = document.querySelector('#amount') as HTMLInputElement;

  let amount: number
  if (amountInput) {
    amount = parseFloat(amountInput.value.replace(',', '.'));

    let vat: number;
    let gross: number;

    if (!isToNetto) {
      gross = amount * (1 + rate);
      vat = gross - amount;
    } else {
      gross = (amount / (1 + rate));
      vat = amount - gross;
    }

    console.log({ amount, rate, vat, gross });
    if (resultGross && resultVAT) {
      resultVAT.textContent = vat.toFixed(2) + " €";
      resultGross.textContent = gross.toFixed(2) + " €";
    }
  }
}

const radioBtnList = document.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLElement>;

if (radioBtnList.length > 0) {
  for (let i = 0; i < radioBtnList.length; i++) {
    radioBtnList[i].addEventListener('click', () => {

      const amountLabel = document.querySelector('#amountLabel ') as HTMLElement;
      const rateInput = document.querySelector('#rate7') as HTMLInputElement;
      const taxDirection = document.querySelector('#brutto2netto') as HTMLInputElement;

      if (taxDirection && !taxDirection.checked) {
        isToNetto = false;
        amountLabel.textContent = "Nettobetrag (Preis ohne Mehrwertsteuer) in Euro";
      } else {
        isToNetto = true;
        amountLabel.textContent = "Bruttobetrag (Preis inklusive Mehrwertsteuer) in Euro";
      }

      rate = (rateInput && rateInput.checked) ? 0.07 : 0.19;

      console.log({ taxDirection, isToNetto, rate });

      resultVAT.textContent = "€";
      resultGross.textContent = "€";
    });
  }
}

if (calcBtn) {
  calcBtn.addEventListener('click', e => {
    e.preventDefault();
    calcTaxResult();
  })
}

