/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { FaTrashAlt, FaStar } from 'react-icons/fa';
import './CartItems.scss'
import { connect } from "react-redux";

import { removeItemFromCart, addItemToCart, ReduceItem, ChangeFavr } from '../../../redux/cart/cart-action';
const CartItems = ({ cartItems, removeItemFromCart, addItemToCart, ReduceItem, ChangeFavr }) => {

    // console.log(cartItems)

    // console.log(cartItems)

    // <span className="FaAngleLeft" ></span><span></span><span className="FaAngleRight" onClick={() => (addItemToCart(item))}><FaAngleRight /></span>

    return (
        <>
            {cartItems.length ? cartItems.map((item, index) => (

                <ul key={index} className="content-wrap-ul">
                    <li><img className="objectFit" src={item.img1} /></li>
                    <li>{item.name}</li>
                    <li>{item.itemType}</li>
                    <li>{item.price}</li>
                    <li >
                        <ul className="quan">
                            <li onClick={() => (ReduceItem(item))}>&#10094;</li>
                            <span>{item.quantity}</span>
                            <li onClick={() => (addItemToCart(item))} >&#10095;</li>
                        </ul>
                    </li>
                    <li value={item.quantity * item.price} >{item.quantity * item.price}</li>
                    <ul className="icon-list">
                        <div className="icon" onClick={() => removeItemFromCart(item.itemId)} ><FaTrashAlt /></div>
                        <div className="icon" onClick={() => ChangeFavr(item)}><FaStar /></div>
                    </ul>
                </ul>

            )) : <ul className="content-wrap-ul-ls">
                    <li>購物車無商品</li>
                </ul>

            }
        </>
    )
}


const mapDispatchToProps = (dispatch) => ({
    removeItemFromCart: (itemId) => dispatch(removeItemFromCart(itemId)),
    addItemToCart: (itemId) => dispatch(addItemToCart(itemId)),
    ReduceItem: (itemId) => dispatch(ReduceItem(itemId)),
    ChangeFavr: (itemId) => dispatch(ChangeFavr(itemId)),
});

export default connect(null, mapDispatchToProps)(CartItems)
