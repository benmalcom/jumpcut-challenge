import React from 'react';
import { shallow } from '../../setupTests';
import App from '../../components/App';
describe('<App/>', () => {
	it('Should render correctly', () => {
		const component = shallow(<App/>);
		expect(component.exists()).toBe(true);
	});
});
