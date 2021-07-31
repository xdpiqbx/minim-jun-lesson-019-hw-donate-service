import { settings as set } from "../core/constants/settings";
import { getFormattedTime as normalizeDateTime } from "../core/utils";

export default class DonateForm {
  #form;
  #h1;
  #label;
  #input;
  #button;
  #totalAmount;
  #createNewDonate;

  constructor(totalAmount, createNewDonate) {
    this.#form = document.createElement("form");
    this.#h1 = document.createElement("h1");
    this.#label = document.createElement("label");
    this.#input = document.createElement("input");
    this.#button = document.createElement("button");
    this.#totalAmount = totalAmount;
    this.#createNewDonate = createNewDonate;
  }

  #setAttributesForElements() {
    this.#form.className = "donate-form";
    this.#h1.id = "total-amount";
    this.#label.className = "donate-form__input-label";

    this.#input.className = "donate-form__donate-input";
    this.#input.name = "amount";
    this.#input.type = "number";
    this.#input.max = "100";
    this.#input.min = "0";
    this.#input.required = " ";

    this.#button.className = "donate-form__submit-button";
    this.#button.type = "submit";
  }

  #setDataToHTML() {
    this.#h1.textContent = `${this.#totalAmount} ${set.currency}`;
    this.#label.textContent = `Введите сумму в ${set.currency}`;
    this.#button.textContent = "Задонатить";
  }

  #makeHTMLStructure() {
    this.#label.append(this.#input);
    this.#form.append(this.#h1, this.#label, this.#button);
  }

  #addEventListeners() {
    this.#form.addEventListener("submit", (event) => {
      event.preventDefault();
      const { target } = event;
      const amount = parseInt(target.amount.value);
      const date = normalizeDateTime(new Date());
      this.#createNewDonate({ amount, date });
      this.#input.value = "";
    });
  }

  updateTotalAmount(newAmount) {
    this.#h1.textContent = `${newAmount}${set.currency}`;
  }

  render() {
    this.#setAttributesForElements();
    this.#setDataToHTML();
    this.#makeHTMLStructure();
    this.#addEventListeners();
    return this.#form;
  }
}
