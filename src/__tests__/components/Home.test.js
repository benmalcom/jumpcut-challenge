import React from 'react';
import { shallow } from '../../setupTests';
import Home from '../../containers/Home';
describe('<Home/>', () => {
	it('Should render correctly', () => {
		const component = shallow(<Home/>);
		expect(component.exists()).toBe(true);
	});
});
