import React from 'react';
import { connect } from 'react-redux';

import { tableActions } from 'redux/actions';
import { Table, Header } from './containers';
import './App.css';

const mapStateToProps = ({ fetchData, table: { items, isLoading } }) => ({
	fetchData,
	data: items,
	isLoading,
});

const App = props => {
	const { fetchData, data, isLoading } = props;
	!data.length && !isLoading && fetchData(1000);
	return (
		<div className="app">
			<Header />
			<Table />
		</div>
	);
};

export default connect(mapStateToProps, tableActions)(App);
