import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Layout, Menu, Icon } from 'choerodon-ui';
import TableComponent from './component/TableComponent';
import FormComponent from './component/FormComponent';
import { Breadcrumb } from 'choerodon-ui';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const BreadcrumbComponent = () => (
    <Breadcrumb style={{ textAlign: 'left' }}>
        <Breadcrumb.Item>
            <Link to="/table">table</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link to="/homepage">homepage</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link to="/detail">Detail</Link>
        </Breadcrumb.Item>
    </Breadcrumb>
);

function Routes() {
    const history = useHistory();

    const handleEdit = (record) => {
        history.push({
            pathname: '/detail',
            state: { data: record.toData() }
        });
    };

    return (
        <div>
            <Header style={{ background: "#001529", padding: 0 }}><h3 style={{ color: "#fff" }}>作业</h3></Header>
            <Layout style={{ minHeight: '100vh' }}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="homePage1">
                        <Icon type="file" />
                        <span>我的个人主页</span>
                    </Menu.Item>
                </Menu>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Router>
                            <Switch>
                                <Route path="/detail" render={(props) => {
                                    const { state } = props.location;
                                    const data = state ? state.data : null;
                                    return (
                                        <div>
                                            <BreadcrumbComponent />
                                            <FormComponent ds={{ data: data ? [data] : [] }} />
                                        </div>
                                    );
                                }} />
                                <Route path="/table" render={(props) => (
                                    <div>
                                        <BreadcrumbComponent />
                                        <TableComponent {...props} onEdit={handleEdit} />
                                    </div>
                                )} />
                            </Switch>
                        </Router>
                    </div>
                </Layout>
            </Layout>
        </div>
    );
}

export default Routes;    