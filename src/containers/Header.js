import React, { useState } from 'react';
import { connect } from 'react-redux';

import { tableActions } from 'redux/actions';
import { Header } from 'components';

const mapStateToProps = ({ table: { items, isLoading } }) => ({ data: items, isLoading });

const TableContainer = ({ isLoading, addItems }) => {
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [inputId, setInputId] = useState('');
	const [inputFirstName, setInputFirstName] = useState('');
	const [inputLastName, setInputLastName] = useState('');
	const [inputEmail, setInputEmail] = useState('');
	const [inputPhone, setInputPhone] = useState('');

	const handleChangeInput = event => {
		event.preventDefault();
		const { value } = event.target;
		const typecol = event.target.getAttribute('typecol');
		const mapping = {
			id: setInputId,
			firstName: setInputFirstName,
			lastName: setInputLastName,
			email: setInputEmail,
			phone: setInputPhone,
		};
		mapping[typecol](value);
	};

	const handleIsVisibleModal = () => {
		setIsVisibleModal(!isVisibleModal);
		setInputId('');
		setInputFirstName('');
		setInputLastName('');
		setInputEmail('');
		setInputPhone('');
	};

	const handleAddRecord = (event) => {
		addItems({
			id: inputId,
			firstName: inputFirstName,
			lastName: inputLastName,
			email: inputEmail,
			phone: inputPhone,
		});
		setIsVisibleModal(false);
		event.preventDefault();
	};
	const formElements = [
		{ type: 'id', input: inputId },
		{ type: 'firstName', input: inputFirstName },
		{ type: 'lastName', input: inputLastName },
		{ type: 'email', input: inputEmail },
		{ type: 'phone', input: inputPhone },
	];

	const isDisableBtn = !(
		inputId.length &&
		inputFirstName.length &&
		inputLastName.length &&
		inputEmail.length &&
		inputPhone.length
	);

	return (
		<Header
			onIsVisibleModal={handleIsVisibleModal}
			isVisibleModal={isVisibleModal}
			isLoading={isLoading}
			formElements={formElements}
			onChangeInput={handleChangeInput}
			onAddRecord={handleAddRecord}
			isDisableBtn={isDisableBtn}
		/>
	);
};

export default connect(mapStateToProps, tableActions)(TableContainer);
