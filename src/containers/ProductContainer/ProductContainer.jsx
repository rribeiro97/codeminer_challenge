import React from 'react';
import ProductCardComponent from '../../components/ProductCardComponent/ProductCardComponent'
import './ProductContainer.scss';

const ProductContainer = (props) => {
    const { products, isCart, addProduct, quantityHandler} = props;
    return(
        <>
            { isCart ?  (
            <div className="ProductContainer"> 
                { products.map( (selectedProduct) => (
                    <ProductCardComponent product={selectedProduct} isCart={true} quantityHandler={quantityHandler} />
                ))}
            </div>    
            ): (
             <div className="ProductContainer"> 
               { products.map( (selectedProduct) => (
                <ProductCardComponent product={selectedProduct} isCart={false} addProduct={addProduct} />
                ))}
            </div>
            )}
    </>
    )
}

export default ProductContainer;