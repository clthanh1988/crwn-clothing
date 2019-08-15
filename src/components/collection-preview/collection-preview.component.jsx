import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => {
  const renderItems = items => {
    return items
      .filter((item, index) => index < 4)
      .map(item => {
        return <CollectionItem key={item.id} item={item} />;
      });
  };

  return (
    <div className='collection-preview'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <div className='preview'>{renderItems(items)}</div>
    </div>
  );
};

export default CollectionPreview;
