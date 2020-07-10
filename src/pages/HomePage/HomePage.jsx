import React, {useState,useEffect} from 'react';
import CartContainer from '../../containers/CartContainer/CartContainer'
import ProductContainer from '../../containers/ProductContainer/ProductContainer'
import './HomePage.scss';
const HomePage = () => {

    const [fetchedProducts,setFetchedProducts] = useState([]);
    const [fetchedVouchers,setFetchedVouchers] = useState([]);


    useEffect(() =>{
        fetch(`https://shielded-wildwood-82973.herokuapp.com/products.json`)
        .then((res) => res.json())
        .then(data => {
          setFetchedProducts(data);
          console.log('products',data);
        });

        fetch(`https://shielded-wildwood-82973.herokuapp.com/vouchers.json`)
        .then((res) => res.json())
        .then(data => {
          setFetchedVouchers(data);
          console.log(data);
        });
    },[])
    return (
        <div className="HomePage container">
            <ProductContainer products={fetchedProducts}/>
            <CartContainer />
        </div>
    );
};
    export default HomePage;