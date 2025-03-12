// 应用程序的主组件，通常包含应用的整体布局和路由配置
import React, { useState } from'react'; 
import { BrowserRouter as Router, Route, Switch } from'react-router-dom/cjs/react-router-dom.min';
import HomePage from './routes';
import FormComponent from './routes/component/FormComponent';
import TableComponent from './routes/component/TableComponent';

import './App.css';
// import Detail from './routes/component/FormComponent';
import { Layout, Menu, Icon } from 'choerodon-ui';

const { Header, Content, Footer, Sider } = Layout;

function App() {
    // 定义展开收起状态
    const [collapsed, setCollapsed] = useState(false);

    // 切换状态
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };

    return (
        <Layout>
            <Header style={{ background: "#001529", padding: 0 }}><h3 style={{ color: "#fff" }}>作业</h3></Header>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="homePage1">
                            <Icon type="file" />
                            <span>我的个人主页</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Router>  
                                <div className="App">  
                                    <Switch>  
                                        <Route path="/" exact component={HomePage} />  
                                        <Route path="/detail" component={FormComponent} />
                                        <Route path="/table" component={TableComponent} /> 
                                    </Switch>  
                                </div>  
                            </Router>  
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Choerodon UI</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default App;