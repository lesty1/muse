
'use client';

import { useState, useEffect } from 'react';
import { User, Loader2, Eye, EyeOff } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/firebase';
import { updateUserProfile, reauthenticate } from '@/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { FirebaseError } from 'firebase/app';

export default function ProfilePage() {
  const { user, loading: userLoading } = useUser();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [initialUsername, setInitialUsername] = useState('');
  const [isUsernameDirty, setIsUsernameDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      // Assuming username might be stored elsewhere or is the same as displayName for now
      const currentUsername = user.displayName || '';
      setUsername(currentUsername);
      setInitialUsername(currentUsername);
      setAvatarPreview(user.photoURL || null);
    }
  }, [user]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setIsUsernameDirty(newUsername !== initialUsername);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    setIsSaving(true);

    try {
      if (isUsernameDirty) {
        if (!password) {
          toast({
            variant: "destructive",
            title: "Password Required",
            description: "Please enter your password to change your username.",
          });
          setIsSaving(false);
          return;
        }
        await reauthenticate(password);
      }

      await updateUserProfile({
        displayName: displayName !== user.displayName ? displayName : undefined,
        photoURL: newAvatarFile, // Passing the file to the update function
      });

      // After successful update in Auth, update local state
      if (isUsernameDirty) {
        setInitialUsername(username);
        setIsUsernameDirty(false);
        setPassword('');
      }


      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });

    } catch (error) {
      let title = "An error occurred";
      let description = "Could not save your changes. Please try again.";

      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          title = "Incorrect Password";
          description = "The password you entered is incorrect. Please try again.";
        } else if (error.code === 'auth/requires-recent-login') {
            title = "Session Expired";
            description = "For your security, please sign out and sign back in to continue.";
        }
      }
      
      toast({
        variant: "destructive",
        title: title,
        description: description,
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <User className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-headline font-bold">Customize Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Update your profile picture, username, and display name.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarPreview || undefined} />
              <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
            </Avatar>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Profile Picture</Label>
              <Input id="picture" type="file" onChange={handleAvatarChange} accept="image/*" />
               <p className="text-sm text-muted-foreground">Upload a new image for your avatar.</p>
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              placeholder="Your unique username"
              value={username}
              onChange={handleUsernameChange}
            />
             <p className="text-sm text-muted-foreground">This is your unique handle on Muse.</p>
          </div>

          {isUsernameDirty && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter password to confirm changes" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon"
                  className="absolute inset-y-0 right-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                For security, please enter your password to save changes to your username.
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input 
              id="displayName" 
              placeholder="Your display name" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
             <p className="text-sm text-muted-foreground">This name will be shown publicly.</p>
          </div>
           
          <Button onClick={handleSaveChanges} disabled={isSaving || userLoading}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
