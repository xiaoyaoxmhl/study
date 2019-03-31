import React, {Component} from 'react';
import axios from 'axios';
import {Table, Input, Button} from 'antd';
//test
export default class DefaultTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            pageParm: {     //数据请求 分页信息
                pageSize: '10',
                pageNumber: "1",
                keyWord: "",
            },
            dataSource: [], //table 数据源
            pagination: {   //分页配置
                showQuickJumper: true,
                pageSizeOptions: ["5", "10", "15", "25", "50"],
                showSizeChanger: true,
                onChange: this.onPaginationChange,
                onShowSizeChange: this.onPaginationShowSizeChange,
                showTotal: (total) => `Total ${total} item`
            },
            loading: false,//表格是否加载
        }
    }

    componentWillMount = () => {
        this.ajaxData();
    }
    //请求表格数据，并刷新
    ajaxData = (pageParm = this.state.pageParm) => {
        this.setState({loading: true});
        axios.post('http://localhost:9093/person/pagelist', pageParm).then(res => {
            if (res.status == 200) {
                const {data, total} = res.data.data;
                const dataSource = data.map(
                    (val, key) => ({
                        ...val, key
                    }));

                const {pagination} = this.state;
                pagination.total = total;
                this.setState({dataSource, pagination, loading: false});
            }
        }, (err) => {
            console.log(err);
            this.setState({loading: false})
        });
    }


    handleInputChange = (e) => {
        const pageParm = this.state.pageParm;
        pageParm.keyWord = e.target.value;
        this.setState({pageParm});
    }


    //页码改变
    onPaginationChange = (page, pageSize) => {
        const {pageParm, pagination} = {...this.state};

        pageParm.pageNumber = page;
        pagination.current = page;

        this.setState({pageParm, pagination});
        this.ajaxData(pageParm);
    }

    //pageSize 变化的回调
    onPaginationShowSizeChange = (current, size) => {
        const {pageParm, pagination} = {...this.state};
        //切换每页显示多少条记录的时候，重置为第一页。重新排版 table
        pageParm.pageSize = size;
        pageParm.pageNumber = 1;

        pagination.current = 1;

        this.setState({pageParm, pagination});
        this.ajaxData(pageParm);
    }

    render() {
        const {dataSource, pagination, loading, pageParm} = this.state;

        return (
            <div className="App">
                <div className="app-search">
                    <Input placeholder="请输入关键字" onChange={this.handleInputChange}/>
                    <Button type="primary" onClick={this.ajaxData.bind(this, pageParm)}>搜索</Button>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    loading={loading}
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