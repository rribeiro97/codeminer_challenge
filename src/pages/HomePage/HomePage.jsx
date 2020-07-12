import React, {useState,useEffect} from 'react';
import axios from 'axios';
import CartContainer from '../../containers/CartContainer/CartContainer'
import ProductContainer from '../../containers/ProductContainer/ProductContainer'
import './HomePage.scss';
const HomePage = () => {

    const [fetchedProducts,setFetchedProducts] = useState([]);
    const [fetchedVouchers,setFetchedVouchers] = useState([]);

    useEffect(() =>{
        fetchProducts();
        fetchVouchers();
    },[])

    const fetchProducts = async () => {
        axios.get(`https://shielded-wildwood-82973.herokuapp.com/products.json`)
        .then( res => {
            console.log('axiosres', res);
            setFetchedProducts(res.data.products);
        }).catch( error => {
            console.log('prod error',error);
            fetchProducts();
        });
    }
    
    const fetchVouchers = async () => {
        axios.get(`https://shielded-wildwood-82973.herokuapp.com/vouchers.json`)
        .then( res => {
            console.log('axiosresVoucher', res);
            setFetchedVouchers(res.data.vouchers);
        }).catch( error => {
            console.log('voucher',error);
            fetchVouchers();
        });
    }
   
console.log('fetchProd',fetchedProducts);
console.log('fetchVouchers',fetchedVouchers);

    return (
        <div className="HomePage container">
                { fetchedProducts && 
                    <ProductContainer products={fetchedProducts}/>
                }  
            <CartContainer selectedProducts={fetchedProducts}/>
        </div>
    );
};
    export default HomePage;