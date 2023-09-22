import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import search_icon from '../../public/search.svg';
import cart_icon from '../../public/shopping_cart.svg';
import login_icon from '../../public/login.svg';
import logout_icon from '../../public/logout.svg';
import logo_pic from '../../public/leenks_black.png';
import { UserAuth } from "../../src/pages/context/auth-context";
import { setLocalStorageItem, getLocalStorageItem } from '../../components/localStorage';
import { Product } from '../../types/product';
import styles from './navbar.module.css';
import Link from 'next/link';


interface NavbarProps {
  number?: number;
}

export default function Navbar({ number }: NavbarProps) {
  const router = useRouter();
  const { user, googleSignIn, logOut } = UserAuth();
  const [cartCount, setCartCount] = useState(number); // Initialize cartCount with the number prop
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    setCartCount(number); // Update cartCount when the number prop changes
  }, [number]);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Function to get the number of products from localStorage
    const getCartItemCount = () => {
      const cartItems = getLocalStorageItem('cartItems') || [];
      return cartItems.length;
    };

    // Update the number when the component mounts
    setCartCount(getCartItemCount());

    // Add an event listener to listen for changes in localStorage
    const handleStorageChange = () => {
      setCartCount(getCartItemCount());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addToCart = (product: Product | null) => {
    // Get the existing cart items from localStorage (or initialize an empty array)
    const existingCartItems = getLocalStorageItem('cartItems') || [];

    // Add the new product to the cart
    existingCartItems.push(product);

    // Save the updated cart items back to localStorage
    setLocalStorageItem('cartItems', existingCartItems);

    // Update the cart count
    setCartCount(existingCartItems.length);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.left}>
          
        </div>

        <div className={styles.middle}>
          <div className={styles.nav_logo} onClick={() => router.push('/')}>
            <Image className={styles.logo_pic} src={logo_pic} alt="Cart Icon" />
          </div>
        </div>
        {!user ? (
          <div className={styles.right}>
            <Image className={styles.cart_icon} src={cart_icon} alt="Cart Icon" />
            <Image onClick={handleSignIn} className={styles.login_icon} src={login_icon} alt="Login Icon" />
          </div>
        ) : (
          <div className={styles.right}>
            <Link href={`/cart-page/cart_page`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                <Image className={styles.cart_icon} src={cart_icon} alt="Cart Icon" />
            </Link>
            {cartCount !== undefined && cartCount > 0 && <span className={styles.cart_count}>{cartCount}</span>}
            <Image onClick={handleSignOut} className={styles.logout_icon} src={logout_icon} alt="Logout Icon" />
          </div>
        )}
      </div>

      <div className={styles.navbar_border}></div>
    </div>
  );
}
