'use client';

import { useUser } from '@/firebase/auth/use-user';
import Link from 'next/link';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

type AuthButtonProps = {
  children: React.ReactElement;
  prompt?: string;
};

export default function AuthButton({ children, prompt }: AuthButtonProps) {
  const { user, loading } = useUser();

  if (loading) {
    // You can return a loader here if you want
    return <Skeleton className="h-10 w-24" />;
  }

  if (user) {
    return children;
  }

  if (prompt) {
    return (
        <Button asChild>
            <Link href="/auth">{prompt}</Link>
        </Button>
    )
  }

  const childProps = children.props;

  return (
    <Button {...childProps} asChild>
      <Link href="/auth">
        {childProps.children}
      </Link>
    </Button>
  );
}
