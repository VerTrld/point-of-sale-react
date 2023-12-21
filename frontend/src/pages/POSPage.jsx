import React, { useEffect,useState,useRef} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../Components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';


function POSPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const toastOptions = {
      autoClose: 400,
      pauseOnHover: true
    }

    const fetchProducts = async() => {
        setIsLoading(true);
    const result = await axios.get('/api/products');
    setProducts(await result.data);
        setIsLoading(false);
   }
   const addProductToCart = async(product) => {
         let findProductInCart = await cart.find(i=>{
          return i.id === product.id
         });

         if(findProductInCart){
          let newCart = [];
          let newItem;

          cart.forEach(cartItem => {
            if (cartItem.id === product.id) {
              newItem = {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalAmount: cartItem.price * (cartItem.quantity + 1),
              }
              newCart.push(newItem);
            }else{
              newCart.push(cartItem);
            }
          })
            setCart(newCart);
            toast(`Added ${newItem.name} to cart`, toastOptions);

         }
         else{
          let addingProduct = {
            ...product,
            'quantity': 1,
            'totalAmount': product.price,

          }
          setCart([...cart, addingProduct]);
          toast(`Added ${product.name} to cart`,toastOptions);

         }
   }
   const removeProduct = async (product) => {
     const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
     setCart(newCart);
     
   };

   const componentRef = useRef();

   const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
   });

   const handlePrint = () => {
    handleReactToPrint();
   }

    useEffect(() => {
        fetchProducts();
    },[]);

    useEffect(() => {
     let newTotalAmount =0;
     cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
     }) 
     setTotalAmount(newTotalAmount);
    },[cart]);


  return (
    <div>
<MainLayout>
        <div className='row'>
          <div className='col-lg-8'>
            {isLoading ? (
              'Loading'
            ) : (
              <div className='row mt-4'>
                {products.map((product, key) => (
                  <div key={key} className='col-lg-4 mb-4'>
                    <div className='border p-3 text-center bg-white shadow' onClick={()=> addProductToCart(product)}>
                      <p className='product-name'>{product.name}</p>
                      <img src={product.image} alt={product.name} className='img-fluid' width='120'/>
                      <p>P {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='col-lg-4 mt-4 '>
            <div style={{display: "none"}}>
              <ComponentToPrint  cart={cart} totalAmount={totalAmount} ref={componentRef}/>
            </div>
            <div className='table-responsive'>
              <table className='table table-borderless table-responsive shadow-sm text-center'>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total</td>
                    <td>Action</td>
                  </tr>

                </thead>
                <tbody>

                  {cart ? cart.map((cartProduct, key) => <tr>
                    <td>{cartProduct.name}</td>
                    <td>{cartProduct.price}</td>
                    <td>{cartProduct.quantity}</td>
                    <td>{cartProduct.totalAmount}</td>
                    <td>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => removeProduct(cartProduct)} height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                      </svg>
                      </td>

                  </tr>): 'No Item'}

                </tbody>
              </table>
              <h3>Total Amount: {totalAmount ? (totalAmount === 0 ? ' ' : `₱${totalAmount}`) : ' '}</h3>
              <div className='mt-3'>
                {totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>Pay Now</button>
                </div>: 'Please add the product to the cart'}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default POSPage
