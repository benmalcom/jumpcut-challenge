import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from '../../components/SideBar';
import InfoBar from '../../components/InfoBar';
import SequencerInfo from '../../components/SequencerInfo';
import { activateSequencer, updateEmittedSequence, clearEmittedSequence } from '../../redux/actions/sequencer';
import sequencers, { generator, pipedSeq, pipelinesConfig } from '../../utils/sequencers';

const propTypes = {
	activateSequencer: PropTypes.func.isRequired,
	clearEmittedSequence: PropTypes.func.isRequired,
	currentSequencer: PropTypes.object,
	currentId: PropTypes.number,
	emittedValues: PropTypes.arrayOf(PropTypes.number),
};
const defaultProps = {
	currentSequencer: null,
	currentId: null,
	emittedValues: [],
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPipelineId: '',
			inputs: {},
			hideMoreButton: false,
			argsCount: 0,
		};
		this.onNewSequencer = this.onNewSequencer.bind(this);
		this.onNextBtnClick = this.onNextBtnClick.bind(this);
		this.handlePipelineSelect = this.handlePipelineSelect.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.hideMoreButton = this.hideMoreButton.bind(this);
		this.addMoreInput = this.addMoreInput.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.currentSequencer) {
			return {
				argsCount: state.argsCount || props.currentSequencer.arguments
			};
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps && prevProps.currentSequencer && prevProps.currentSequencer.id !== this.props.currentSequencer.id) {
			this.setState({inputs: {}, argsCount: this.props.currentSequencer.arguments});
		}
	}

	addMoreInput() {
		this.setState((state) => ({argsCount: Number(state.argsCount) + 1}));
	}

	onNewSequencer(sequencerId) {
		this.props.clearEmittedSequence();
		this.props.activateSequencer(sequencerId);
		this.setState({currentPipelineId: ''});
	}

	handlePipelineSelect(e) {
		const value = e.target.value;
		if (value) {
			this.setState({currentPipelineId: value});
		}
	}

	hideMoreButton() {
		this.setState(({hideMoreButton: true}));
	}

	onInputChange(e) {
		const {target} = e;
		this.setState((state) => ({
			inputs: {
				...state.inputs,
				[target.name]: Number(target.value),
			}
		}));
	}

	onNextBtnClick(resetGenerator = false) {
		const {currentSequencer} = this.props;
		const {currentPipelineId} = this.state;
		let functionArgs = [];
		if (Object.values(this.state.inputs).length) {
			functionArgs = Object.values(this.state.inputs);
		}
		let gen = null;
		if (currentPipelineId) {
			const pipeline = pipelinesConfig.find((item) => item.id === Number(currentPipelineId));
			if (pipeline) {
				const _pipedSeq = pipedSeq.call(pipedSeq, currentSequencer.functionRef, ...functionArgs)
					.pipeline(pipeline.pipelineRef)
					.invoke();
				gen = generator(_pipedSeq);
			}
		} else {
			gen = generator(currentSequencer.functionRef, ...functionArgs);
		}
		if(resetGenerator) {
			gen.reset();
			this.props.clearEmittedSequence();
		} else {
			const value = gen.next();
			this.props.updateEmittedSequence(value);
			this.hideMoreButton();
		}
	}

	handleResetClick() {
		this.onNextBtnClick(true);
		this.setState({currentPipelineId: '', inputs: {}});
	}

	render() {
		const {currentPipelineId, hideMoreButton, argsCount, inputs} = this.state;
		return (
			<Col md={9} className="mx-auto mt-5 app">
				<Row>
					<Col md="3">
						<SideBar
							sequencers={sequencers}
							onClick={this.onNewSequencer}/>
					</Col>
					<Col md="9" className="content-inner">
						<div className="info-bar">
							<InfoBar sequencer={this.props.currentSequencer}/>
						</div>
						<div className="current-sequencer">
							{this.props.currentSequencer && <SequencerInfo
								argsCount={argsCount}
								inputs={inputs}
								currentPipelineId={currentPipelineId}
								onPipelineChange={this.handlePipelineSelect}
								onNextBtnClick={() => this.onNextBtnClick()}
								onMoreBtnClick={this.addMoreInput}
								onResetBtnClick={this.handleResetClick}
								emittedValues={this.props.emittedValues}
								onInputChange={this.onInputChange}
								hideMoreButton={hideMoreButton}
								sequencer={this.props.currentSequencer}/>}
						</div>
					</Col>
				</Row>
			</Col>
		);
	}
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const stateProps = (state) => ({
	currentSequencer: state.sequencers.current,
	currentId: state.sequencers.currentId,
	emittedValues: state.sequencers.emittedValues,
});

const dispatchProps = {
	activateSequencer,
	clearEmittedSequence,
	updateEmittedSequence,
};

export default connect(stateProps, dispatchProps)(Home);
