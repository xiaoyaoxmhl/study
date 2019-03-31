import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Table} from 'antd';


export default class ProTable extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [], //table 数据源
            pageParm: Object.assign({     //数据请求 分页信息
                pageSize: '10',
                pageNumber: "1",
            }, this.props.pageParm || {},),
            pagination: Object.assign({   //分页配置
                showQuickJumper: true,
                pageSizeOptions: ["5", "10", "15", "25", "50"],
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} item`
            }, this.props.pagination || {}),
            loading: false,//表格是否加载
        }
    }

    static propTypes = {
        pagination: PropTypes.object,
        pageParm: PropTypes.object,
        url: PropTypes.string.isRequired,
    }

    componentWillMount = () => {
        if (!this.props.url) return;
        this.ajaxData(this.state.pageParm);
        //重置pagination的 change 事件
        const {pagination} = this.state;
        pagination.onChange = this.onPaginationChange
        pagination.onShowSizeChange = this.onPaginationShowSizeChange
        this.setState({pagination});
    }

    componentWillReceiveProps = (nextProps) => {
        const thisPageParm = {...this.props.pageParm};
        const thisPagination = {...this.props.pagination};

        const nextPageParm = {...nextProps.pageParm};
        let nextPagination = {...nextProps.pagination};


       /* if (Object.keys(nextPageParm).find(val => nextPageParm[val] !== thisPageParm[val])) {
            nextPageParm.pageNumber = 1;
            this.setState({
                pageParm: nextPageParm,
            });
        }*/
        //对比新旧 props，并更新
        if (Object.keys(nextPagination).find(val => nextPagination[val] !== thisPagination[val])) {
            delete  nextPagination.onChange;
            delete  nextPagination.onShowSizeChange;
            this.setState({
                pagination: Object.assign(this.state.pagination, nextPagination),
            });
        }
    }

    //在用户调用ajaxData方法的时候，这个时候父组件的pageParm如果和子组件的pageParm存在差异。
    //需要对子组件this.state.pageParm更新，重置。
    updateParm = (pageParm) => {
        const thisPageParm = this.state.pageParm;
        const parentPageParm = {...pageParm};
        if (Object.keys(thisPageParm).find(val => thisPageParm[val] !== pageParm[val])) {
            pageParm.pageNumber = 1;
            const pagination = {...this.state.pagination};
            pagination.current = 1;
            this.setState({
                pageParm: parentPageParm,
                pagination
            });
        }
    }

    //请求表格数据，并刷新
    ajaxData = pageParm => {
        //接受参数pageParm ，允许 pagination 调用当前函数，自行更新分页请求
        if (!pageParm) {
            pageParm = this.props.pageParm || {     //数据请求 分页信息
                pageSize: '10',
                pageNumber: "1",
            }
        } else {
            this.updateParm(pageParm);
        }
        this.setState({loading: true});

        axios.post(this.props.url, pageParm).then(res => {
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

    //页码改变
    onPaginationChange = (page, pageSize) => {
        const {pageParm, pagination} = {...this.state};

        pageParm.pageNumber = page;
        pagination.current = page;

        this.setState({pageParm, pagination});
        this.ajaxData(pageParm);
        //调用父组件 回调函数
        const {onChange} = this.props;
        onChange && onChange(page, pageSize);
    }

    //pageSize 变化的回调
    onPaginationShowSizeChange = (current, size) => {
        const {pageParm, pagination} = {...this.state};

        pageParm.pageSize = size;
        pageParm.pageNumber = 1;

        pagination.current = 1;

        this.setState({pageParm, pagination});
        this.ajaxData(pageParm);
    }

    render() {
        const {dataSource, pagination, loading} = this.state;

        return (
            <Table
                {...this.props}
                dataSource={dataSource}
                pagination={pagination}
                loading={loading}
            />
        );
    }
}

