import React from 'react';
import { Badge, Jumbotron } from 'reactstrap';
import PropTypes from 'prop-types';

const InfoBar =  ({ sequencer }) => {
	return (<div>
		<Jumbotron>
			<h1>Sequencer Generator</h1>
			{sequencer ? (<div>
				Current Sequencer: <Badge pill className="m-1" color="info">{sequencer.label}</Badge>
			</div>) : <p className="lead">Hi, choose a sequencer in the left sidebar to see the output</p>}
		</Jumbotron>
	</div>);
};
InfoBar.propTypes = {
	sequencer: PropTypes.object,
};
InfoBar.defaultProps = {
	sequencer: null,
};

export default InfoBar;
