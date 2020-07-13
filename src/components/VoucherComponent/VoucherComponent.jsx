import React, {useState} from 'react';
import './VoucherComponent.scss';

const VoucherComponent = (props) => {
    const {handleSubmit} = props;
    const [voucher,setVoucher] = useState('');

        return(
            <div className="VoucherComponent">
                <input className="VoucherComponent__inputVoucher" value={voucher} onChange={(e) => setVoucher(e.target.value)} placeholder="Discount Code"></input>
                <div className="VoucherComponent__InsertVoucher" > 
                    <button className="VoucherComponent__InsertVoucher__btn" onClick={() => handleSubmit(voucher)}> APPLY </button>
                </div>
            </div>
        );
}

export default VoucherComponent;