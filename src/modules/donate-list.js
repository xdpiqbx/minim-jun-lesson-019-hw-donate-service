import { settings as set } from "../core/constants/settings";

export default class DonateList {
  #divDonatesContainer;
  #h2TitleDonatesList;
  #divDonatesList;
  #donatesData;

  constructor(donates) {
    this.#donatesData = donates;
  }
  #initElements() {
    this.#divDonatesContainer = document.createElement("div");
    this.#h2TitleDonatesList = document.createElement("h2");
    this.#divDonatesList = document.createElement("div");
  }
  #setAttributesForElements() {
    this.#divDonatesContainer.className = "donates-container";
    this.#h2TitleDonatesList.className = "donates-container__title";
    this.#divDonatesList.className = "donates-container__donates";
  }
  #createDonateElement({ amount, date }) {
    const donateElement = document.createElement("div");
    const boldPrice = document.createElement("b");
    donateElement.className = "donate-item";
    donateElement.textContent = date;
    boldPrice.textContent = ` - ${amount}${set.currency}`;
    donateElement.append(boldPrice);
    return donateElement;
  }
  #makeHTMLStructure() {
    this.#divDonatesContainer.append(
      this.#h2TitleDonatesList,
      this.#divDonatesList
    );
  }
  updateDonates(updatedDonates) {
    this.#divDonatesList.innerHTML = "";
    updatedDonates.forEach((donate) => {
      this.#divDonatesList.append(this.#createDonateElement(donate));
    });
  }
  render() {
    this.#initElements();
    this.#setAttributesForElements();
    this.#makeHTMLStructure();
    this.#donatesData.forEach((donate) => {
      this.#divDonatesList.append(this.#createDonateElement(donate));
    });
    return this.#divDonatesContainer;
  }
}
