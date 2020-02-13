import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';

import { tableActions } from 'redux/actions';
import { Table } from 'components';

const mapStateToProps = ({ table: { items, isLoading } }) => ({ data: items, isLoading });

const TableContainer = ({ data, isLoading }) => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const [sortedInfo, setSortedInfo] = useState({});

	const handleChange = (_pagination, _filters, sorter) => setSortedInfo(sorter);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = clearFilters => {
		clearFilters();
		setSearchText('');
	};

	let searchInput = {};
	const getColumnSearchProps = dataIndex => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => {
						searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}>
					Search
				</Button>
				<Button
					onClick={() => handleReset(clearFilters)}
					size="small"
					style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.select());
			}
		},
		render: text =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			) : (
				text
			),
	});

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			width: '11%',
			sorter: (a, b) => a.id - b.id,
			sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
			ellipsis: true,
			...getColumnSearchProps('id'),
		},
		{
			title: 'firstName',
			dataIndex: 'firstName',
			key: 'firstName',
			width: '16%',
			sorter: (a, b) => (a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : 1),
			sortOrder: sortedInfo.columnKey === 'firstName' && sortedInfo.order,
			ellipsis: true,
			...getColumnSearchProps('firstName'),
		},
		{
			title: 'lastName',
			dataIndex: 'lastName',
			key: 'lastName',
			width: '16%',
			sorter: (a, b) => (a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1),
			sortOrder: sortedInfo.columnKey === 'lastName' && sortedInfo.order,
			ellipsis: true,
			...getColumnSearchProps('lastName'),
		},
		{
			title: 'email',
			dataIndex: 'email',
			key: 'email',
			width: '20%',
			sorter: (a, b) => (a.email.toLowerCase() < b.email.toLowerCase() ? -1 : 1),
			sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
			ellipsis: true,
			...getColumnSearchProps('email'),
		},
		{
			title: 'phone',
			dataIndex: 'phone',
			key: 'phone',
			width: '20%',
			sorter: (a, b) => a.phone.replace(/-|\(|\)/g, '') - b.phone.replace(/-|\(|\)/g, ''),
			sortOrder: sortedInfo.columnKey === 'phone' && sortedInfo.order,
			ellipsis: true,
			...getColumnSearchProps('phone'),
		},
	];
	const expandedRowRender = ({
		firstName,
		lastName,
		description,
		address: { streetAddress, city, state, zip } = {},
	}) => {
		const noData = 'Нет данных';
		return (
			<>
				<p>
					Выбран пользователь: <b>{`${firstName} ${lastName}`}</b>
				</p>
				<p>Описание:</p>
				<textarea
					style={{ width: '500px', height: '70px' }}
					value={description || noData}
					readOnly
				/>
				<p>
					Адрес проживания: <b>{streetAddress || noData}</b>
				</p>
				<p>
					Город: <b>{city || noData}</b>
				</p>
				<p>
					Провинция/штат: <b>{state || noData}</b>
				</p>
				<p>
					Индекс: <b>{zip || noData}</b>
				</p>
			</>
		);
	};

	return (
		<Table
			columns={columns}
			data={data}
			setSortedInfo={setSortedInfo}
			onChange={handleChange}
			expandedRowRender={expandedRowRender}
			isLoading={isLoading}
		/>
	);
};

export default connect(mapStateToProps, tableActions)(TableContainer);
