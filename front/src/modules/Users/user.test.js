import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'

import { AllUsers } from './AllUsers';

const currentOwner = {
    avatar: null,
    email: "owner3@eventbrite.com",
    firstName: "Owner3",
    lastName: "lol",
    organizationId: "O3",
    role: "Owner",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im93bmVyMyIsInJvbGUiOiJPd25lciIsIm5iZiI6MTYwMTEzNTMyNSwiZXhwIjoxNjAxNzQwMTI1LCJpYXQiOjE2MDExMzUzMjV9.imZhUNrfj7hHfNOdO7QJDJ8-U6Byu1JJbxh5N6nSsRY",
    userId: "owner3",
}

configure({ adapter: new Adapter() });

describe("AllUsers Page ", () => {

    const mockStore = configureStore()
    let store = mockStore()

    it('should render', () => {
        const wrapper = mount(<BrowserRouter><Provider store={store}><AllUsers/></Provider></BrowserRouter>)
        expect(wrapper.exists()).toBeTruthy()
    })

});