import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';

const Directory = ({ sections }) =>  {
  const renderContent = () => {
    return sections.map(({ id, ...otherSectionProps }) => {
      return <MenuItem key={id} {...otherSectionProps} />;
    });
  }

  return <div className='directory-menu'>{renderContent()}</div>;
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
