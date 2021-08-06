import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Hold from './components/Hold.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('hold was succesfuly created', function() {
  const testDiv = document.createElement('div');
  ReactDOM.render(<Hold />, testDiv);
})
