import React from 'react';
import Header from './Header';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Header />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><Header /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Header/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});