import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '@trendmicro/react-breadcrumbs/dist/react-breadcrumbs.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import ensureArray from 'ensure-array';
import { logoutUser } from "../actions/user.actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import {Menu}  from "semantic-ui-react"
import UserProfile from './UserProfile'

import React, { Component } from 'react';
import styled from 'styled-components';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Link, Route } from "react-router-dom";
import UserList from './UserList'
import UploadDocuments from './UploadDocuments'
import RegistrySearch from './RegistrySearch'
import ViewRequest from './ViewRequest'


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
 class SideBar extends Component {
   
    state = {
        selected: 'User Profile',
        expanded: false
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };



    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };


// 
/* <Route path="Entroll Users/:id" component={UserList}/> */
  
    pageContent ={
        'User Profile': <Link to="/User Profile" component={UserProfile}/>,
        'Enroll Users':<Link to="/Enroll Users" component={UserList}/>,
        'KYC Uploads' : <Link to="/KYC Uploads" component={UploadDocuments}/>,
        'KYC Registry Search':<Link to="/KYC Registry Search" component={RegistrySearch}/>,
        'View Requests':<Link to="/View Requests" component={ViewRequest}/>
    }


    renderBreadcrumbs() {

        // const { user } = this.props.auth; 
        const { selected } = this.state;
        // const list = ensureArray(this.pageTitle[selected]);
        const list = ensureArray(this.pageContent[selected]);
        return (
            <Breadcrumbs>
                {list.map((item, index) => (
                    <Breadcrumbs.Item
                        active={index === list.length - 1}
                        key={`${selected}_${index}`}
                    >
                        {item}
                    </Breadcrumbs.Item>
                ))}
            </Breadcrumbs>
        );
    }

    navigate = (pathname) => () => {
        this.setState({ selected: pathname });
    };

    render() {

        const { activeItem } = this.state
        const { expanded, selected } = this.state;

        return (
           <div>

         {/* <Menu color='olive' text style={{ marginTop: '1em'}} pointing secondary>
         <Menu.Menu position='right'>
              <Menu.Item
                icon='shutdown'
                name='Signout'
                active={activeItem === 'Signout'}
                onClick={this.onLogoutClick}
              />
              </Menu.Menu>
              </Menu> */}
           {/* </div>

            <div> */}
                <div
                    style={{
                        marginLeft: expanded ? 240 : 64,
                        padding: '15px 20px 0 20px'
                    }}
                >
                   
                </div>
                <SideNav onSelect={this.onSelect} style={{'background-color': 'teal'}} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav selected={selected}>
                        <NavItem eventKey="User Profile">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} content="User Profile">
                              User Profile
                         </NavText>
                        </NavItem>
                        <NavItem eventKey="Enroll Users">
                            <NavIcon>
                                <i className="fa fa-users" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} content="Registered Users">
                            Enroll User
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="KYC Uploads">
                            <NavIcon>
                                <i className="fa fa-upload" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} content="Upload Documents">
                            Submit KYC Document
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="KYC Registry Search">
                            <NavIcon>
                                <i className="fa fa-search" style={{ fontSize: '1.5em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Settings">
                                KYC Registry Search
                            </NavText>
                        </NavItem> 
                        <NavItem eventKey="View Requests">
                            <NavIcon>
                                <i className="fa fa-eye" style={{ fontSize: '1.5em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Settings">
                            View Requests
                            </NavText>
                        </NavItem> 
                        <Separator />
                        <NavItem   onClick={this.onLogoutClick} >
                            <NavIcon >
                                <i className="fa fa-fw fa-power-off" style={{ fontSize: '1.5em' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="SIGN OUT">
                                SIGN OUT
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <Main expanded={expanded}>
                    {this.renderBreadcrumbs()}
                </Main>
            </div>
      );
    }
 }

SideBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(SideBar);

 