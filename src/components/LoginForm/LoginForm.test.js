import React from 'react';
import LoginForm from './LoginForm';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<LoginForm />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><LoginForm /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><LoginForm /></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});