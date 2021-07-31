import DonateForm from "./donate-form";
import DonateList from "./donate-list";

import {
  calculateSumOfNumbers as numbSum,
  getFormattedTime as normalizeDateTime,
} from "../core/utils";

export default class App {
  #donateForm;
  #donateList;
  #state;
  constructor() {
    this.#state = {
      donates: this.#initialDonatesArray().map(({ amount, date }) => ({
        amount,
        date: normalizeDateTime(date),
      })),
      totalAmount: numbSum(
        this.#initialDonatesArray().map((donate) => donate.amount)
      ),
    };
    this.#donateForm = new DonateForm(
      this.#state.totalAmount,
      this.#createNewDonate.bind(this)
    );
    this.#donateList = new DonateList(this.#state.donates);
  }
  #initialDonatesArray() {
    return [
      { amount: 4, date: new Date() },
      { amount: 20, date: new Date() },
      { amount: 3, date: new Date() },
      { amount: 1, date: new Date() },
    ];
  }
  #createNewDonate(newDonate) {
    this.#state.donates.push(newDonate);
    this.#state.totalAmount += newDonate.amount;
    this.#donateForm.updateTotalAmount(this.#state.totalAmount);
    this.#donateList.updateDonates(this.#state.donates);
  }
  run() {
    document.body.append(this.#donateForm.render(), this.#donateList.render());
  }
}
