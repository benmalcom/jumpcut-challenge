import React from 'react';
import { Badge, Jumbotron } from 'reactstrap';
import PropTypes from 'prop-types';

const InfoBar =  ({ sequencer, currentPipeline }) => {
	return (<div>
		<Jumbotron>
			<h1>Sequencer Generator</h1>
			{sequencer ? (<div>
				Current Sequencer: <Badge className="m-1" color="info">{sequencer.label}</Badge>
				{currentPipeline && <span className="ml-3">Current Pipeline: <Badge className="m-1" color="secondary">{currentPipeline.label}</Badge></span>}
			</div>) : <p className="lead">Hi, choose a sequencer in the left sidebar to see the output</p>}
		</Jumbotron>
	</div>);
};
InfoBar.propTypes = {
	sequencer: PropTypes.object,
	currentPipeline: PropTypes.object,
};
InfoBar.defaultProps = {
	sequencer: null,
	currentPipeline: null,
};

export default InfoBar;
