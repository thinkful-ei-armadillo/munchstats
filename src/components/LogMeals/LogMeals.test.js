import React from 'react';
import LogMeals from './LogMeals';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

describe('<LogMeals />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><LogMeals /></MemoryRouter>);
  });
});