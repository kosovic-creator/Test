
import { getTestById } from "@/action/actions";
import Link from "next/link";


interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
  const test = await getTestById(Number(id));
return (
    <>
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
          {test && (
            <tr key={test.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{test.id}</td>
              <td className="border border-gray-300 px-4 py-2">{test.name}</td>
              <td className="border border-gray-300 px-4 py-2">${test.price}</td>
              <td>
                <Link className='text-emerald-600' href={`/test/${test.id}/izmjeni`}>Prikaži</Link>
                <Link className='text-amber-700' href={`/test/${test.id}/delete`}>Ukloni</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Link href="/test" className="text-blue-800 underline">
            <button>Vrati se</button>
          </Link>
        </>
      );
    }