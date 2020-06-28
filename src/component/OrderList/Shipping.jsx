import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';




const Map = ({ data, hiddenID, ListToSever, history, DelToSever }) => {
    const [hidden, setHidden] = useState(false);
    const [Value, setValue] = useState();

    return (
        data.rows.filter((i) => (i.OrderStatus === '1')).map((item, index) => (
            <>
                <ul key={index} className="wrap-ul">
                    <li><span>{item.orderId}</span></li>
                    <li>{item.created_at}</li>
                    <li>$ {item.Total}</li>
                    <li>{item.PayMentMethod}</li>
                    {item.OrderStatus === 1 ? <li>交易進行中</li> : item.OrderStatus === 2 ? <li> 交易取消 </li> : <li>交易完成</li>}
                    <li className="productdetail">
                        <button className="button-two" value={item.orderId} onClick={(e) => (setHidden(!hidden)(ListToSever(item.orderId), setValue(e.target.value)))}>點我查看</button>
                    </li>
                    {item.OrderStatus === 1 ? <li><span className="icon" onClick={() => { DelToSever(item.orderId) }}><FaTrashAlt /></span></li> : item.OrderStatus === 2 ? <li> 交易取消</li> : <li> 交易完成如需退貨請洽<span className="service" onClick={() => history.push('/customerservice')}>客服中心</span></li>}
                </ul>
                {hidden && Value === item.orderId ? (
                    <div className="wrap-ul-hidden-container">
                        <ul className="wrap-ul-hidden-title">
                            <li>姓名</li>
                            <li>運送地址</li>
                            <li>手機</li>
                            <li>Email</li>
                            <li>商品名稱</li>
                            <li>商品價格</li>
                            <li>商品數量</li>
                            <li>商品種類</li>

                        </ul>
                        {hiddenID ? hiddenID.map((item, index) =>
                            (<ul key={index} className="wrap-ul-hidden">
                                <li>{item.UserName}</li>
                                <li>{item.City + item.district + item.address}</li>
                                <li>{item.mobile}</li>
                                <li>{item.email}</li>
                                <li>{item.ItemName}</li>
                                <li>{item.ItemNamePrice}</li>
                                <li>{item.itemQuantity}</li>
                                <li>{item.itemType}</li>
                            </ul>)) : 'loading'}

                    </div>
                ) : ''}
            </>
        ))
    )
}

export default Map;