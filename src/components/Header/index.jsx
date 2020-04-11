import React from 'react';
import { Button, Icon, Modal, Input } from 'antd';

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
		<form id="form" className="form" onSubmit={onAddRecord}>
			<div className="form__body">
				{formElements.map(({ type, input }) => (
					<div key={type}>
						<p>{type}</p>
						<Input value={input} onChange={onChangeInput} typecol={type} />
					</div>
				))}
			</div>
			<div className="form__footer">
				<Input type="submit" value="+ Добавить в таблицу" disabled={isDisableBtn} />
			</div>
		</form>
	);

	return (
		<div className="header">
			<Button size="large" onClick={onIsVisibleModal} disabled={isLoading}>
				<Icon type="plus" />
				Добавить
			</Button>
			<Modal
				title={'Добавить в таблицу'}
				visible={isVisibleModal}
				onCancel={onIsVisibleModal}
				cancelButtonProps={{ hidden: true }}
				okButtonProps={{ hidden: true }}
				footer={null}
				width="1000">
				{modalForm()}
			</Modal>
		</div>
	);
};
