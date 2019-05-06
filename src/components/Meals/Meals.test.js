import React from 'react';
import Meals from './Meals';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Meals />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><Meals /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Meals /></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});