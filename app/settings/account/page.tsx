'use client';

import { useUser } from '@/firebase/auth/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { KeyRound, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function AccountSettingsPage() {
  const { user, loading } = useUser();
  const { toast } = useToast();

  const handleChangePassword = () => {
    // For now, we only support Google Auth.
    const isGoogleSignIn = user?.providerData.some(
      (provider) => provider.providerId === 'google.com'
    );

    if (isGoogleSignIn) {
      toast({
        title: "Signed in with Google",
        description: "To change your password, please visit your Google Account settings.",
      });
    } else {
      // Logic for password reset email would go here if email/password auth was enabled
      toast({
        title: "Password Change",
        description: "Functionality to change password for email accounts is coming soon.",
      });
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/settings">
            <ArrowLeft className="mr-2" />
            Back to Settings
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Your personal account details. This information is private.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input id="email" value={user?.email || 'No email provided'} readOnly disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  Password
                </Label>
                 <div className="flex items-center justify-between rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">
                        Your password is managed by your sign-in provider.
                    </p>
                    <Button variant="secondary" onClick={handleChangePassword}>
                        Change Password
                    </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
