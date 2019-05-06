import React from 'react';
import LogMeals from './LogMeals';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<LogMeals />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><LogMeals /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><LogMeals /></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});