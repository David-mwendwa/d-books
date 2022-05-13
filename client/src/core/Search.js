import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCategories, list } from './apiCore';
import Card from './Card';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `${results.length} product(s) found`;
    }
    if (searched && !results.length) {
      return `No products found`;
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  return (
    <div className='row'>
      <div className='container mb-3'>
        <form onSubmit={searchSubmit}>
          <span className='input-group-text'>
            <div className='input-group input-group-lg'>
              <div className='input-group-prepend'>
                <select
                  onChange={handleChange('category')}
                  className='btn mr-2'
                  id=''>
                  <option value='All'>Pick Category</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type='search'
                style={{ borderRadius: '4px' }}
                className='form-control'
                placeholder='Search by name'
                onChange={handleChange('search')}
              />
            </div>
            <div className='btn input-group-append' style={{ border: 'none' }}>
              <button className='input-group-text'>Search</button>
            </div>
          </span>
        </form>
      </div>
      <div className='container-fluid mb-3'>
        <div>
          <h2 className='mt-4 mb-4'>{searchMessage(searched, results)}</h2>
          <div className='row'>
            {results &&
              results.map((product, i) => <Card product={product} key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
