import LoginForm from '@/components/LoginForm';
import Link from 'next/link';
import { getCsrfToken } from "next-auth/react"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

interface Props {
  csrfToken: string;
}

export default function LoginPage({ csrfToken }: Props) {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm csrfToken={csrfToken} />
        <p>No account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken()
  return {
    props: {
      csrfToken: csrfToken ? csrfToken : null,
    },
  }
}
