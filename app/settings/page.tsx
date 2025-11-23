import { Settings, User, CreditCard, Accessibility, Palette, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Settings className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-headline font-bold">Settings</h1>
      </div>

      <div className="grid gap-8">
        <Link href="/settings/account" className="block transition-all hover:scale-[1.02] hover:shadow-lg rounded-lg">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="w-6 h-6" />
                <CardTitle>Account</CardTitle>
              </div>
              <CardDescription>
                Manage your account settings, email, and password.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/settings/accessibility" className="block transition-all hover:scale-[1.02] hover:shadow-lg rounded-lg">
          <Card>
            <CardHeader>
               <div className="flex items-center gap-3">
                <Palette className="w-6 h-6" />
                <CardTitle>Appearance & Accessibility</CardTitle>
              </div>
              <CardDescription>
                Adjust theme, and other accessibility settings.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/settings/security" className="block transition-all hover:scale-[1.02] hover:shadow-lg rounded-lg">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>
                Manage your account security settings.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/settings/subscription" className="block transition-all hover:scale-[1.02] hover:shadow-lg rounded-lg">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6" />
                <CardTitle>Subscription</CardTitle>
              </div>
              <CardDescription>
                Manage your billing and subscription plan.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

      </div>
    </div>
  );
}
