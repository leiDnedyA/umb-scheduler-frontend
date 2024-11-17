'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            router.push('/login');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex-1 rounded-lg bg-background px-6 pb-4 py-8">
                <h1 className="mb-3 text-2xl text-foreground">Sign Up</h1>
                {error && (
                    <div className="mb-4 text-sm text-red-500">
                        {error}
                    </div>
                )}
                <div className="w-full mb-6">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-foreground"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="block w-full rounded-md border border-input bg-background py-[9px] pl-4 text-sm outline-2 placeholder:text-muted-foreground text-foreground"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-foreground"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="block w-full rounded-md border border-input bg-background py-[9px] pl-4 text-sm outline-2 placeholder:text-muted-foreground text-foreground"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>


                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={loading}
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </div>
        </form>
    )
}
