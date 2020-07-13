import React, {useState,useEffect} from 'react';
import axios from 'axios';
import CartContainer from '../../containers/CartContainer/CartContainer'
import ProductContainer from '../../containers/ProductContainer/ProductContainer'
import './HomePage.scss';
const HomePage = () => {

    const [fetchedProducts,setFetchedProducts] = useState([]);
    const [fetchedVouchers,setFetchedVouchers] = useState([]);
    const [insertedVouchers,setInsertedVouchers] = useState([]);
    const [subTotalPrice,setSubTotalPrice] = useState(0);
    let [products, setProducts] = useState([]);
    let values = { subtotal: subTotalPrice, shipping:10, discount:20, total:100}
    
    useEffect(() =>{
        fetchProducts();
        fetchVouchers();

    }, []);

    useEffect( () => {
        insertReservedData();
    },[fetchedProducts]);
    
    // Fetch Data Functions
    const fetchProducts = () => {
        axios.get(`https://shielded-wildwood-82973.herokuapp.com/products.json`)
        .then( res => {
            console.log('axiosres', res);
            setFetchedProducts(res.data.products);
        }).catch( error => {
            console.log('prod error',error);
            fetchProducts();
        });
    }
    
    const fetchVouchers = () => {
        axios.get(`https://shielded-wildwood-82973.herokuapp.com/vouchers.json`)
        .then( res => {
            console.log('axiosresVoucher', res);
            setFetchedVouchers(res.data.vouchers);
        }).catch( error => {
            console.log('voucher',error);
            fetchVouchers();
        });
    }
    // End Fetch Functions

    


    const insertReservedData = ( ) => {
        const arrayWithReserved = [];
        fetchedProducts.map( (product) => {
            const productWithReserved = {...product, reserved: 0}
            arrayWithReserved.push(productWithReserved);
        })
        setProducts(arrayWithReserved);
    }
    
    const getProductIndex = (id) =>  {
        const prodIndex = products.findIndex(prod => prod.id === id);
        return prodIndex;
    }
    const addProductsToCart = (id) => {
        let selectedProduct = products[getProductIndex(id)];
        if(selectedProduct.available > 0) {
            selectedProduct.available = selectedProduct.available - 1;
            selectedProduct.reserved = selectedProduct.reserved + 1;
        }
        let updatedArrayProducts = products.filter( (prod) => prod.id !== id);
        updatedArrayProducts = [...updatedArrayProducts, selectedProduct];
        setProducts(updatedArrayProducts);
    }

    const quantityHandler = (id, operation) => {
            
            const prodIndex = products.findIndex(prod => prod.id === id);
            let updatedProducts = [...products];
            let updatedAvailable = updatedProducts[prodIndex].available;
            let updatedReserved = updatedProducts[prodIndex].reserved;
            if (operation === 'plus') {
                if ( updatedAvailable > 0 ) {
                    updatedAvailable =  updatedAvailable - 1;
                    updatedReserved = updatedReserved + 1; 
                }
                else {
                    alert('Ooops, looks like that product is out of stock :( ' );
                }
            } else  {
                if ( updatedAvailable >= 0 ) {
                    updatedAvailable = updatedProducts[prodIndex].available + 1;
                    updatedReserved = updatedProducts[prodIndex].reserved - 1; 
                }
            }
            updatedProducts[prodIndex] = {...updatedProducts[prodIndex], available: updatedAvailable, reserved: updatedReserved  }
            setProducts(updatedProducts);
            totalPriceCalculator();
        }

        const totalPriceCalculator = () => {
                const selectedProducts = products.filter( (prod) => ( prod.reserved > 0));
                let finalPrice = selectedProducts.reduce ((accumulator, currentProduct) => {
                    accumulator += currentProduct.price*currentProduct.reserved;
                    return accumulator;
            },0)

            setSubTotalPrice(finalPrice);
        }

        const handleSubmit = (voucher) => {
            setInsertedVouchers([...insertedVouchers, voucher]);
        }
        console.log('== fwtched ==', fetchedProducts);
        console.log('== prodInCart ==', products);
        console.log('== vouchers ==', insertedVouchers);
        
   


    return (
        <div className="HomePage container">
                { products && 
                    <ProductContainer products={products} isCart={false} addProduct={addProductsToCart} />
                }  
            
            <div className="CartArea">
                <CartContainer products={products} quantityHandler={quantityHandler} values={values} handleSubmit={handleSubmit} />
                <div className="CartArea__checkoutButton">
                    <button> CHECKOUT </button>
                </div>
            </div>
        </div>
    );
};
    export default HomePage;