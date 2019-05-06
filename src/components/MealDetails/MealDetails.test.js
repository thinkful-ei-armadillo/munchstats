import React from 'react';
import MealDetails from './MealDetails';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<MealDetails />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><MealDetails /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><MealDetails /></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});