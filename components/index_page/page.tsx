import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import styles from "./index.module.css";
import Link from 'next/link';
import Image from 'next/image';
import cart_icon from '../../public/shopping_cart.svg';
import { UserAuth } from "../../src/pages/context/auth-context";
import { AuthContextProvider } from '../../src/pages/context/auth-context';

export default function IndexPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { user, googleSignIn, logout } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
/*
  const handleAddToCart = (product: Product) => {
     Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      // Get the current cart data from local storage
      //const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Add the selected product to the cart
      const updatedCart = [...existingCart, product];

      // Save the updated cart back to local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AuthContextProvider>
        <div className={styles.product_wrapper}>
          <div className={styles.product_space}>
            {products.map((product) => (
              <div key={product._id} className={styles.product_container}>
                <Link href={`/page/${product._id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className={styles.product_image_wrapper}>
                    <img className={styles.product_image} src={product.image_link} alt="Image" />
                  </div>
                  <div className={styles.product_info}>
                    <div className={styles.product_title_container}>
                      <h2 className={styles.product_title}>{product.title}</h2>
                    </div>
                    <p className={styles.product_price}>${product.price}</p>
                  </div>
                  <p className={styles.product_description}>
                    Description:{" "}
                    {product.description.length > 200
                      ? product.description.slice(0, 196) + "..."
                      : product.description
                    }
                  </p>
                </Link>
                <div className={styles.product_icons}>
                  <div className={styles.cart_icon_wrapper}>
                    <Image
                      //onClick={() => handleAddToCart(product)}
                      className={styles.cart_icon}
                      src={cart_icon}
                      alt="Cart Icon"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AuthContextProvider>
    </div>
  );
}
