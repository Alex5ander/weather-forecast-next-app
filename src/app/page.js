import Weather from './weather';

async function getData(q) {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=${
      process.env.API_KEY
    }&q=${encodeURI(q)}&aqi=no&lang=pt`;

    const request = await fetch(url, { next: { revalidate: 1 } });

    const json = await request.json();
    return json;
  } catch (error) {
    return null;
  }
}

export default async function Home({ searchParams }) {
  const data = searchParams.q ? await getData(searchParams.q) : null;

  return (
    <div className="items-center justify-between flex flex-col p-4">
      <main className="flex flex-col gap-y-4 w-full">
        <form className="inline-flex justify-center gap-x-4">
          <input
            className="rounded-full p-4 outline-none shadow-md w-full sm:w-1/2 outline-offset-0 hover:outline-cyan-500 focus:outline-cyan-400"
            placeholder="Buscar"
            type="text"
            name="q"
            autoComplete="off"
          />

          <button
            className="p-5 bg-white rounded-full shadow-md hover:scale-105 focus:outline-cyan-400 focus:outline"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
        {searchParams.q &&
          (data != null && !data?.error ? (
            <Weather data={data} />
          ) : (
            <p className="text-center text-red-500 font-bold text-xl">
              Nenhum resultado encontrado
            </p>
          ))}
      </main>
    </div>
  );
}
