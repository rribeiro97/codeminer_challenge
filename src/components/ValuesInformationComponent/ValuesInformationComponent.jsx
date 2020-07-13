import React from 'react';
import './ValuesInformationComponent.scss';

const ValuesInformationComponent = (props) => {
    const { values } = props;
    console.log('ValueInfor',props)
        return(
            <div className="ValuesInformationComponent">
                <div className="ValuesInformationComponent__Subtotal" > 
                <span className="ValuesInformationComponent__label" > Subtotal</span>
                    <span className="ValuesInformationComponent__Subtotal__value" > $ {values.subtotal.toFixed(2)} </span>
                </div>
                <div className="ValuesInformationComponent__Shipping" > 
                    <span className="ValuesInformationComponent__label" > Shipping </span>
                    <span className="ValuesInformationComponent__Shipping__value" > $ {values.shipping.toFixed(2)} </span>
                </div>
                <div className="ValuesInformationComponent__Discount" >
                    <span className="ValuesInformationComponent__label" > Discount </span> 
                    <span className="ValuesInformationComponent__Discount__value" > $ {values.discount.toFixed(2)}</span>
                </div>
                <div className="ValuesInformationComponent__Total" >
                    <span className="ValuesInformationComponent__label" > Total </span> 
                    <span className="ValuesInformationComponent__Total__value" > $ {values.total.toFixed(2)} </span>
                </div>
            </div>
        );
}

export default ValuesInformationComponent;