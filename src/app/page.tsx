'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='max-w-3xl mx-auto'>
      <Link href='/grade'>
        <Button>Submit a Grade</Button>
      </Link>
    </main>
  );
}
