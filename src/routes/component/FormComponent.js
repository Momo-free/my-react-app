import React from 'react';
import { DataSet, Form, TextField, SelectBox, Switch, Button, Select } from 'choerodon-ui/pro';
import { Breadcrumb } from 'choerodon-ui';
import { Link } from 'react-router-dom';

const { Option } = Select;

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

class FormComponent extends React.Component {
    componentDidMount() {
        const { ds } = this.props;
        if (ds && ds.data.length > 0) {
            this.ds.loadData(ds.data);
        }
    }

    ds = new DataSet({
        autoQuery: false, 
        fields: [
            { name: 'id', type: 'string' },
            { name: 'name', type: 'string', label: '姓名', required: true },
            { name: 'code', type: 'string', label: '编码', required: true },
            { name: 'sex', type: 'string', label: '性别', required: true },
            { name: 'active', type: 'boolean', label: '状态' },
        ],
    });

    render() {
        return (
            <div>
                <BreadcrumbComponent />
                <Form dataSet={this.ds} style={{ width: '4rem' }} labelWidth="auto" action='https://hzero-test.open.hand-china.com/mock/guide/user'>
                    <TextField name="name" />
                    <TextField name="code" />
                    <SelectBox name="sex">
                        <Option value="M">男</Option>
                        <Option value="F">女</Option>
                    </SelectBox>
                    <Switch name="active" />
                    <div>
                        <Button type="submit" >提交</Button>
                        <Button type="reset" style={{ marginLeft: 8 }}>重置</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default FormComponent;    