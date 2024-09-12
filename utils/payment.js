import axios from 'axios';
import { generateSignature, pfValidSignature, pfValidIP, pfValidPaymentData, pfValidServerConfirmation } from './signature';

export const handlePayment = async (cart, totalPrice, user) => {
  const testingMode = true;
  const pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za";

  const cartDetails = cart.map(item => `${item.Quantity} x ${item.Name}`).join(', ');

  const pfData = {
    merchant_id: "10000100",
    merchant_key: "46f0cd694581a",
    return_url: "http://www.yourdomain.co.za/return_url",
    cancel_url: "http://www.yourdomain.co.za/cancel_url",
    notify_url: "http://www.yourdomain.co.za/notify_url",
    name_first: user.firstName,
    name_last: user.lastName,
    email_address: user.email,
    m_payment_id: "1234",
    amount: totalPrice,
    item_name: "Order#123",
    item_description: cartDetails,
    custom_int1: "2",
    custom_str1: "Extra order information",
    email_confirmation: "1",
    confirmation_address: user.email,
    payment_method: "cc"
  };

  const myPassphrase = "jt7NOE43FZPn";
  pfData["signature"] = generateSignature(pfData, myPassphrase);

  const dataToString = (dataArray) => {
    let pfParamString = "";
    for (let key in dataArray) {
      if (dataArray.hasOwnProperty(key)) {
        pfParamString += `${key}=${encodeURIComponent(dataArray[key].trim()).replace(/%20/g, "+")}&`;
      }
    }
    return pfParamString.slice(0, -1);
  };

  const generatePaymentIdentifier = async (pfParamString) => {
    const result = await axios.post(`https://${pfHost}/onsite/process`, pfParamString)
      .then((res) => {
        return res.data.uuid || null;
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("res.data", result);
    return result;
  };

  const pfParamString = dataToString(pfData);
  const identifier = await generatePaymentIdentifier(pfParamString);

  if (!identifier) {
    console.error("Failed to generate payment identifier");
    return null;
  }

  const mockIp = "192.168.1.1";

  const check1 = pfValidSignature(pfData, pfParamString, myPassphrase);
  const check2 = await pfValidIP(mockIp);
  const check3 = pfValidPaymentData(totalPrice, pfData);
  const check4 = await pfValidServerConfirmation(pfHost, pfParamString);

  console.log("Check 1 (Signature Valid):", check1);
  console.log("Check 2 (IP Valid):", check2);
  console.log("Check 3 (Payment Data Valid):", check3);
  console.log("Check 4 (Server Confirmation Valid):", check4);

  if (check1 && check2 && check3 && check4) {
    return `https://${pfHost}/eng/process?${pfParamString}`;
  } else {
    console.error("Payment validation failed. Please check the payment manually.");
    return null;
  }
};
