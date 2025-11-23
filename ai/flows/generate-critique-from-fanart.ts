'use server';
/**
 * @fileOverview Generates a critique of fanart based on art fundamentals and specific feedback requests.
 *
 * - generateCritique - A function that generates a critique for uploaded fanart.
 * - GenerateCritiqueInput - The input type for the generateCritique function.
 * - GenerateCritiqueOutput - The return type for the generateCritique function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCritiqueInputSchema = z.object({
  fanartDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('Description of the artwork.'),
  feedbackRequests: z.string().describe('Specific feedback requests from the artist.'),
});
export type GenerateCritiqueInput = z.infer<typeof GenerateCritiqueInputSchema>;

const GenerateCritiqueOutputSchema = z.object({
  critique: z.string().describe('The AI-generated critique of the fanart.'),
});
export type GenerateCritiqueOutput = z.infer<typeof GenerateCritiqueOutputSchema>;

export async function generateCritique(input: GenerateCritiqueInput): Promise<GenerateCritiqueOutput> {
  return generateCritiqueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCritiquePrompt',
  input: {schema: GenerateCritiqueInputSchema},
  output: {schema: GenerateCritiqueOutputSchema},
  prompt: `You are an expert art critic providing constructive feedback on fanart.

  Consider art fundamentals such as composition, color theory, anatomy, and perspective.
  Address the artist's specific feedback requests.

  Fanart Description: {{{description}}}
  Feedback Requests: {{{feedbackRequests}}}
  Fanart Image: {{media url=fanartDataUri}}

  Provide a detailed critique with actionable insights to help the artist improve. Focus on both strengths and areas for improvement.
  The critique should be returned in a professional tone.
  `,
});

const generateCritiqueFlow = ai.defineFlow(
  {
    name: 'generateCritiqueFlow',
    inputSchema: GenerateCritiqueInputSchema,
    outputSchema: GenerateCritiqueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
