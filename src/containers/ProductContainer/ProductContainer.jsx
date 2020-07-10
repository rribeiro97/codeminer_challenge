import React from 'react';
import ProductCardComponent from '../../components/ProductCardComponent/ProductCardComponent'
import './ProductContainer.scss';

const ProductContainer = (props) => {
    const { products } = props;
    console.log('prop',props);
    return(
        <div className="ProductContainer">
            {
                // products.map( (product) => (
                    <ProductCardComponent  />
                // ))
            }
        </div>
    )
}

export default ProductContainer;