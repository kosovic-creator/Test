'use client';
import React, { useState, useEffect } from 'react';
import { updateUserAction, getUserById } from '@/actions/index';
import { useParams } from 'next/navigation';

const UpdateUserForm: React.FC = () => {
  const { id } = useParams(); // Fetch the ID from the route parameters
  const numericId = typeof id === 'string' ? parseInt(id, 10) : NaN;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById(numericId);
        if (user) {
          setFormData({
            id: user.id.toString(),
            name: user.name || '',
            username: user.username || '',
            email: user.email || '',
            password: '', // Leave password empty for security reasons
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Failed to load user data.');
      }
    };

    if (!isNaN(numericId)) {
      fetchUserData();
    }
  }, [numericId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await updateUserAction({ message }, new FormData(e.currentTarget));
    setMessage(response.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Izmjeni Korisnika</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        {message && <p className="text-red-500">{message}</p>}
        <label>ID:</label>
        <input type="text" name="id" value={formData.id} onChange={handleChange} required readOnly className="border rounded p-2 w-full" />

        <label>Ime i Prezime:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="border rounded p-2 w-full" />

        <label>Korisničko Ime:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required className="border rounded p-2 w-full" />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="border rounded p-2 w-full" />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="border rounded p-2 w-full" />

        <button type="submit" className="rounded p-2 bg-black text-zinc-50 hover:bg-slate-800">Izmjeni Korisnika</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;