'use client';

import {useEffect, useState} from 'react';
import LoadingSpinner from './ui/spinner';
import {Button} from './ui/button';

export default function AnalyzeFeedback() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  async function fetchData() {
    try {
      const response = await fetch('/api/analyzeFeedback');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  //   if (loading)
  //     return (
  //       <div className='h-screen w-full flex justify-center'>
  //         <LoadingSpinner />
  //       </div>
  //     );
  //   if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <Button
        onClick={() => {
          fetchData();
        }}
      >
        Analyze
      </Button>

      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
