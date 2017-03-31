import ReactDOM from 'react-dom';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Spinner from '../src/index';

describe('Test Spinner', function() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
    });
    it('Test Spinner style', function() {
        let cp = ReactDOM.render(<Spinner />, container);
        //let spinner = TestUtils.findRenderedComponentWithType(cp, 'Spinner');
        let s = TestUtils.findRenderedComponentWithType(cp, Spinner);
        ReactDOM.findDOMNode(s).isSameNode(s).should.be.eql(true);
    })
})