import React from 'react';
import Form from './Form';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Form />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><Form /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Form/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});