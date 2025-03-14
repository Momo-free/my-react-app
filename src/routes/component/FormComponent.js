import React from 'react';
// 完整导入所需组件
import { DataSet, Form, TextField, SelectBox, Switch, Button, Select } from 'choerodon-ui/pro';

const { Option } = Select;

class FormComponent extends React.Component {
    componentDidMount() {
        const { ds } = this.props;
        if (ds && ds.data.length > 0) {
            this.ds.loadData(ds.data);
        }
    }

    ds = new DataSet({
        autoQuery: false, // 避免自动查询，根据传递的数据加载
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
        );
    }
}

export default FormComponent;