const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

let convertUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let inputNumber = document.querySelector("#inputNumber");
let convertBtn = document.querySelector("#convertBtn");
let dropdowns = document.querySelectorAll("#dropdown select");
let exchange = document.querySelector("#exchange");
let fromselect = document.querySelector(".from");
let toselect = document.querySelector(".to");
let fromFooter = document.querySelector(".fromFooter");
let toFooter = document.querySelector(".toFooter");

function reverse() {
  let temp = toselect.value;
  toselect.value = fromselect.value;
  fromselect.value = temp;
  changeFlag(fromselect);
  changeFlag(toselect);
}

// event listerner for reverse
exchange.addEventListener("click", () => {
  reverse();
});

for (let select of dropdowns) {
  for (currencyCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerHTML = currencyCode;
    newOptions.value = currencyCode;
    select.append(newOptions);
    if (select.name === "from" && currencyCode === "USD") {
      newOptions.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      newOptions.selected = "selected";
    }
    // event listerner for changing flag
    select.addEventListener("change", (evt) => {
      changeFlag(evt.target);
    });
  }
}

convertBtn.addEventListener("click", () => {
  if (inputNumber.value <= 0) {
    inputNumber.value = 1;
  }
});

function changeFlag(element) {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newUrl;
}

// convert button functionality on click

convertBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let from = fromselect.value.toLowerCase();
  let to = toselect.value.toLowerCase();
  let newUrl = `${convertUrl}/${from}.json`;
  let response = await fetch(newUrl);
  response = await response.json();

  // update from and to in footer
  fromFooter.children[0].innerHTML = fromselect.value;
  toFooter.children[0].innerHTML = toselect.value;
  // update from inputted value
  fromFooter.children[1].innerHTML = inputNumber.value;
  // update to inputted value
  console.log(response[from][to]);
  toFooter.children[1].innerHTML = (response[from][to] * inputNumber.value).toFixed(2);
});
