import React from 'react';
import Error from './Error';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Error />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><Error /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Error/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});