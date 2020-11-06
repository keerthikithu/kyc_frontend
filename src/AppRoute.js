import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import HomePage from './components/HomePage'
import UploadDocuments from './components/UploadDocuments'
import LoginForm from "./components/LoginForm"
import RegistrationForm from "./components/RegistrationForm"
import UserList from './components/UserList'

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

const Separator = styled.div`
    clear: both;
    position: relative;
    margin: .8rem 0;
    background-color: #ddd;
    height: 1px;
`;
state = {
    selected: 'User Profile',
    expanded: false
};

const AppRoute = () => (

onSelect = (selected) => {
    this.setState({ selected: selected });
};
onToggle = (expanded) => {
    this.setState({ expanded: expanded });
};

pageTitle = {
    'User Profile': 'User Profile',
    'Entroll Users': ['Registered Users'],
    'KYC Uploads': ['Upload Documents'],
    'settings/policies': ['Settings', 'Policies'],
    'settings/network': ['Settings', 'Network']
};
    <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                 <SideNav onSelect={this.onSelect} style={{'background-color': 'teal'}} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="User Profile">
                        <NavItem eventKey="User Profile">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="User Profile">
                            User Profile
                         </NavText>
                        </NavItem>
                        <NavItem eventKey="Entroll Users">
                            <NavIcon>
                                <i className="fa fa-users" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Registered Users">
                            Entroll User
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="KYC Uploads">
                            <NavIcon>
                                <i className="fa fa-upload" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Upload Documents">
                            KYC Uploads
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="settings">
                            <NavIcon>
                                <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Settings">
                                Settings
                            </NavText>
                            <NavItem eventKey="settings/policies">
                                <NavText title="Policies">
                                    Policies
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="settings/network">
                                <NavText title="Network">
                                    Network
                                </NavText>
                            </NavItem>
                        </NavItem>
                        <Separator />
                        <NavItem eventKey="logout">
                            <NavIcon>
                                <i className="fa fa-fw fa-power-off" style={{ fontSize: '1.5em' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="SIGN OUT">
                                SIGN OUT
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                </SideNav>
            <Switch>
                <Route path="/User Profile" exact component={props => <HomePage />} />
                <Route path="/Enroll Users" exact component={props => <HomePage />} />
                <Route path="/KYC Document Uploads" component={props => <UploadDocuments />} />
                <Route path="/logout" component={props => <LoginForm />} />
            </Switch>
        </React.Fragment>
    )}
    />
</Router>
)

export default AppRoute
