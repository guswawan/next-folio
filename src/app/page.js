import { Cards } from '@/components/Cards';
import { CreateCard } from '@/components/CreateCard';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const dynamic = 'force-dynamic';

async function getData() {
  const res = await fetch('https://v1.appbackend.io/v1/rows/WrVw2ULDhVjl', {
    // cache: 'no-store',
    // next: {
    //   revalidate: 60,
    // },
  });
  const data = res.json();
  return data;
}

export default async function Home() {
  const { data } = await getData();

  return (
    <>
      <Header></Header>
      <main>
        {/* <CreateCard /> */}
        <Cards data={data} />
      </main>
      <Footer />
    </>
  );
}
