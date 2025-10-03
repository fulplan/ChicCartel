import FilterSidebar from '../FilterSidebar';

export default function FilterSidebarExample() {
  return (
    <div className="max-w-xs p-4">
      <FilterSidebar
        onFilterChange={(filters) => console.log('Filters changed:', filters)}
      />
    </div>
  );
}
