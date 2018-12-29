import React from 'react';
import { Alert, Badge, Button, Col, Input, Row } from 'reactstrap';
import { pipelinesConfig } from '../../utils/sequencers';

export default ({
					sequencer, emittedValues, onPipelineChange, currentPipelineId, argsCount, inputs,
					onInputChange, hideMoreButton, onNextBtnClick, onMoreBtnClick, onResetBtnClick,
					showPipelineSelector,
				}) => {
	return (<Col className="py-2">
		<Row>
			<Col md={12}>
				<Alert className="py-1" color="info">
					<small>{sequencer.instruction ? sequencer.instruction : 'Press the Next button below repeatedly to generate sequence of values'}.
						Also you can select a pipeline function optionally to act on the generated sequencers
					</small>
				</Alert>
			</Col>
			<Col md={1} className="m-1">
				<Button color="info" outline
						onClick={onNextBtnClick}
						disabled={!sequencer || (typeof sequencer.arguments === 'number' && Object.values(inputs).length < sequencer.arguments)}
						siz="sm">Next</Button>
			</Col>
			<Col md={1} className="m-1 mr-1">
				<Button color="danger" outline
						onClick={onResetBtnClick}
						disabled={!emittedValues.length}
						siz="sm">Reset</Button>
			</Col>
			{showPipelineSelector && <Col md={4} className="ml-3 mt-1">
				<select name="pipelineId" disabled={emittedValues.length} value={currentPipelineId}
						className="form-control"
						onChange={onPipelineChange}>
					<option>-- Select Pipeline --</option>
					{pipelinesConfig.map((pipeline) => <option key={pipeline.id}
														 value={pipeline.id}>{pipeline.label}</option>)}
				</select>
			</Col>}

			{argsCount > 0 && (Array(argsCount).fill(undefined)).map((value, index) =>
				<Col key={index} md={2} className="m-1 ml-3"><Input
					onChange={onInputChange}
					className="args-input"
					disabled={emittedValues.length}
					value={inputs[`args${index}`] || ''}
					type="number"
					placeholder="Number"
					name={`args${index}`}/></Col>)}
			{argsCount > 0 && !hideMoreButton && sequencer && sequencer.dynamicArgs && <Col md={1}>
				<Button color="link" onClick={onMoreBtnClick} siz="sm">More</Button>
			</Col>}
		</Row>

		{emittedValues.length > 0 && <Row className="mt-4">
			<Col>
				{emittedValues.map((value, index) => <Badge pill className="m-1" key={index}
															color="info">{(typeof value === 'object' && value.number) ? `${value.number} (isEven: ${value.status})` : value}</Badge>)}
			</Col>
		</Row>}
	</Col>);
}


