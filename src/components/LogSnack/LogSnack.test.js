import React from 'react';
import LogSnack from './LogSnack';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<LogSnack />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><LogSnack /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><LogSnack /></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});