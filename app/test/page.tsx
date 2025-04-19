'use client';
import React, { useEffect, useState } from 'react';
import { getAllTests } from '@/app/test/action/actions';
import Link from 'next/link';

const TestList: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const fetchedTests = await getAllTests();
        setTests(fetchedTests);
      } catch (err) {
        setError('Failed to fetch tests');
      }
    };



    fetchTests();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
    <Link className='text-emerald-900' href="/test/new">Dodaj</Link>
   <h1 className="text-3xl font-bold mb-6">Test</h1>
   <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl">
     <thead>
       <tr className="bg-gray-100">
         <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
         <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
         <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
         <th className="border border-gray-300 px-4 py-2 text-left"></th>
       </tr>
     </thead>
     <tbody>
       {tests.map((test: { id: number; name: string; price: number }) => (
         <tr key={test.id} className="hover:bg-gray-50">
           <td className="border border-gray-300 px-4 py-2">{test.id}</td>
           <td className="border border-gray-300 px-4 py-2">{test.name}</td>
           <td className="border border-gray-300 px-4 py-2">${test.price}</td>
           <td>
             <Link className='text-emerald-600' href={`/test/${test.id}/izmjeni`}>Prikaži</Link>
             <Link className='text-amber-700' href={`/test/${test.id}/delete`}>Ukloni</Link>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
  );
};
export default TestList;

