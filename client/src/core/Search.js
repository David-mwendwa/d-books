import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCategories } from './apiCore';
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

  const handleChange = () => {};

  const searchSubmit = () => {};

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
                style={{borderRadius: '4px'}}
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
    </div>
  );
};

export default Search;
