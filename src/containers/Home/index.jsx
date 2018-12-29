import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from '../../components/SideBar';
import InfoBar from '../../components/InfoBar';
import SequencerInfo from '../../components/SequencerInfo';
import { activateSequencer, updateEmittedValues, clearEmittedValues } from '../../redux/actions/sequencer';
import sequencers, { generator, pipedSeq, pipelinesConfig } from '../../utils/sequencers';

const propTypes = {
	activateSequencer: PropTypes.func.isRequired,
	clearEmittedValues: PropTypes.func.isRequired,
	currentSequencer: PropTypes.object,
	currentId: PropTypes.number,
	emittedValues: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.number),
		PropTypes.arrayOf(PropTypes.object),
	]),
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
			currentPipeline: null,
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
		this.resetSequencerInputs = this.resetSequencerInputs.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.currentSequencer) {
			return {
				argsCount: state.argsCount || props.currentSequencer.arguments,
			};
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('prevState ', prevState.currentPipeline);
		console.log('this.state ', this.state.currentPipeline);
		if (prevProps && prevProps.currentSequencer && prevProps.currentSequencer.id !== this.props.currentSequencer.id) {
			this.setState({
				inputs: {},
				argsCount: this.props.currentSequencer.arguments,
				currentPipeline: null,
			});
		}
	}

	resetSequencerInputs() {
		this.setState({currentPipeline: null, inputs: {}});
	}

	addMoreInput() {
		this.setState((state) => ({argsCount: Number(state.argsCount) + 1}));
	}

	onNewSequencer(sequencerId) {
		this.props.clearEmittedValues();
		this.resetSequencerInputs();
		this.props.activateSequencer(sequencerId);
	}

	handlePipelineSelect(e) {
		const {emittedValues} = this.props;
		const value = e.target.value;
		if (value) {
			const pipeline = pipelinesConfig.find((item) => item.id === Number(value));
			if (pipeline) {
				this.setState({currentPipeline: pipeline}, () => {
					if (emittedValues && emittedValues.length) {
						this.props.clearEmittedValues();
					}
				});
			}
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
		const {currentPipeline} = this.state;
		let functionArgs = [];
		if (Object.values(this.state.inputs).length) {
			functionArgs = Object.values(this.state.inputs);
		}
		let gen = null;
		if (currentPipeline) {
			const _pipedSeq = pipedSeq.call(pipedSeq, currentSequencer.functionRef, ...functionArgs)
				.pipeline(currentPipeline.pipelineRef)
				.invoke();
			gen = generator(_pipedSeq);
		} else {
			gen = generator(currentSequencer.functionRef, ...functionArgs);
		}
		if (resetGenerator) {
			gen.reset();
			this.props.clearEmittedValues();
			this.resetSequencerInputs();
		} else {
			const value = gen.next();
			this.props.updateEmittedValues(value);
			this.hideMoreButton();
		}
	}

	handleResetClick() {
		this.onNextBtnClick(true);
	}

	render() {
		const {
			hideMoreButton, argsCount, inputs, currentPipeline
		} = this.state;
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
							<InfoBar currentPipeline={currentPipeline} sequencer={this.props.currentSequencer}/>
						</div>
						<div className="current-sequencer">
							{this.props.currentSequencer && <SequencerInfo
								argsCount={argsCount}
								inputs={inputs}
								currentPipeline={currentPipeline}
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
	clearEmittedValues,
	updateEmittedValues,
};

export default connect(stateProps, dispatchProps)(Home);
