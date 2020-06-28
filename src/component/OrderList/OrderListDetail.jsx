import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import Map from "./Shipping";
import { withRouter } from "react-router-dom";
import Compeleted from "./Compeleted";
import OrderCancel from "./Cancel";
import All from "./All";

async function DelToSever(orderId) {
  // 注意資料格式要設定，伺服器才知道是json格式
  axios.post(`http://localhost:5000/Orders/api/del/${orderId}`, {
    method: "POST",
    credentials: "include", // 需傳送 Cookie 必須開啟
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    data: { orderId: orderId },
  });
  window.location.reload();
}

const OrderListDetail = (props) => {
  const [data, setData] = useState({ rows: [] });
  const [search, setSearch] = useState("");
  const [hidden, setHidden] = useState(false);
  const [hiddenID, sethiddenID] = useState();
  const [address, setaddress] = useState();

  const [Value, setValue] = useState();
  const Shipping = props.location.pathname === "/OrderList/shipping";
  const compeleted = props.location.pathname === "/OrderList/compeleted";
  const Cancel = props.location.pathname === "/OrderList/Cancel";

  const ListToSever = async (orderId) => {
    const product = await axios(
      "http://localhost:5000/Orders/api/OrderListDeatail"
    );

    const address = await axios("http://localhost:5000/Orders/api/address");
    setaddress(address.data.filter((i) => i.orderId === orderId));
    sethiddenID(product.data.rows.filter((i) => i.orderId === orderId));
  };

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios("http://localhost:5000/Orders/api/OrderList");
      setData(result.data);
    };
    FetchData();
  }, []);

  console.log(address);
  console.log(hiddenID);

  // useEffect(() => {
  //     const ListToSever = async (orderId) => {
  //         const result = await axios(
  //             `http://localhost:3000/address-book/api/OrderList`);
  //         sethiddenID(result.data.rows.filter((i) => (i.orderId == orderId)))
  //     }
  //     ListToSever();
  // }, [hidden]);

  useEffect(() => {
    // console.log(hiddenID)
  }, [hiddenID]);
  return (
    <>
      <input
        type="search"
        className="search"
        onChange={(event) => setSearch(event.target.value)}
        placeholder="您可以透過訂單編號 商品金額及付款方式搜尋"
      ></input>
      <div className="wrap">
        <ul className="wrap-ul">
          <li>訂單編號</li>
          <li>訂購時間</li>
          <li>總額</li>
          <li>付款方式</li>
          <li>訂單狀態</li>
          <li>訂單詳情</li>
          <li>取消</li>
        </ul>
        {search ? (
          data.rows
            .filter(
              (item) =>
                item.orderId.toString().includes(search) ||
                item.PayMentMethod.match(search) ||
                item.Total.toString().includes(search)
            )
            .map((item, index) => (
              <ul key={index + "order"} className="wrap-ul">
                <li>{item.orderId}</li>
                <li>{item.created_at}</li>
                <li>$ {item.Total}</li>
                <li>{item.PayMentMethod}</li>
                {item.OrderStatus === 1 ? (
                  <li>交易進行中</li>
                ) : item.OrderStatus === 2 ? (
                  <li> 交易取消 </li>
                ) : (
                  <li>交易完成</li>
                )}
                <li className="productdetail">
                  <button
                    className="button-two"
                    value={item.orderId}
                    onClick={(e) => (
                      setHidden(!hidden),
                      ListToSever(item.orderId),
                      setValue(e.target.value)
                    )}
                  >
                    點我查看
                  </button>
                </li>
                {item.OrderStatus === 1 ? (
                  <li>
                    <span
                      className="icon"
                      onClick={() => {
                        DelToSever(item.orderId);
                      }}
                    >
                      <FaTrashAlt />
                    </span>
                  </li>
                ) : item.OrderStatus === 2 ? (
                  <li> 交易取消</li>
                ) : (
                  <li> 交易完成如需退貨請洽客服中心</li>
                )}
              </ul>
            ))
        ) : Shipping ? (
          <Map
            data={data}
            search={search}
            hidden={hidden}
            hiddenID={hiddenID}
            Value={Value}
            ListToSever={ListToSever}
            DelToSever={DelToSever}
          />
        ) : compeleted ? (
          <Compeleted
            data={data}
            search={search}
            hidden={hidden}
            hiddenID={hiddenID}
            Value={Value}
            ListToSever={ListToSever}
            DelToSever={DelToSever}
          />
        ) : Cancel ? (
          <OrderCancel
            data={data}
            search={search}
            hidden={hidden}
            hiddenID={hiddenID}
            Value={Value}
            ListToSever={ListToSever}
            DelToSever={DelToSever}
          />
        ) : (
          <All
            data={data}
            search={search}
            address={address}
            hidden={hidden}
            hiddenID={hiddenID}
            Value={Value}
            ListToSever={ListToSever}
            DelToSever={DelToSever}
          />
        )}
      </div>
      <div className="notice-list">
        <ul className="notice-list-ul">
          <span className="article-caption-list">注意事項</span>
          <br />
          <li>
            ※您最近一年內的購買記錄共計<span>{data.rows.length}</span>筆，退貨
            <span>0</span>次。
          </li>
          <li>
            ※尚未出貨的網路訂單可點選
            <img
              src="//www.orbis.com.tw/assets/default/i/icon-delete.gif"
              alt="取消"
            />
            按鈕，即可取消該筆訂單。
          </li>
          <li>
            ※狀態為「已出貨」之商品，不可取消訂單，如需換退貨請依照退貨辦法進行辦理。
          </li>
          <li>
            ※在您主動取消訂單後，將自動喪失首次購物100元現金折扣，取消前請特別注意。
          </li>
        </ul>
      </div>
    </>
  );
};

export default withRouter(OrderListDetail);
