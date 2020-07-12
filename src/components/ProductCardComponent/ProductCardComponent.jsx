import React from 'react';
import './ProductCardComponent.scss';

const ProductCardComponent = (props) => {
    const { product, isCart } = props;
        return(
            <>
            {isCart ? (
                <div className="productCard__cart">
                    <div className="productCard__cart__image">
                        <figure>
                            <span> {product.name}</span>
                        </figure>
                    </div>
                        
                    <div className="productCard__cart__about">
                        <span className="productCard__cart__about__name"> {product.name}</span>
                        <div className="productCard__cart__about__priceRemaning">
                            <span>$ {product.price.toFixed(2)} • </span>
                            <span>{product.available} left</span>
                        </div>
                    </div>

                    <div className="productCard__cart__selector">
                        <button className="productCard__cart__buyButton__btn">+</button>
                        <button className="productCard__cart__buyButton__btn">-</button>
                    </div>
                </div>)  
                :  (
                <div className="productCard">
                    <div className="productCard__image">
                        <figure>
                            <span> {product.name}</span>
                        </figure>
                    </div>
                        
                    <div className="productCard__about">
                        <span className="productCard__about__name"> {product.name}</span>
                        <div className="productCard__about__priceRemaning">
                            <span>$ {product.price.toFixed(2)} • </span>
                            <span>{product.available} left</span>
                        </div>
                    </div>

                    <div className="productCard__buyButton">
                        <button className="productCard__buyButton__btn">Buy</button>
                    </div>
                </div>
            )
        }
    </>
        )
}

export default ProductCardComponent;