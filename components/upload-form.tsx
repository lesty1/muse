"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getArtCritique } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Sparkles, Wand2, UploadCloud } from "lucide-react";

const formSchema = z.object({
  image: z
    .instanceof(File, { message: "Image is required." })
    .refine((file) => file.size > 0, "Image is required.")
    .refine(
      (file) => file.size < 5 * 1024 * 1024,
      `File size must be less than 5MB.`
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, and .webp formats are supported."
    ),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500, { message: "Description cannot be longer than 500 characters."}),
  feedbackRequests: z.string().min(10, {
    message: "Feedback requests must be at least 10 characters.",
  }).max(500, { message: "Feedback requests cannot be longer than 500 characters."}),
});

export function UploadForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [critiqueResult, setCritiqueResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      feedbackRequests: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setCritiqueResult(null);
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("description", values.description);
      formData.append("feedbackRequests", values.feedbackRequests);
      
      const result = await getArtCritique(formData);
      
      if (result && result.critique) {
        setCritiqueResult(result.critique);
        setIsModalOpen(true);
      } else {
        throw new Error("Failed to generate critique.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-start">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artwork Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center justify-center w-full">
                         <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent transition-colors">
                            {imagePreview ? (
                                <Image src={imagePreview} alt="Preview" width={256} height={256} className="w-full h-full object-contain rounded-lg p-2" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB)</p>
                                </div>
                            )}
                            <Input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                        </label>
                      </div> 
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your artwork, its story, or the character depicted."
                          className="resize-none"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide some context for your fanart.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="feedbackRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specific Feedback Requests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'How is my composition?', 'Is the color palette effective?', 'Critique my anatomy.'"
                          className="resize-none"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormDescription>
                        Tell the AI what you want feedback on.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Critique
            </Button>
          </div>
        </form>
      </Form>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-headline">
              <Sparkles className="text-primary w-6 h-6" />
              Your AI Art Critique
            </DialogTitle>
            <DialogDescription>
              Here is the AI-generated feedback for your artwork. Use it to learn and grow!
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto rounded-md border bg-secondary/30 p-4 mt-4">
             {critiqueResult && critiqueResult.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
