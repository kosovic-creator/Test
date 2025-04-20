import { ukloniArtikal } from "@/actions/artikli.actions";
import ToastHandler from "@/components/ToastHandler";
import Link from 'next/link';
import { notFound } from 'next/navigation';
export const fetchCache = 'force-no-store';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const prod = await ukloniArtikal(parseInt(id));

  if (!prod) {
    notFound();
  }

  <ToastHandler message={`Product with ID ${id} has been successfully deleted.`} />
    return (
      <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Ukloni Artikal</h1>
        <form className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <p>Artikal sa ID {id} biće uklonjen.</p>
          <Link href="/admin/artikli"  className="text-blue-800 underline">Vrati se na stranu Artikli</Link>
        </form>
      </div>


      </>
    );
  }



