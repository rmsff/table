import React from 'react';
import { connect } from 'react-redux';

import { tableActions } from 'redux/actions';
import { Table, Header } from './containers';
import './App.scss';

const mapStateToProps = ({ fetchData }) => ({ fetchData });

const App = ({ fetchData }) => {
	let isFirstRequest = true;
	if (isFirstRequest) {
		isFirstRequest = false;
		fetchData(1000);
	}
	return (
		<div className="app">
			<Header />
			<Table />
		</div>
	);
};

export default connect(mapStateToProps, tableActions)(App);
