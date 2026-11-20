import React from 'react';

const CATEGORIES = [
  { value: 'electronics', label: 'Электроника' },
  { value: 'jewelery', label: 'Ювелирные изделия' },
  { value: "men's clothing", label: 'Мужская одежда' },
  { value: "women's clothing", label: 'Женская одежда' },
];

const MAX_SLIDER_PRICE = 1000;

export function Filters({ onFilterChange, initialFilters }) {
  // Массив выбранных категорий (самостоятельное задание 1)
  const [localCategories, setLocalCategories] = React.useState(initialFilters.categories || []);
  const [localMinPrice, setLocalMinPrice] = React.useState(
    initialFilters.minPrice !== undefined ? String(initialFilters.minPrice) : ''
  );
  const [localMaxPrice, setLocalMaxPrice] = React.useState(
    initialFilters.maxPrice !== undefined ? String(initialFilters.maxPrice) : ''
  );

  // Ошибки валидации
  const [errors, setErrors] = React.useState({});

  const toggleCategory = (categoryValue) => {
    setLocalCategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((item) => item !== categoryValue)
        : [...prev, categoryValue]
    );
  };

  const validate = () => {
    const errs = {};
    const min = localMinPrice !== '' ? Number(localMinPrice) : undefined;
    const max = localMaxPrice !== '' ? Number(localMaxPrice) : undefined;

    if (min !== undefined && min < 0) {
      errs.min = 'Цена не может быть отрицательной';
    }
    if (max !== undefined && max < 0) {
      errs.max = 'Цена не может быть отрицательной';
    }

    if (
      min !== undefined && max !== undefined &&
      min >= 0 && max >= 0 &&
      min > max
    ) {
      errs.min = 'Цена «от» не может быть больше цены «до»';
      errs.max = 'Цена «до» не может быть меньше цены «от»';
    }
    return errs;
  };

  const handleApply = () => {
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    onFilterChange({
      categories: localCategories,
      minPrice: localMinPrice !== '' ? Number(localMinPrice) : undefined,
      maxPrice: localMaxPrice !== '' ? Number(localMaxPrice) : undefined,
    });
  };

  const handleMinChange = (e) => {
    setLocalMinPrice(e.target.value);
    setErrors((prev) => ({ ...prev, min: '' }));
  };

  const handleMaxChange = (e) => {
    setLocalMaxPrice(e.target.value);
    setErrors((prev) => ({ ...prev, max: '' }));
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Категории</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            {CATEGORIES.map((cat) => (
              <label key={cat.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={localCategories.includes(cat.value)}
                  onChange={() => toggleCategory(cat.value)}
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Цена от</label>
          <input
            type="number"
            value={localMinPrice}
            onChange={handleMinChange}
            placeholder="0"
            min="0"
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              border: errors.min ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="range"
            min="0"
            max={MAX_SLIDER_PRICE}
            step="1"
            value={localMinPrice === '' ? 0 : Math.min(MAX_SLIDER_PRICE, Math.max(0, Number(localMinPrice)))}
            onChange={handleMinChange}
            style={{ width: '100%', marginTop: '8px', cursor: 'pointer' }}
            aria-label="Ползунок минимальной цены"
          />
          {errors.min && (
            <span style={{ color: 'red', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
              {errors.min}
            </span>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Цена до</label>
          <input
            type="number"
            value={localMaxPrice}
            onChange={handleMaxChange}
            placeholder="1000"
            min="0"
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              border: errors.max ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="range"
            min="0"
            max={MAX_SLIDER_PRICE}
            step="1"
            value={localMaxPrice === '' ? MAX_SLIDER_PRICE : Math.min(MAX_SLIDER_PRICE, Math.max(0, Number(localMaxPrice)))}
            onChange={handleMaxChange}
            style={{ width: '100%', marginTop: '8px', cursor: 'pointer' }}
            aria-label="Ползунок максимальной цены"
          />
          {errors.max && (
            <span style={{ color: 'red', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
              {errors.max}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleApply}
        style={{
          padding: '10px 24px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Применить фильтры
      </button>
    </div>
  );
}
