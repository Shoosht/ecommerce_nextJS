import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import cart_icon from '../../../public/shopping_cart.svg';
import styles from './ProductPage.module.css';
import { Product } from '../../../types/product';
import Navbar from '../../../components/navbar/page';
import Footer from '../../../components/footer/page';
import { AuthContextProvider } from '../context/auth-context';

import { setLocalStorageItem, getLocalStorageItem } from '../../../components/localStorage';

export default function ProductPage() {
  const router = useRouter();
  const { productId } = router.query;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/single-product/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  const addToCart = (product: Product | null) => {
    if (!product) {
      return; // Handle the case where product is null or undefined
    }

    // Get the existing cart items from localStorage (or initialize an empty array)
    const existingCartItems = getLocalStorageItem('cartItems') || [];

    // Add the new product to the cart
    existingCartItems.push(product);

    // Save the updated cart items back to localStorage
    setLocalStorageItem('cartItems', existingCartItems);
  };

  if (!product) {
    // You can add a loading indicator or message here while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <div className={styles.productPage}>
          <div className={styles.productContainer}>
            <div className={styles.productImageWrapper}>
              <img className={styles.productImage} src={product.image_link} alt="Product Image" />
            </div>

            <div className={styles.productInfo}>
              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.productPrice}>${product.price}</p>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.productIcons}>
                <div className={styles.cartIconWrapper} onClick={() => addToCart(product)}>
                  <Image className={styles.cartIcon} src={cart_icon} alt="Cart Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}
