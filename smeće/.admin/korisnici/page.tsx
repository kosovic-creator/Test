 'use client';
import React, { useEffect, useState } from 'react';
import { getAllUsers } from "@/actions/index";
import Link from 'next/link';
import Delete from './[id]/ukloni/page';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Učitavam...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>

<div className="flex flex-col items-center justify-center min-h-screen">
       <Link className='text-emerald-900' href="/admin/korisnici/novi">Dodaj</Link>
      <h1 className="text-3xl font-bold mb-6">Lista Korisnika</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Ime i Prezime</th>
            <th className="py-2 px-4 border-b">Korisničko Ime</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td>
                  <Link className='text-emerald-600' href={`/admin/korisnici/${user.id}/izmjeni`}>Prikaži</Link>
                  <Link className='text-amber-700' href={`/admin/korisnici/${user.id}/ukloni`}>Ukloni</Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>


  );
  //   <div className="flex flex-col items-center justify-center min-h-screen"></div>
  //     <h1 className="text-3xl font-bold mb-6">Lista Korisnika</h1>
};

export default UserList;