import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/page';
import IndexPage from '../../components/index_page/page';
import Footer from '../../components/footer/page';
import { AuthContextProvider } from './context/auth-context';
import { setLocalStorageItem, getLocalStorageItem } from '../../components/localStorage';

export default function Home() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const getCartItemCount = () => {
      const cartItems = getLocalStorageItem('cartItems') || [];
      return cartItems.length;
    };

    // Update the number when the component mounts
    setNumber(getCartItemCount());
  }, []);

  const handleNavUpdate = () => {
    // Move your getCartItemCount logic here
    const getCartItemCount = () => {
      const cartItems = getLocalStorageItem('cartItems') || [];
      return cartItems.length;
    };

    // Update the number when needed
    setNumber(getCartItemCount());
  };

  return (
    <>
      <div>
        <AuthContextProvider>
          <Navbar number={number}></Navbar>
          <IndexPage change={handleNavUpdate}></IndexPage>
          <Footer></Footer>
        </AuthContextProvider>

        <style jsx global>{`
          * {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
        `}</style>
      </div>
    </>
  );
}
