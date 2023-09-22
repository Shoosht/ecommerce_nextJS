import React, { useState } from 'react';
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Navbar from '../../components/navbar/page';
import styles from './add-product.module.css';

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
  try {
    await clientPromise;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function addProduct({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [image_link, setImage_link] = useState('');
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');  
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(''); 
  const [subcategory, setSubcategory] = useState('');
  


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_link, title, description, price, category, subcategory }), // Send form data as JSON
      });

      if (response.ok) {
        setImage_link('');
        setTitle('');
        setDescription('');
        setPrice(0);
        setCategory('');
        setSubcategory('');
      } else {
        console.error('Error inserting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <div className={styles.container}>
      <Navbar></Navbar>
      <div className={styles.containerHome}>
        <div>
          <form onSubmit={handleSubmit}>

          <label>Image adress:</label>
            <input
              type="text"
              value={image_link}
              onChange={(e) => setImage_link(e.target.value)}
            />
            <br />
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <br />
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label>Subcategory:</label>
            <input
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            />
            <br />

            <input type="submit" />
          </form>
        </div>
      </div>
      <style jsx global>{`
        * {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }`}</style>
    </div>
    
  );
}


