import React from 'react';
import Back from './Back';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Back />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><Back /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Back/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});