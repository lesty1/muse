import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "/ month",
        description: "For hobbyists and beginners exploring the world of art.",
        features: ["Access to community forums", "Upload up to 5 artworks", "Basic AI critiques"],
        isCurrent: true,
    },
    {
        name: "Pro",
        price: "$15",
        period: "/ month",
        description: "For serious artists and professionals looking to level up.",
        features: [
            "Unlimited artwork uploads",
            "Advanced, in-depth AI critiques",
            "Priority access to new features",
            "Sell on the marketplace (coming soon)",
        ],
        isCurrent: false,
    },
];

export default function SubscriptionPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <Button asChild variant="outline">
                    <Link href="/settings">
                        <ArrowLeft className="mr-2" />
                        Back to Settings
                    </Link>
                </Button>
            </div>

            <div className="text-center mb-12">
                <CreditCard className="mx-auto h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl font-headline font-bold">Manage Subscription</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Choose the plan that's right for your artistic journey.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {plans.map((plan) => (
                    <Card key={plan.name} className={plan.isCurrent ? "border-primary border-2" : ""}>
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
                            <div className="flex items-baseline">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-muted-foreground">{plan.period}</span>
                            </div>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <Check className="text-green-500 w-5 h-5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            {plan.isCurrent ? (
                                <Button disabled className="w-full">
                                    Current Plan
                                </Button>
                            ) : (
                                <Button className="w-full">
                                    <Star className="mr-2" />
                                    Upgrade to Pro
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
