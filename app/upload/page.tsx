import { UploadForm } from "@/components/upload-form";

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Share Your Art</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Upload your fanart and get instant, AI-powered critique to help you improve.
        </p>
      </div>
      <UploadForm />
    </div>
  );
}
