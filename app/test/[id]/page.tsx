
import { getTestById } from "@/action/actions";


interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
  const test = await getTestById(Number(id));

  return (
    <ul>
      {test ? (
        <li key={test.id}>{test.name}</li>
      ) : (
        <li>No test found</li>
      )}
    </ul>
  );
}