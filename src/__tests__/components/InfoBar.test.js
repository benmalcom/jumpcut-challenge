import React from 'react';
import { shallow } from '../../setupTests';
import InfoBar from '../../components/InfoBar';
describe('<InfoBar/>', () => {
	it('Should render correctly', () => {
		const component = shallow(<InfoBar/>);
		expect(component.exists()).toBe(true);
	});
});
