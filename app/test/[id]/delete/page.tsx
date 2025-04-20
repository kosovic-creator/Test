'use client';
import React from 'react';
import { deleteById } from '@/action/actions';
import Link from 'next/link';

export const fetchCache = 'force-no-store';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const [id, setId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then(({ id }) => setId(id));
  }, [params]);

  const handleDelete = async () => {
    if (id) {
      await deleteById(parseInt(id));
    
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Ukloni Korisnika</h2>
        <form className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <p>Korisnik sa ID {id} biće uklonjen.</p>
          {/* <button onClick={handleDelete}>Porvrdi Brisanje</button> */}
          <Link href="/test" className="text-red-800 p-8">Vrati se</Link>
          <Link href="/test" className="text-blue-800 underline">
            <button onClick={handleDelete}>Porvrdi Brisanje</button>
          </Link>
        </form>
      </div>
    </>
  );
}




