import {notFound} from 'next/navigation';

// Can be imported from a shared config
export const locales = ['en', 'pt'] as const;

export type Locale = (typeof locales)[number];

// This will be used by next-intl
export default async function getMessages(locale: string) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}