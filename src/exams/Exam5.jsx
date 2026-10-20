import { memo, useCallback, useEffect, useMemo, useState } from "react";

const CATEGORIES = ["Electronics", "Books", "Clothing"];

// Generated once at module level, not during each render.
const PRODUCTS = Array.from({ length: 600 }, (_, index) => ({
  id: index + 1,
  name: `Product ${String(index + 1).padStart(3, "0")}`,
  category: CATEGORIES[index % CATEGORIES.length],
  price: 100 + ((index * 137) % 5000),
}));

const ProductList = memo(function ProductList({ products, onSelect }) {
  // Diagnostic logging for the required render demonstration.
  console.count("ProductList render");

  return (
    <ul className="item-list product-list">
      {products.map((product) => (
        <li key={product.id}>
          <div>
            <strong>{product.name}</strong>
            <p>
              {product.category} | ₱{product.price.toFixed(2)}
            </p>
          </div>

          <button onClick={() => onSelect(product)}>Select</button>
        </li>
      ))}
    </ul>
  );
});

export default function Exam5() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [counter, setCounter] = useState(0);
  const [project, setProject] = useState("Study");
  const [selection, setSelection] = useState(null);

  const visibleProducts = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    const filtered = PRODUCTS.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(searchText);
      const matchesCategory =
        category === "all" || product.category === category;

      return matchesQuery && matchesCategory;
    });

    // Sort a new array without mutating the source data.
    return [...filtered].sort((first, second) =>
      sortOrder === "ascending"
        ? first.price - second.price
        : second.price - first.price
    );
  }, [query, category, sortOrder]);

  const handleSelect = useCallback(
    (product) => {
      setSelection({
        product,
        project,
      });
    },
    [project]
  );

  // Analytics is an effect, not part of the memoized calculation.
  useEffect(() => {
    console.info("Product search analytics", {
      query,
      category,
      sortOrder,
      resultCount: visibleProducts.length,
    });
  }, [query, category, sortOrder, visibleProducts]);

  return (
    <section>
      <div className="actions">
        <button onClick={() => setCounter((previous) => previous + 1)}>
          Unrelated counter: {counter}
        </button>
      </div>

      <label htmlFor="product-query">Search products</label>
      <input
        id="product-query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try Product 01"
      />

      <label htmlFor="product-category">Category</label>
      <select
        id="product-category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="all">All categories</option>
        {CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label htmlFor="product-sort">Sort by price</label>
      <select
        id="product-sort"
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value)}
      >
        <option value="ascending">Lowest price first</option>
        <option value="descending">Highest price first</option>
      </select>

      <label htmlFor="selection-project">Selection project</label>
      <select
        id="selection-project"
        value={project}
        onChange={(event) => setProject(event.target.value)}
      >
        <option value="Study">Study</option>
        <option value="Work">Work</option>
      </select>

      {selection && (
        <p role="status">
          Selected {selection.product.name} for {selection.project}.
        </p>
      )}

      <p>{visibleProducts.length} products found</p>

      <ProductList products={visibleProducts} onSelect={handleSelect} />
    </section>
  );
}