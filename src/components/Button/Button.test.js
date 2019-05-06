import React from 'react';
import Button from './Button';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Button />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><Button /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Button/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});