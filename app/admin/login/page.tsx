'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password
    });

    if (!result?.ok) {
      setError('Échec de la connexion. Vérifiez vos identifiants.');
      setIsSubmitting(false);
      return;
    }

    router.replace('/admin');
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-6 py-24 lg:px-10">
      <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Connexion</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Espace administration</h1>
          <p className="text-neutral-700 leading-8">Connectez-vous pour gérer la succession des souverains, l’histoire et le contenu du site.</p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <label className="space-y-2 text-sm text-neutral-700">
            <span>Adresse e-mail</span>
            <input type="email" autoComplete="email" {...register('email')} required className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2" />
          </label>
          <label className="space-y-2 text-sm text-neutral-700">
            <span>Mot de passe</span>
            <input type="password" autoComplete="current-password" {...register('password')} required className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2" />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60" disabled={isSubmitting}>
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </button>
            <Link href="/admin" className="text-sm font-semibold text-brand-700 hover:underline">
              Retour au tableau de bord
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
