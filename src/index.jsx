import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader/root';
import {configureStore} from '@src/redux/store';
import App from './App';

const store = configureStore();

const Set = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

const RendererApp = hot(Set);

ReactDOM.render(<RendererApp />, document.getElementById('root'));
