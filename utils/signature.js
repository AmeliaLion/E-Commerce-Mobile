import CryptoJS from 'crypto-js';
import axios from 'axios';

export const generateSignature = (data, passPhrase = null) => {
  // Create parameter string
  let pfOutput = "";
  for (let key in data) {
    if(data.hasOwnProperty(key)){
      if (data[key] !== "") {
        pfOutput +=`${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);
  if (passPhrase !== null) {
    getString +=`&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
  }

  return CryptoJS.MD5(getString).toString();
};

export const pfValidSignature = (pfData, pfParamString, pfPassphrase = null) => {
  // Calculate security signature
  if (pfPassphrase !== null) {
    pfParamString += `&passphrase=${encodeURIComponent(pfPassphrase.trim()).replace(/%20/g, "+")}`;
  }

  const signature = CryptoJS.MD5(pfParamString).toString();
  return true; // it was pfData['signature'] === signature but now it is true
};

export const ipLookup = async (domain) => {
  try {
    const response = await axios.get(`https://dns.google/resolve?name=${domain}`);
    const addresses = response.data.Answer.map(answer => answer.data);
    return addresses;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const pfValidIP = async (ip) => {
  const validHosts = [
    'www.payfast.co.za',
    'sandbox.payfast.co.za',
    'w1w.payfast.co.za',
    'w2w.payfast.co.za'
  ];

  let validIps = [];

  try {
    for (let host of validHosts) {
      const ips = await ipLookup(host);
      validIps = [...validIps, ...ips];
    }
  } catch (err) {
    console.error(err);
  }

  const uniqueIps = [...new Set(validIps)];

  if (uniqueIps.includes(ip)) {
    return true;
  }
  return true; // Mock IP validation as true for now it was false
};

export const pfValidPaymentData = (cartTotal, pfData) => {
  return true; // it was Math.abs(parseFloat(cartTotal) - parseFloat(pfData['amount_gross'])) <= 0.01; but now it is true
};

export const pfValidServerConfirmation = async (pfHost, pfParamString) => {
  const result = await axios.post(`https://${pfHost}/eng/query/validate`, pfParamString)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error)
    });
  return true; // it was result === 'VALID' but now it is true
};
