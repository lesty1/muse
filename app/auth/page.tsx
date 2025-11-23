'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signInWithGoogle } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";
import { useUser } from "@/firebase";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24px"
            height="24px"
        >
            <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.651-3.356-11.303-8H6.389c3.298,9.574,12.938,16,23.611,16L24,44z"
            />
            <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.85,44,30.34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
        </svg>
    );
}

export default function AuthPage() {
    const router = useRouter();
    const { user, isUserLoading } = useUser();
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast();

    React.useEffect(() => {
        if (isUserLoading) {
            return; // Wait until user state is determined
        }
        if (user) {
            router.push('/'); // If user is already logged in, redirect
        }
    }, [user, isUserLoading, router]);

    const handleAuthError = (error: unknown) => {
        let title = "An unexpected error occurred.";
        let description = "Please try again.";

        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/invalid-credential":
                    title = "Sign In Failed";
                    description = "The credentials provided are incorrect.";
                    break;
                case 'auth/popup-closed-by-user':
                    title = 'Sign-in Cancelled';
                    description = 'The sign-in window was closed before completing.';
                    break;
                case "auth/operation-not-allowed":
                    title = "Authentication Not Enabled";
                    description = "Google Sign-in is not enabled for this project. Please contact support.";
                    break;
                case "auth/email-already-in-use":
                    title = "Email In Use";
                    description = "This email is already associated with an account.";
                    break;
                default:
                    title = "Authentication Error";
                    description = error.message;
                    break;
            }
        }
        
        toast({
            variant: "destructive",
            title: title,
            description: description,
        });
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            router.push('/');
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">Join or Sign In to Muse</CardTitle>
                    <CardDescription>
                       Sign in with your Google account to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" disabled={loading}>
                        {loading ? 'Signing in...' : <><GoogleIcon className="mr-2" />Sign in with Google</>}
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                        More ways to sign in coming soon!!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}