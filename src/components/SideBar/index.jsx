import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

const SideBar = ({onClick, sequencers}) => {
	return (<ListGroup>
		{sequencers.map((sequencer) => (
			<ListGroupItem style={{cursor: 'pointer'}} key={sequencer.id}
						   onClick={() => onClick(sequencer.id)}>{sequencer.label}</ListGroupItem>))}
	</ListGroup>);
};
SideBar.propTypes = {
	onClick: PropTypes.func.isRequired,
	sequencers: PropTypes.arrayOf(PropTypes.object),
};
export default SideBar;
