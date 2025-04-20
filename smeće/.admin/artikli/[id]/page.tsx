import { prikaziArtikalId } from "@/actions/artikli.actions";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ArtikalId({ params }: PageProps) {
  const { id } =await params;

  try {
    const artikal = await prikaziArtikalId(Number(id));

    if (!artikal) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-6">PArtikal nije nađen</h1>
          <p>Nema artikla sa unjetim ID {id}.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Artikal</h1>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">{artikal.naziv}</h2>
          <p className="text-gray-700">Cijena: €{artikal.cijena}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Greška</h1>
        <p>Greška pri učitavanju artikla, Probajte ponovo.</p>
      </div>
    );
  }
}