import React from 'react';
import { DataSet, Table, Modal, Button } from 'choerodon-ui/pro';

const { Column } = Table;

class App extends React.Component {
    userDs = new DataSet({
        primaryKey: 'id',
        autoQuery: true,
        pageSize: 5,
        dataKey: 'content',
        transport: {
            read: {
                url: 'https://hzero-test.open.hand-china.com/mock/guide/user', // 修改为目标链接
                method: 'GET'
            },
            create: {
                url: '/dataset/user/mutations',
                method: 'put',
            },
            update: ({ data: [first] }) =>
                first
                   ? {
                        url: `/dataset/user/mutations/${first.id}`,
                        data: first,
                        transformResponse() {
                            return [first];
                        },
                    }
                    : null,
            destroy: {
                url: '/dataset/user/mutations',
                method: 'delete',
            },
        },
        queryFields: [
            { name: 'active', type: 'boolean', label: '状态' },
            { name: 'user', type: 'string', label: '姓名', defaultValue: 'Hugh' },
            { name: 'code', type: 'string', label: '编码' },
        ],
        fields: [
            {
                name: 'id',
                type: 'number',
                label: '编号',
                required: true,
                unique: true,
                help: '主键，区分用户',
            },
            {
                name: 'name',
                type: 'string',
                label: '姓名',
            },
            {
                name: 'code',
                type: 'string',
                label: '编码',
            },
            {
                name:'sex',
                type: 'string',
                label: '性别',
            },
            {
                name: 'active',
                type: 'boolean',
                label: '状态',
            },
        ],
        events: {
            submit: ({ data }) => console.log('submit data', data),
            query: ({ params, data }) =>
                console.log('user query parameter', params, data),
            remove: ({ records }) => console.log('removed records', records),
        },
    });

    // 新增操作
    createUser = () => {
        // 创建一条新记录
        const newRecord = this.userDs.create({},0);
    };

    // 删除操作
    deleteUser = () => {
        const selected = this.userDs.selected;
        if (selected.length > 0) {
            this.userDs.remove(selected, true);
        } else {
            Modal.warning('请选择记录');
        }
    };

    // 查询操作
    queryUser = () => {
        this.userDs.query();
    };

    // 编辑操作，跳转到 /details 页面
    editUser = (record) => {
        this.props.history.push(`/detail`);
    };

    // 回退操作，这里假设是取消编辑状态，根据实际情况调整
    cancelEdit = (record) => {
        record.reset();
        record.setState('editing', false);
    };

    // 修改操作
    updateUser = async (record) => {
        try {
            const response = await this.userDs.axios.put(
                `https://hzero-test.open.hand-china.com/mock/guide/user/${record.data.id}`,
                record.data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data?.code === 200) {
                record.reset();
                record.setState('editing', false);
                console.log('修改成功');
            } else {
                console.log('修改失败', response.data?.message);
            }
        } catch (error) {
            console.error('修改失败:', error);
        }
    };

    createButton = (
        <Button icon="playlist_add" onClick={this.createUser} key="add">
            新增
        </Button>
    );

    deleteButton = (
        <Button icon="playlist_delete" onClick={this.deleteUser} key="delete">
            删除
        </Button>
    );

    queryButton = (
        <Button icon="search" onClick={this.queryUser} key="query">
            查询
        </Button>
    );

    saveButton = (
        <Button icon="save" onClick={() => this.userDs.submit()} key="save">
            保存
        </Button>
    );

    render() {
        const buttons = [
            this.createButton,
            this.deleteButton,
            this.queryButton,
            this.saveButton,
        ];
        return (
            <Table
                buttons={buttons}
                dataSet={this.userDs}
                header="User"
                style={{ height: 300 }}
                rowNumber
                pagination={{
                    pageSizeEditable: true,
                    showQuickJumper: true,
                    pageSizeOptions: ['10', '20', '100', '200', '500', '1000'],
                }}
            >
                <Column name="id" editor width={150} />
                <Column name="name" editor width={150} />
                <Column name="code" editor width={150} />
                <Column name="sex" editor width={150} />
                <Column name="active" editor width={100} />
                <Column
                    header="操作"
                    width={150}
                    lock="right"
                    renderer={(text, record) => (
                        <Button onClick={() => this.editUser(record)}>编辑</Button>
                    )}
                />
            </Table>
        );
    }
}

export default App;    