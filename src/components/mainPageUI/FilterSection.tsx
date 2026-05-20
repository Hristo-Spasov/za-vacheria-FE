const FilterSection = () => {
  return (
    <section className="flex h-full w-full items-center justify-center p-8">
      {/* <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10"></div> */}
      <div className="grid h-full w-full gap-4 grid-cols-4 grid-rows-5">
        <aside className="col-span-1 row-span-5 bg-gray-200 rounded-lg shadow-md flex items-center justify-center"></aside>
        <div
          id="card-search-container"
          className="col-span-3 row-span-1 bg-gray-200 rounded-lg shadow-md flex items-center justify-start"
        >
          <div
            id="searchBar"
            className="p-3 rounded-full bg-orange-100"
          >
            Searchbar
          </div>
        </div>
        <div
          id="card-container"
          className="col-span-3 row-span-4 bg-gray-200 rounded-lg shadow-md flex items-center justify-center"
        >
          Cards Container
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
