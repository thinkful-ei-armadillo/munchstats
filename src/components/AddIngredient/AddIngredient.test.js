import React from 'react';
import AddIngredient from './AddIngredient';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<AddIngredient />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><AddIngredient /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><AddIngredient/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});