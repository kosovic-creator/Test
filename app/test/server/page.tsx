
import { db } from "@/prisma/db";

export default async function Page() {
  const foods = await db.test.findMany();

  return (
    <ul>
      {foods.map(food => (
        <li key={food.id}>{food.name}</li>
      ))}
    </ul>
  );
}