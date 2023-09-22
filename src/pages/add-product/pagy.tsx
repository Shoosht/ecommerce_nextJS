import React, { useState } from 'react';
import clientPromise from '../../lib/mongodb';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Navbar from '../../components/navbar/page';
import styles from './add-product.module.css';

type ConnectionStatus = {
  isConnected: boolean;
};

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

export default function AddProduct({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [jsonInput, setJsonInput] = useState('');
  const [insertedCount, setInsertedCount] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/insert-multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: jsonInput }),
      });

      if (response.ok) {
        const result = await response.json();
        setInsertedCount(result.insertedCount);
        setJsonInput('');
      } else {
        console.error('Error inserting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.containerHome}>
        <div>
          <form onSubmit={handleSubmit}>
            <label>Paste JSON Array:</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <br />
            <input type="submit" />
          </form>
          {insertedCount !== null && (
            <p>{insertedCount} objects inserted successfully</p>
          )}
        </div>
      </div>
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
  );
}
