'use client';
import { izmjeniArtikal, prikaziArtikalId } from "@/actions/artikli.actions";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const fetchCache = "force-no-store";

export default function IzmjeniArtikal() {
  const { id } = useParams();
  const [naziv, setnaziv] = useState("");
  const [cijena, setcijena] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
    const router = useRouter();

  // Fetch current product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const artikal = await prikaziArtikalId(Number(id));
        if (artikal) {
          setnaziv(artikal.naziv);
          setcijena(artikal.cijena.toString());

        } else {
          setMessage("Artikal nije nađen.");
        }
      } catch (error) {
        console.error("Greška pri učitavanju artikala:", error);
        setMessage("Greška pri učitavanju artikla .");
      }
    };

    fetchProduct();
  }, [id, router]);

  // Removed unused userId-related code

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!id) {
        setMessage("Nedostaje ID Artikla.");
        return;
      }

      const izmjenjenArtikal = await izmjeniArtikal(Number(id), {
        naziv,
        cijena: parseFloat(cijena),
      });

      setMessage("Artikal je uspješno izmjenjen!");
      router.push(`/admin/artikli/`);
      console.log("Izmjenjen Artikal:", izmjenjenArtikal);
    } catch (error) {
      setMessage("Greška pri izmjeni Artikla.");
      console.error("Greška pri izmjeni Artikla:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Izmjeni Artikal</h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-4">
        <div>
          <label htmlFor="naziv" className="block font-medium">
            Naziv:
          </label>
          <input
            type="text"
            id="naziv"
            value={naziv}
            onChange={(e) => setnaziv(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="cijena" className="block font-medium">
            Cijena:
          </label>
          <input
            type="number"
            id="cijena"
            value={cijena}
            onChange={(e) => setcijena(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Izmjena..." : "UIzmjeni Artikal"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}