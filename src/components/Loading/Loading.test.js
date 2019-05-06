import React from 'react';
import Loading from './Loading';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Loading />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><Loading /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Loading/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});