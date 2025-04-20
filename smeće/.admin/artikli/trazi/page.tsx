'use client';
import { useState } from "react";
import { prikaziArtiklPoNazivu } from "@/actions/artikli.actions";

export default function SearchartikalPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [artikal, setartikal] = useState<any>(null);
  const [message, setMessage] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setartikal(null);

    try {
      const result = await prikaziArtiklPoNazivu(searchTerm);
      if (result) {
        setartikal(result);
      } else {
        setMessage("Nije nađen artikal sa tim nazivom.");
      }
    } catch (error) {
      console.error("Greška pri traženju artikla:", error);
      setMessage("Greška pri traženju artikla.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tražim Artikal</h1>
      <form onSubmit={handleSearch} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Unesite naziv Artikla"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Traži
        </button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}

      {artikal && (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h2 className="text-gray-700">Naziv:  {artikal.naziv}</h2>
          <p className="text-gray-700">Cijena: €{artikal.cijena}</p>
        </div>
      )}
    </div>
  );
}