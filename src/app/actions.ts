
'use server';

import { generateImageFromPrompt } from '@/ai/flows/generate-image-from-prompt';

export async function generateImageAction(prompt: string): Promise<{
  imageDataUri: string | null;
  error: string | null;
}> {
  try {
    if (!prompt) {
      return { imageDataUri: null, error: 'Prompt is required.' };
    }
    const result = await generateImageFromPrompt({ prompt });
    if (!result.imageDataUri) {
      throw new Error('The AI model did not return an image.');
    }
    return { imageDataUri: result.imageDataUri, error: null };
  } catch (e: unknown) {
    console.error('Error in generateImageAction:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { imageDataUri: null, error: `Failed to generate image: ${errorMessage}` };
  }
}
