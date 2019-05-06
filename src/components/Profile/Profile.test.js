import React from 'react';
import Profile from './Profile';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Profile />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><Profile /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Profile /></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});