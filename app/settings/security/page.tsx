import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SecuritySettingsPage() {
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

             <div className="text-center mb-12">
                <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl font-headline font-bold">Security</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Manage your account's security settings.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                        Add an extra layer of security to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <p className="text-base font-medium">Status: Disabled</p>
                            <p className="text-sm text-muted-foreground">
                                Enable 2FA to protect your account from unauthorized access.
                            </p>
                        </div>
                        <Button disabled>Enable</Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
