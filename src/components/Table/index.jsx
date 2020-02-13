import React from 'react';
import { Table } from 'antd';
import { uniqueId } from 'lodash';

export default ({ columns, data, onChange, expandedRowRender, isLoading }) => (<Table
		columns={columns}
		dataSource={data}
		onChange={onChange}
		pagination={{ pageSize: 50 }}
		rowKey={() => uniqueId('id')}
		expandedRowRender={expandedRowRender}
		loading={isLoading}
	/>)
