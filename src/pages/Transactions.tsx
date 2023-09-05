import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Receipt } from "../components/assets";
import { Image, Space, Typography } from "antd";
import Table, { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  DOLLER,
  data,
  fetchData,
  getCurrencyRate,
  numberWithCommas,
  transactionDetails,
} from "../resources/helper";
import { TransactionDataType } from "../resources/interfaces";
import {
  updateTransaction,
  updateTransactionDetails,
} from "../store/slices/transactionSlice";

const Transactions = () => {
  const navigate = useNavigate();
  const transactionData = useSelector((state: RootState) => state.transaction);
  const { data: tableData } = transactionData;
  const dispatch = useDispatch();
  const [isLoading, setLoader] = useState(false);

  const handleNavigate = (columns: TransactionDataType) => {
    navigate("/transactionDetails");
    dispatch(updateTransactionDetails(columns));
  };

  const totalAmount = useMemo(() => {
    const sumOfValue1 = transactionData?.data?.reduce(
      (total, obj) => total + obj.amount,
      0
    );
    return (sumOfValue1 / (81 * 1000)).toFixed(0);
  }, [transactionData.data]);

  const getTableData = async (data: TransactionDataType[]) => {
    setLoader(true);
    try {
      const response: any = await fetchData(data);
      if (!tableData.length) {
        dispatch(updateTransaction(response));
      }
    } catch (error) {
      console.log({ error });
    }
    setLoader(false);
  };

  useEffect(() => {
    getCurrencyRate();
    dispatch(updateTransactionDetails(transactionDetails));
    getTableData(data);
  }, []);

  const columns: ColumnsType<TransactionDataType> = [
    {
      title: "Transaction Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Invoice No.",
      dataIndex: "invoiceNo",
      render: (cols, columns) => {
        return (
          <Space size="middle" className="text-blue-600">
            <a onClick={() => handleNavigate(columns)}>{cols}</a>
          </Space>
        );
      },
      sorter: (a, b) => a.invoiceNo.localeCompare(b.invoiceNo),
    },
    {
      title: "Payer",
      dataIndex: "payer",
      sorter: (a, b) => a.payer.localeCompare(b.payer),
    },
    {
      title: "Payee",
      dataIndex: "payee",
      sorter: (a, b) => a.payee.localeCompare(b.payee),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (cols) => {
        return (
          <Space size="middle">
            <span>&#8377; {numberWithCommas(cols)}</span>
          </Space>
        );
      },
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 3,
      },
    },
    {
      title: "USD Equivalent",
      dataIndex: "amount",
      render: (cols: number) => {
        const inDollers = cols / DOLLER;
        return (
          <Space size="middle">
            <span>$ {numberWithCommas(Number(inDollers.toFixed(2)))}</span>
          </Space>
        );
      },
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 3,
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (cols, columns) => {
        return (
          <Space size="middle" className="text-blue-600">
            <div className="flex gap-2">
              <div
                className={`w-[56px] h-[2px] ${
                  cols === "sent" || cols === "pending" || cols === "recieved"
                    ? "bg-indigo-950"
                    : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-[56px] h-[2px] ${
                  cols === "pending" || cols === "recieved"
                    ? "bg-indigo-950"
                    : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-[56px] h-[2px] ${
                  cols === "recieved" ? "bg-indigo-950" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </Space>
        );
      },
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Action",
      dataIndex: "",
      align: "center",
      render: () => {
        return (
          <div className="text-blue-600">
            <div className="flex flex-col gap-[2px] w-[27px] rounded-full px-[5px] py-[7px] bg-slate-200 m-auto justify-center items-center ">
              <div className="w-[3px] rounded-full h-[3px] bg-gray-800"></div>
              <div className="w-[3px] rounded-full h-[3px] bg-gray-800"></div>
              <div className="w-[3px] rounded-full h-[3px] bg-gray-800"></div>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-slate-200 !h-[150px] !min-h-[150px]">
          <div className="w-full h-full p-4 flex gap-4 items-center">
            <div className="text-blue-600 bg-blue-200 flex justify-center items-center h-[32px] w-[32px] rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-left mt-2">
              <div>
                <Typography className="text-blue-600 text-3xl font-bold">
                  300k
                  <span className="text-black text-lg ml-2 font-bold">USD</span>
                </Typography>
              </div>
              <div className="text-left">
                <Typography className="text-green-700 text-md">
                  1.25%
                </Typography>
              </div>
            </div>
          </div>
        </Card>
        <Card className="bg-slate-100 !h-[150px] !min-h-[150px]">
          <div className="p-4 flex gap-4">
            <div className="text-orange-600 bg-orange-100 flex justify-center items-center h-[32px] w-[32px] rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div className="mt-12">
              <div className="text-left">
                <Typography>Total Amount</Typography>
              </div>
              <div className="text-left">
                <Typography className="text-2xl font-bold">
                  {totalAmount ?? 0}k
                  {/*Total calculated amount from table in usd*/}
                  <span className="text-base font-bold"> USD</span>
                </Typography>
              </div>
            </div>
          </div>
        </Card>
        <Card className="bg-slate-50 !h-[150px] !min-h-[150px]">
          <div className="p-4 flex gap-4">
            <div className="text-orange-600 bg-orange-100 flex justify-center items-center h-[32px] w-[32px] rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div className="mt-12">
              <div className="text-left">
                <Typography>Previous</Typography>
              </div>
              <div className="text-left">
                <Typography className="text-2xl font-bold">
                  100k
                  <span className="text-base font-bold"> USD</span>
                </Typography>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="pt-8">
        <Table columns={columns} dataSource={tableData} loading={isLoading} />
      </div>
    </div>
  );
};

export default Transactions;
