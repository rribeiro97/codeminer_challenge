import React from 'react';
import './ProductCardComponent.scss';

const ProductCardComponent = (props) => {
    const { product } = props;

    return(
        <div className="ProductCardComponent">
            <div className="productCard">
                <div className="productCard__image">
                    <figure>
                        <img>
                        </img>
                    </figure>
                </div>
                <div className="productCard__about">
                    <span>Apple</span>
                    <div className="productCard__about__priceRemaning">
                        <span>$200</span>
                        <span>4 remaning</span>
                    </div>
                </div>
                <button className="productCard__buyButton"></button>
            </div>
        </div>
    )
}

export default ProductCardComponent;