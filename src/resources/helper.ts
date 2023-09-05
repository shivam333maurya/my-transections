import { TransactionDataType } from "./interfaces";

export const handle = () => {
  return false;
};

export const transactionDetails: TransactionDataType = {
  key: "0",
  name: "",
  date: "",
  invoiceNo: "",
  payer: "",
  payee: "",
  amount: 0,
  usdEquivalent: 0,
  status: "",
};

export const DOLLER = 81;

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const fetchData = (data: TransactionDataType[]) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = JSON.parse(JSON.stringify(data));
      console.log(result);
      resolve(result);
    }, 1000);
  });
};

const apiKey = "99e2ae6ebdcb560dd56af0ced993f60a";
const baseCurrency = "USD"; // The currency you want to convert from
const targetCurrency = "INR"; // The currency you want to convert to
const apiUrl = `https://api.apilayer.com/exchangerates_data/latest?base=${baseCurrency}&symbols=${targetCurrency}`;
// const apiUrl = `https://data.fixer.io/api/latest?access_key=${apiKey}&base=${baseCurrency}&symbols=${targetCurrency}`;

export const getCurrencyRate = async () => {
  await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        const exchangeRate = data.conversion_rates[targetCurrency];
        console.log(`1 ${baseCurrency} = ${exchangeRate} ${targetCurrency}`);
      } else {
        console.error("Failed to retrieve exchange rate data.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const data = [
  {
    key: "1",
    name: "John Brown",
    date: "09/03/2023",
    invoiceNo: "HHVh&^7",
    payer: "Green Kaya Limited",
    payee: "Green Kaya Limited",
    amount: 304000,
    usdEquivalent: 304000,
    status: "sent",
  },
  {
    key: "2",
    name: "Jim Green",
    date: "09/02/2023",
    invoiceNo: "HHVh&^6",
    payer: "Green Kaya Limited",
    payee: "Green Kaya Limited",
    amount: 400500,
    usdEquivalent: 304000,
    status: "recieved",
  },
  {
    key: "3",
    name: "Joe Black",
    date: "09/01/2023",
    invoiceNo: "HHVh&^5",
    payer: "Green Kaya Limited",
    payee: "Green Kaya Limited",
    amount: 360000,
    usdEquivalent: 304000,
    status: "pending",
  },
  {
    key: "4",
    name: "Jim Red",
    date: "08/31/2023",
    invoiceNo: "HHVh&^4",
    payer: "Green Kaya Limited",
    payee: "Green Kaya Limited",
    amount: 400000,
    usdEquivalent: 304000,
    status: "recieved",
  },
  {
    key: "5",
    name: "Jim Red",
    date: "08/28/2023",
    invoiceNo: "HHVh&^3",
    payer: "Green Kaya Limited",
    payee: "Green Kaya Limited",
    amount: 500020,
    usdEquivalent: 304000,
    status: "pending",
  },
  {
    key: "6",
    name: "Jim Red",
    date: "08/27/2023",
    invoiceNo: "HHVh&^2",
    payer: "Green Kaya Limited",
    payee: "Green Kaya Limited",
    amount: 250000,
    usdEquivalent: 304000,
    status: "recieved",
  },
  {
    key: "7",
    name: "Jim Red",
    date: "08/26/2023",
    invoiceNo: "HHVh&^1",
    payer: "Green Kaya Limited",
    payee: "Green Kaya Limited",
    amount: 290000,
    usdEquivalent: 304000,
    status: "sent",
  },
];
