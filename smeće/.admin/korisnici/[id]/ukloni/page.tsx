
import { deleteById} from "@/actions/index";
import ToastHandler from "@/components/ToastHandler";
import Link from 'next/link';
import { notFound } from 'next/navigation';
export const fetchCache = 'force-no-store';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {

    const { id } = await params;

    const handleDelete = async () => {
      await deleteById(parseInt(id));
     // ili router.push("/login")
    };



//   if (deletionResult === undefined) {
//     notFound();
//   }

//   <ToastHandler message={`Product with ID ${id} has been successfully deleted.`} />
    return (
      <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Ukloni Korisnika</h2>
        <form className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <p>Korisnik sa ID {id} biće uklonjen.</p>
          {/* <button onClick={handleDelete}>Porvrdi Brisanje</button> */}
          <Link href="/admin/korisnici"  className="text-red-800 p-8 ">Vrati se</Link>
          <Link href="/admin/korisnici"  className="text-blue-800 underline"> <button onClick={handleDelete}>Porvrdi Brisanje</button></Link>
        </form>
      </div>


      </>
    );
  }


