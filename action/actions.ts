
"use server";

import { db } from "@/prisma/db";

export async function getAllTests() {
  try {
    return await db.test.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching tests:", error);
    throw error;
  }
}

export async function createTestAction(
  formState: { message: string },
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const price = Number(formData.get("price") as string);
    if (isNaN(price)) {
      throw new Error("Invalid price value");
    }

    await db.test.create({ data: { name, price } });
  } catch (err: unknown) {
    return {
      message: "Nepoznata greška!",
    };
  }
}


export async function updateTestAction(
  formState: { message: string },
  formData: FormData,
  id: number
) {
  try {
    const name = formData.get("name") as string;

    const price = formData.get("price") as string;

    if (!name || !price) {
      return { message: "Sva polja su obavezna" };
    }

    await db.test.update({
      where: { id: typeof id === "string" ? Number(id) : id },
      data: { name, price: Number(price) },
    });
  } catch (err: unknown) {
    return {
      message: "Nepoznata greška!",
    };
  }
}
// Removed duplicate function to resolve redeclaration error

export async function deleteById(
  id: number
) {
  try {
    await db.test.delete({
      where: { id: typeof id === "string" ? Number(id) : id },
    });
  } catch (err: unknown) {
    return {
      message: "Nepoznata greška!",
    };
  }

  // pages/foods/index.js

}



  export async function getTestById(id: number) {
  try {
    return await db.test.findUnique({

        where: { id: Number(id) }, // Replace with the actual ID you want to fetch
      }) as { id: number; name: string; price: number } | null;


  }
  catch (error) {
    console.error("Error fetching test by ID:", error);
    throw error;
  }
}