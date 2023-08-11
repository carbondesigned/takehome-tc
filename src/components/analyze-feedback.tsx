'use client';

import {useEffect, useState} from 'react';
import LoadingSpinner from './ui/spinner';
import {Button} from './ui/button';

export default function AnalyzeFeedback() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);

  async function fetchData() {
    setLoading(true);
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

  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <h2 className='text-lg font-bold my-4 text-black/75'>
        Analyze student feedback to get a quick summary
      </h2>
      <Button
        className='my-4'
        onClick={() => {
          fetchData();
        }}
      >
        Analyze
      </Button>

      {loading ? (
        <div className='h-screen w-full flex justify-center'>
          <LoadingSpinner />
        </div>
      ) : (
        <p>{data.summary}</p>
      )}
    </div>
  );
}
