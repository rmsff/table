import { axios } from 'core';

export default {
	getData: (count = 100) =>
		axios.get(
			`http://www.filltext.com/?rows=${count}&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
		),
};
