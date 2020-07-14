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
    const [shippingPrice,setShippingPrice] = useState(0);
    const [totalWeight,setTotalWeight] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    let [totalDiscount,setTotalDiscount] = useState(0);
    let [products, setProducts] = useState([]);
    let values = { subtotal: subTotalPrice, shipping:shippingPrice, discount: totalDiscount , total:totalPrice}
    
    useEffect(() =>{
        fetchProducts();
        fetchVouchers();

    }, []);

    useEffect( () => {
        insertReservedData();
    },[fetchedProducts]);

    useEffect( () => {
        getTotalPrice();
        shippingHandler();
    },[subTotalPrice]);
    
 
    useEffect ( () => {
        voucherHandler();
    },[insertedVouchers]);
    // Fetch Data Functions
    const fetchProducts = () => {
        axios.get(`https://shielded-wildwood-82973.herokuapp.com/products.json`)
        .then( res => {
            setFetchedProducts(res.data.products);
        }).catch( error => {
            fetchProducts();
        });
    }
    
    const fetchVouchers = () => {
        axios.get(`https://shielded-wildwood-82973.herokuapp.com/vouchers.json`)
        .then( res => {
        }).catch( error => {
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
                },0);
                
                let finalWeight = selectedProducts.reduce ((accumulator, currentProduct) => {
                    accumulator += currentProduct.reserved;

                    return accumulator;
                },0)

    

            setSubTotalPrice(finalPrice);
            setTotalWeight(finalWeight);
        }

        const handleSubmit = (voucher) => {
            const alreadyInserted = insertedVouchers.find( (voucherItem) => voucher === voucherItem);
            if (!alreadyInserted) 
            setInsertedVouchers([...insertedVouchers, voucher]);
            else{
                alert(' Sorry, this voucher is already activated.');
            }
        }

        const voucherHandler = () => {
            debugger;
            if(fetchedVouchers.length !== 0) {    
                if (insertedVouchers.includes(fetchedVouchers[0].code)) {
                    setTotalPrice(totalPrice*0.7);
                    setTotalDiscount(totalDiscount += totalPrice*0.3);
                }

                if (insertedVouchers.includes(fetchedVouchers[1].code)) {
                    if(totalPrice < 100) {
                        setTotalPrice(0);
                    }else {
                        setTotalPrice(totalPrice - 100);
                    }
                    setTotalDiscount(totalDiscount += 100);
                }

                if (insertedVouchers.includes(fetchedVouchers[2].code) && totalPrice > fetchedVouchers[2].minValue) {
                    setShippingPrice(0);
                } else if(insertedVouchers.includes(fetchedVouchers[2].code)) { 
                    alert('This voucher is elegible only for purchases above $300.50 ')
                    let deniedVoucherArray = insertedVouchers.filter((voucher) => voucher !== fetchedVouchers[2].code);
                    setInsertedVouchers(deniedVoucherArray);
                }
            }
        }
        const getTotalPrice = () => {
            setTotalPrice( subTotalPrice + shippingPrice - values.discount);
        }
       

        const shippingHandler = ( ) => {
            
            if( subTotalPrice > 400) {
                setShippingPrice(0);
            }
            
            if (totalWeight <= 10) {
                setShippingPrice(30);
            }
            
            if (totalWeight > 10 && subTotalPrice <= 400) {
                const price = 30 + (((totalWeight - 10)%5)*7);
                setShippingPrice(price);
            }
        }


    return (
        <div className="HomePage container">
                { products && 
                    <ProductContainer products={products} isCart={false} addProduct={addProductsToCart} />
                }  
            
            <div className="CartArea">
                <CartContainer products={products} quantityHandler={quantityHandler} values={values} handleSubmit={handleSubmit}/>
                <div className="CartArea__checkoutButton">
                    <button onClick={() => alert('Your purchase was successful :) ')}> CHECKOUT </button>
                </div>
            </div>
        </div>
    );
};
    export default HomePage;