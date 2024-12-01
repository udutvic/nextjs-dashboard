import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page() {
  return (
    <main className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomersTable />
      </Suspense>
    </main>
  );
}