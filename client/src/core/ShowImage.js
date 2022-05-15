import React from 'react';

const ShowImage = ({ item, url, styles }) => (
  <div className='product-img'>
    <img
      src={`/api/v1/${url}/photo/${item._id}`}
      alt={item.name}
      className='mb-3'
      style={styles}
    />
  </div>
);

export default ShowImage;
