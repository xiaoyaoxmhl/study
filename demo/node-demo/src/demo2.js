import React from 'react';
import PropTypes from 'prop-types';
import ProTable from './protable';
import {Button, Input} from 'antd';


export default class Demo extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            pageParm: {     //数据请求 分页信息
                pageSize: '10',
                pageNumber: "1",
                keyWord: "",
            },
        }
    }

    //关键字
    handleInputChange = (e) => {
        const pageParm = this.state.pageParm;
        pageParm.keyWord = e.target.value;
        this.setState({pageParm});
    }
    //搜索按钮
    search = () => {
        this.table.ajaxData({...this.state.pageParm})
    }

    render() {

        return (
            <div className="App">
                <h2>ProTable</h2>
                <div className="app-search">
                    <Input placeholder="请输入关键字" onChange={this.handleInputChange}/>
                    <Button type="primary" onClick={this.search}>搜索</Button>
                </div>
                <ProTable
                    url="http://localhost:9093/person/pagelist"
                    columns={columns}
                    pageParm={{...this.state.pageParm}}
                    ref={(table) => this.table = table}
                />

            </div>
        );
    }
}


const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },

    {
        title: '课程',
        dataIndex: 'class',
        key: 'class',
    }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    }, {
        title: '身高',
        dataIndex: 'height',
        key: 'height',
    }, {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
    }, {
        title: '教育',
        dataIndex: 'education',
        key: 'education',
    }
];
