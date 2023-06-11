import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import getListings from "./actions/getListings";

export default async function Home() {
  const listings = await getListings();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing: any) => (
            <div key={listing.id}>{listing.title}</div>
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
