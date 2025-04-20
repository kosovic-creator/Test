'use client';

import React, { useEffect, useState } from 'react';
import { getUserById } from '@/actions/index'; // Adjust the import path as necessary
import { useParams } from 'next/navigation';

const UserDetails: React.FC = () => {
  const { id } = useParams(); // Assuming you're using Next.js
  const numericId = typeof id === 'string' ? parseInt(id, 10) : NaN;

  const [user, setUser] = useState<{
    id: number;
    name: string;
    username: string;
    email: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isNaN(numericId)) {
        console.error("Invalid ID in URL:", id);
        setError("Neispravan id.");
        return;
      }

      try {
        const fetchedUser = await getUserById(numericId);
        setUser(fetchedUser);
      } catch (err: any) {
        setError(err.message || 'Greška pri učitavanju korisnika.');
      }
    };

    fetchUser();
  }, [numericId, id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Učutavam korisničke podateke...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Detalji Korisnika</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">ID</td>
            <td className="py-2 px-4 border-b">{user.id}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Ime i Prezime</td>
            <td className="py-2 px-4 border-b">{user.name}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Korisničko Ime</td>
            <td className="py-2 px-4 border-b">{user.username}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Email</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  //   <div className="flex flex-col items-center justify-center min-h-screen"></div>
  //     <h1 className="text-3xl font-bold mb-6">Detalji Korisnika</h1>
  );
};

export default UserDetails;