import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import './OrderCompleted.scss'

const OrderCompleted = ({  history }) => {
    // console.log(match.params.orderId)
    const [data, setData] = useState([]);
    useEffect(() => {
        const FetchData = async () => {
            const result = await axios(
                `http://localhost:5000/Orders/api/OrderCompeleted`,
                {
                    method: 'GET',
                    credentials: 'include', // 需傳送 Cookie 必須開啟
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }),
                },
            )
            setData(result.data)
        }
        FetchData()
    }, []);
    return (
        <>
            <div className="title">
                <div className="title-cotainer">
                    <ol className="title-ol">
                        <li>購物完成</li>
                    </ol>
                    <h3>購物完成</h3>
                </div>
            </div>
            <div className="container">
                <ul className="step">
                    <li className="step1-active-ac">
                    </li>
                    <li className="step2-active-ac">
                    </li>
                    <li className="step3-active-ac">
                    </li>
                </ul>
                <div className="content">
                    <div className="content-wrap">
                        <h3>Order Compeleted</h3>
                        <span className="content-Cartlist-title">Order Detail</span>
                        <ul className="content-wrap-ul-compeleted">
                            <li>訂單編號</li>
                            <li>總計</li>
                            <li>付款方式</li>
                            <li>運送地址</li>
                        </ul>
                        {data.map((list, index) => (
                            <>
                                <ul key={index} className="content-wrap-ul-compeleted">
                                    <li>{list.orderId}</li>
                                    <li>{list.Total}</li>
                                    <li>{list.PayMentMethod}</li>
                                    <li>{list.City + list.district + list.address}</li>
                                </ul>
                            </>
                        ))}
                    </div>
                </div>
                <div className="buttonContainer">
                    <div className="push first" onClick={() => (history.push('/OrderList'))}>點我查看歷史訂單</div>
                    <div className="push first" onClick={() => (history.push('/'))}>返回首頁</div>
                </div>


            </div>
            <footer className="footer"></footer>
        </>
    )

}


export default withRouter(OrderCompleted)



