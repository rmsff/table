import React from 'react';
import { Button, Icon, Modal, Input } from 'antd';
import { uniqueId } from 'lodash';

export default ({
	onIsVisibleModal,
	isVisibleModal,
	isLoading,
	formElements,
	onChangeInput,
	onAddRecord,
	isDisableBtn,
}) => {
	const modalForm = () => (
		<div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
			{formElements.map(({ type, input }) => (
				<div key={type}>
					<p>type</p>
					<Input value={input} onChange={onChangeInput} typecol={type} />
				</div>
			))}
		</div>
	);

	return (
		<div className="header">
			<Button size={'large'} onClick={onIsVisibleModal} disabled={isLoading}>
				<Icon type="plus" />
				Добавить
			</Button>
			<Modal
				title={'Добавить в таблицу'}
				visible={isVisibleModal}
				onCancel={onIsVisibleModal}
				onOk={onAddRecord}
				okText={'Добавить в таблицу'}
				okButtonProps={{ disabled: isDisableBtn }}
				width="1000">
				{modalForm()}
			</Modal>
		</div>
	);
};
