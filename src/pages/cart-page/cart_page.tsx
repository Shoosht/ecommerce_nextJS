import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/navbar/page';
import Footer from '../../../components/footer/page';
import { AuthContextProvider } from '../context/auth-context';
import { getLocalStorageItem, setLocalStorageItem } from '../../../components/localStorage';
import styles from './cart_page.module.css';

// Define the Product type
interface Product {
  title: string;
  price: number;
  image_link: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]); // State to store cart items
  const [newItem, setNewItem] = useState(''); // State to store the new item being added
  const [number, setNumber] = useState(0);


  
  useEffect(() => {
    // Function to get cart items from local storage
    const getCartItems = () => {
      const items = getLocalStorageItem('cartItems') as Product[]; // Cast the result to Product[]
      return items;
    };

    // Retrieve cart items from local storage
    const items = getCartItems();
    setCartItems(items);
  }, []);

  // Function to remove an item by index
  const removeItem = (indexToRemove: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(indexToRemove, 1); // Remove the item at the specified index
    setCartItems(updatedCartItems);
    setLocalStorageItem('cartItems', updatedCartItems);
    setNumber(updatedCartItems.length); 
  };

  // Function to add a new item to the cart
  const addItem = (newItemData: Product) => {
    const updatedCartItems = [...cartItems, newItemData]; // Add the new item to the cart
    setCartItems(updatedCartItems);
    setLocalStorageItem('cartItems', updatedCartItems); // Update local storage
    setNewItem(''); // Clear the input field
    setNumber(updatedCartItems.length);
  };

  return (
    <div>
      <AuthContextProvider>
        <Navbar number={number}/>

        <div className="cart-items">
        {cartItems.map((product, index) => (
          <div key={index} className="cart-item">
            <div className="cart-image">
              <img className={styles.product_image} src={product.image_link} alt="Image" />
            </div>
            <div className="cart-info">
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => removeItem(index)}>Remove</button>
              <button onClick={() => addItem(product)}>Add Another</button> {/* Add this button */}
            </div>
          </div>
        ))}
        </div>

        {/* Form to add a new item */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Create a new item object based on your data structure
            const newItemData: Product = {
              title: newItem, // You can customize this based on your product data structure
              price: 0, // Customize the price as needed
              image_link: '', // Add an image link if available
            };
            addItem(newItemData);
          }}
        >
          
        </form>

        <Footer />
      </AuthContextProvider>
    </div>
  );
}
