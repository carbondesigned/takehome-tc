'use client';

import {Button} from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/spinner';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/averageSubjectGrades');
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

    fetchData();
  }, []);

  if (loading)
    return (
      <div className='h-screen w-full flex justify-center'>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return (
    <main className='max-w-3xl mx-auto'>
      <ResponsiveContainer width='100%' height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey='name'
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Bar
            dataKey='total'
            fill='[#ffedd4, #ffb9a2]'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}
