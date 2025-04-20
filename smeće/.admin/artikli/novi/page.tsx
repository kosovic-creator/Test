
'use client';

import { useState } from 'react';
import { dodajArtikal } from "@/actions/artikli.actions";
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import dodajArtikalSchema from '@/types';

export default function NewProductPage() {
  const [naziv, setnaziv] = useState('');
  const [cijena, setcijena] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const productSchema = z.object({
    //   naziv: z.string().min(4, 'Product naziv is required'),
    //   cijena: z
    //     .string()
    //     .regex(/^\d+(\.\d{1,2})?$/, 'cijena must be a valid number with up to 2 decimal places'),
    // });
    try {
      // Validirajte unos pomoću Zod šeme
      dodajArtikalSchema.parse({ naziv, cijena });

      const cijenaNumber = parseFloat(cijena);

      await dodajArtikal({ naziv, cijena: cijenaNumber });

      setMessage('Artikal je uspješno dodat!');

      router.push(`/admin/artikli/`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Prikazivanje grešaka validacije
        setMessage(error.errors[0].message);
      } else {
        console.error('Greška pri dodavanju artikla:', error);
        setMessage('Ne može da doda artikal.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dodaj Novi Artikal</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <div className="mb-4">
          <label htmlFor="naziv" className="block text-gray-700 font-bold mb-2">
            Naziv
          </label>
          <input
            type="text"
            id="naziv"
            value={naziv}
            onChange={(e) => setnaziv(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cijena" className="block text-gray-700 font-bold mb-2">
            cijena
          </label>
          <input
            type="text"
            id="cijena"
            value={cijena}
            onChange={(e) => setcijena(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dodaj Artikal
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}