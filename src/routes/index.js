import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Layout, Menu, Icon } from 'choerodon-ui';
import TableComponent from './component/TableComponent';
import FormComponent from './component/FormComponent';

const { Header } = Layout;

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
                                    return <FormComponent ds={{ data: data ? [data] : [] }} />;
                                }} />
                                <Route path="/table" render={(props) => <TableComponent {...props} onEdit={handleEdit} />} />
                            </Switch>
                        </Router>
                    </div>
                </Layout>
            </Layout>
        </div>
    );
}

export default Routes;