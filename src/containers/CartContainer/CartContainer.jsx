import React from 'react';
import './CartContainer.scss';
import ProductContainer from '../ProductContainer/ProductContainer';
import VoucherComponent from '../../components/VoucherComponent/VoucherComponent';

const CartContainer = (props) => {
    const { selectedProducts } = props;
    console.log('prop',props);
    return(
        <div className="CartContainer">
            <div className="CartContainer__title">
                <h2> Shopping Cart</h2>
            </div>
        
            <div className="CartContainer__products">
                <ProductContainer products={selectedProducts} isCart={true} />
            </div>
            <div className="CartContainer__voucher">
                <VoucherComponent />
            </div>
            <div className="CartContainer__valuesInformation">
                <span>value</span>
                <span>value</span>
                <span>value</span>
                <span>value</span>
            </div>
            <div className="CartContainer__checkoutButton">
                <button> CHECKOUT </button>
            </div>
        </div>
        
    )
}

export default CartContainer;