import React from 'react';
import './VoucherComponent.scss';

const VoucherComponent = (props) => {
        return(
            <div className="VoucherComponent">
                <input className="VoucherComponent__inputVoucher" placeholder="Discount Code"></input>
                <div className="VoucherComponent__InsertVoucher" > 
                    <button className="VoucherComponent__InsertVoucher__btn" > APPLY </button>
                </div>
            </div>
        );
}

export default VoucherComponent;