"use server";

import { generateCritique } from "@/ai/flows/generate-critique-from-fanart";
import { z } from "zod";

const formSchema = z.object({
  image: z.instanceof(File),
  description: z.string(),
  feedbackRequests: z.string(),
});

export async function getArtCritique(formData: FormData) {
  try {
    const parsedData = formSchema.safeParse({
      image: formData.get("image"),
      description: formData.get("description"),
      feedbackRequests: formData.get("feedbackRequests"),
    });

    if (!parsedData.success) {
      throw new Error("Invalid form data");
    }

    const { image, description, feedbackRequests } = parsedData.data;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fanartDataUri = `data:${image.type};base64,${buffer.toString("base64")}`;

    const result = await generateCritique({
      fanartDataUri,
      description,
      feedbackRequests,
    });
    
    return result;

  } catch (error) {
    console.error("Error generating critique:", error);
    // In a real app, you might want to return a structured error response
    throw new Error("Failed to generate critique.");
  }
}
