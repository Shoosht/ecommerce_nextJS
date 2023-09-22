import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cart_icon from '../../public/shopping_cart.svg';
import { UserAuth } from "../../src/pages/context/auth-context";
import { AuthContextProvider } from '../../src/pages/context/auth-context';
import { setLocalStorageItem, getLocalStorageItem } from '../localStorage';
import styles from "./index.module.css";

interface Product {
  _id: string;
  title: string;
  price: number;
  image_link: string;
  description: string;
}

interface IndexPageProps {
  change: () => void | (() => void);
}

export default function IndexPage({ change }: IndexPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const { user, googleSignIn } = UserAuth();
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product: Product | null) => {
    if (!product) {
      return;
    }

    const existingCartItems = getLocalStorageItem('cartItems') || [];
    existingCartItems.push(product);
    setLocalStorageItem('cartItems', existingCartItems);

    change();
  };

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

  // Function to filter products based on the search input
  const filterProducts = () => {
    if (!searchInput) {
      setFilteredProducts([]);
      return;
    }

    const searchTerm = searchInput.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  // Function to reset the search and show all products
  const resetSearch = () => {
    setSearchInput('');
    setFilteredProducts([]);
  };

  return (
    <div>
      <AuthContextProvider>
        <div className={styles.search_bar_container}>
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button onClick={filterProducts}>Search</button>
          <button onClick={resetSearch}>Reset</button>
        </div>

        <div className={styles.product_wrapper}>
          <div className={styles.product_space}>
            {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
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
                {!user ? (
                  <div className={styles.product_icons}>
                    <div className={styles.cart_icon_wrapper}>
                      <Image
                        onClick={() => handleSignIn()}
                        className={styles.cart_icon}
                        src={cart_icon}
                        alt="Cart Icon"
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.product_icons}>
                    <div className={styles.cart_icon_wrapper}>
                      <Image
                        onClick={() => handleAddToCart(product)}
                        className={styles.cart_icon}
                        src={cart_icon}
                        alt="Cart Icon"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </AuthContextProvider>
    </div>
  );
}
