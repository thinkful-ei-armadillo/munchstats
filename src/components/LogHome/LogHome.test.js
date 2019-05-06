import React from 'react';
import LogHome from './LogHome';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<LogHome />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><LogHome /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><LogHome/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});