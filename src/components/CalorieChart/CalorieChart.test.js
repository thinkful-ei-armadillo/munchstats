import React from 'react';
import CalorieChart from './CalorieChart';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<CalorieChart />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><CalorieChart /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><CalorieChart/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});