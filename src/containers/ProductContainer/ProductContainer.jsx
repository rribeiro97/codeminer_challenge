import React from 'react';
import ProductCardComponent from '../../components/ProductCardComponent/ProductCardComponent'
import './ProductContainer.scss';

const ProductContainer = (props) => {
    const { products, isCart} = props;
    const selectedProducts = products;
    console.log('prop',props);
    return(
        <>
            { isCart ?  (
            <div className="ProductContainer"> 
                { selectedProducts.map( (selectedProduct) => (
                    <ProductCardComponent product={selectedProduct} isCart={true} />
                ))}
            </div>    
            ): (
             <div className="ProductContainer"> 
               { products.map( (selectedProduct) => (
                <ProductCardComponent product={selectedProduct} isCart={false} />
                ))}
            </div>
            )}
    </>
    )
}

export default ProductContainer;