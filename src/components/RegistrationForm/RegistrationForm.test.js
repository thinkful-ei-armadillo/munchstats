import React from 'react';
import RegistrationForm from './RegistrationForm';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<RegistrationForm />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><RegistrationForm /></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><RegistrationForm /></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});