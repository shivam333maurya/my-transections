import { Alert, Button, Radio, RadioChangeEvent, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/InputField";
import Card from "../components/Card";
import { TransactionDataType } from "../resources/interfaces";
import {
  updateTransaction,
  updateTransactionDetails,
} from "../store/slices/transactionSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TransactionDetails = () => {
  const navigate = useNavigate();
  const transactionData = useSelector((state: any) => state.transaction);
  const { transactionDetails, data } = transactionData;
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<boolean>(false);

  const handleChnage = (value: string, name: string) => {
    const newValue: number | string = name === "amount" ? Number(value) : value;
    const usEui: number | string =
      name === "amount" && typeof newValue === "number"
        ? (newValue / 81).toFixed(2)
        : "";
    const obj: TransactionDataType =
      name === "amount"
        ? {
            ...transactionDetails,
            [name]: newValue,
            usdEquivalent: usEui,
          }
        : {
            ...transactionDetails,
            [name]: newValue,
          };
    dispatch(updateTransactionDetails(obj));
  };

  const handleSave = () => {
    const index = data.findIndex(
      (item: TransactionDataType) => item.key === transactionDetails.key
    );
    const { name, invoiceNo, amount, usdEquivalent, payer, payee, date } =
      transactionDetails;
    const newData: TransactionDataType[] = [...data];
    if (name && invoiceNo && amount && payer && payee && date) {
      if (index !== -1) {
        newData[index] = transactionDetails;
      }
      dispatch(updateTransaction(newData));
      navigate("/transactions");
    } else {
      alert("Please fill all the required fields");
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <div className="mb-4">
        <div>
          <Card>
            <div>
              <Typography className="text-zinc-500 mt-2 mb-3 font-bold">
                Transaction Details
              </Typography>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4  gap-8">
              <div className="text-left">
                <Typography className="text-zinc-500">Name</Typography>
                <Typography className="text-zinc-500 font-semibold">
                  {transactionDetails.name}
                </Typography>
              </div>
              <div className="text-left">
                <Typography className="text-zinc-500">
                  Invoice Number
                </Typography>
                <Typography className="text-blue-500 font-semibold">
                  {transactionDetails.invoiceNo}
                </Typography>
              </div>
              <div className="text-left">
                <Typography className="text-zinc-500">Date</Typography>
                <Typography className="text-zinc-500 font-semibold">
                  {transactionDetails.date}
                </Typography>
              </div>
              <div className="text-left">
                <Typography className="text-zinc-500">Payer</Typography>
                <Typography className="text-zinc-500 font-semibold">
                  {transactionDetails.payer}
                </Typography>
              </div>
              <div className="text-left">
                <Typography className="text-zinc-500">Payee</Typography>
                <Typography className="text-zinc-500 font-semibold">
                  {transactionDetails.payee}
                </Typography>
              </div>
              <div className="text-left">
                <Typography className="text-zinc-500">Amount</Typography>
                <Typography className="text-zinc-500 font-semibold">
                  &#8377; {transactionDetails.amount}
                </Typography>
              </div>
              <div className="text-left">
                <Typography className="text-zinc-500">
                  USD Equivalent
                </Typography>
                <Typography className="text-zinc-500 font-semibold">
                  $ {transactionDetails.usdEquivalent}
                </Typography>
              </div>
              <div className="text-left">
                <Typography className="text-zinc-500">Status</Typography>
                <Typography
                  className={`text-${
                    transactionDetails.status === "sent"
                      ? "red"
                      : transactionDetails.status === "pending"
                      ? "orange"
                      : "green"
                  }-600 capitalize font-semibold`}
                >
                  {transactionDetails.status}
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div>
        <div>
          <Card className="!h-[300px]">
            <div>
              <Typography className="text-zinc-500 mt-2 mb-3 font-bold">
                Edit Transaction Details
              </Typography>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <CustomInput
                  disabled={!edit}
                  onChange={handleChnage}
                  value={transactionDetails.name}
                  label="Name"
                  placeHolder="Name"
                  name="name"
                  type="text"
                />
              </div>
              <div>
                <CustomInput
                  disabled={!edit}
                  onChange={handleChnage}
                  value={transactionDetails.invoiceNo}
                  label="Inovoice No."
                  placeHolder="Invoice No."
                  name="invoiceNo"
                  type="text"
                />
              </div>
              <div>
                <CustomInput
                  disabled={!edit}
                  onChange={handleChnage}
                  value={transactionDetails.payer}
                  label="Payer"
                  placeHolder="Payer"
                  name="payer"
                  type="text"
                />
              </div>
              <div>
                <CustomInput
                  disabled={!edit}
                  onChange={handleChnage}
                  value={transactionDetails.payee}
                  label="Payee"
                  placeHolder="Payee"
                  name="payee"
                  type="text"
                />
              </div>
              <div>
                <CustomInput
                  disabled={!edit}
                  onChange={handleChnage}
                  value={transactionDetails.amount}
                  label="Amount"
                  placeHolder="Enter Amount"
                  name="amount"
                  type="number"
                />
              </div>
              <div>
                <CustomInput
                  disabled={!edit}
                  onChange={handleChnage}
                  value={transactionDetails.date}
                  label="Date"
                  placeHolder="Transaction date"
                  name="date"
                  type="text"
                />
              </div>
            </div>
            <div className="mt-4 text-left">
              <Typography className="text-left ml-1">Status</Typography>
              <Radio.Group
                disabled={!edit}
                value={transactionDetails.status}
                onChange={(e: RadioChangeEvent) =>
                  handleChnage(e.target.value, "status")
                }
              >
                <Radio value={"sent"}>Sent</Radio>
                <Radio value={"pending"}>Pending</Radio>
                <Radio value={"recieved"}>Recieved</Radio>
              </Radio.Group>
            </div>
            <div className="mt-4 text-right">
              <Button
                onClick={handleEdit}
                className="bg-fuchsia-200 mr-3 hover:!border-transparent hover:!text-black"
              >
                Edit
              </Button>
              <Button
                onClick={handleSave}
                disabled={!edit}
                className="bg-fuchsia-700 hover:!border-transparent hover:!text-black"
              >
                Save
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
