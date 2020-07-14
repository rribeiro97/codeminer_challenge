import React from 'react';
import './CartContainer.scss';
import ProductContainer from '../ProductContainer/ProductContainer';
import VoucherComponent from '../../components/VoucherComponent/VoucherComponent';
import ValuesInformationComponent from '../../components/ValuesInformationComponent/ValuesInformationComponent';

const CartContainer = (props) => {
    const { products, quantityHandler, values, handleSubmit, show } = props;
    const selectedProducts = products.filter( (product) => product.reserved > 0);

    
    return( 
    <div className="CartContainer" data-testid="cart-container">
        <div className="CartContainer__title">
            <h2> Shopping Cart</h2>
        </div>

        <div className="CartContainer__products">
            {
                selectedProducts.length === 0 ? <span className="CartContainer__products__zero"> You don't have any product added in Cart :( </span> :
                <ProductContainer products={selectedProducts} isCart={true} quantityHandler={quantityHandler} show={show} />
            }
            
        </div>
        <div className="CartContainer__voucher">
            <VoucherComponent handleSubmit={handleSubmit}/>
        </div>
        <div className="CartContainer__valuesInformation">
            <ValuesInformationComponent values={values} />
        </div>
    </div>
        
    )
}

export default CartContainer;