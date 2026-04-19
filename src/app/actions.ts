"use server";

import { db } from "@/db";
import { bmiRecords } from "@/db/schema";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveBMIRecord(weight: number, height: number, bmi: number, category: string) {
  try {
    await db.insert(bmiRecords).values({
      weight,
      height,
      bmi,
      category,
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to save BMI record:", error);
    return { success: false, error: "Failed to save data" };
  }
}

export async function getBMIRecords() {
  try {
    const records = await db.select().from(bmiRecords).orderBy(desc(bmiRecords.createdAt)).limit(10);
    return { success: true, data: records };
  } catch (error) {
    console.error("Failed to fetch BMI records:", error);
    return { success: false, error: "Failed to fetch history" };
  }
}

export async function deleteBMIRecord(id: number) {
  try {
    const { eq } = await import("drizzle-orm");
    await db.delete(bmiRecords).where(eq(bmiRecords.id, id));
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete BMI record:", error);
    return { success: false, error: "Failed to delete" };
  }
}
