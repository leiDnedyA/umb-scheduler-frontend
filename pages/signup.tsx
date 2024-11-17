import SignupForm from '@/components/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <SignupForm />
        <p className="text-center text-sm">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
