import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Table, Button } from 'antd';
import EditCon from '../EditCon/index';
import CreateApi from '../CreateApi/index';
import DelApi from '../DelApi/index';
import DelPro from '../DelPro/index';

require('./index.css')

export default class Apis extends Component {

  constructor(props) {
    super(props)
    this.proName = this.props.proName
    this.state = {
      data : [],
      edit : false,
      delApi:false,
      newApi:false,
      delPro:false
    }
    this.columns = [{
      title: '名字',
      dataIndex: 'name',
      width: '10%',
    }, {
      title: '接口说明',
      dataIndex: 'apiInfo',
      width: '20%',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      width: '20%',
      render: (e) => {
        return <span>{
          `${location.host}/api/${e}`
        }</span>
      },
    },
    {
      title: '预览',
      width: '10%',
      render: (e) => {
        return <a href="javascript:" onClick={()=>{
          var url = `/api/${e.url}`
          window.open(url,'')}
        }>预览接口</a>
      },
    },
    {
      title: '操作',
      width: '10%',
      render: (e) => {
        return <div>
          <a href="javascript:" style={{marginRight: 10}} onClick={()=>{
            this.currentEditApiPath = e.url
            this.setState({
              edit: true
            })
          }}>编辑</a>
          <a href="javascript:" onClick={()=>{
            this.currentEditApiPath = e.url
            this.setState({
              delApi:true
            })
          }}>删除</a>
        </div>
      },
    }
    ];
  }

  componentDidMount(){
    var self = this
    $.ajax({
      type:'POST',
      url:'/getProApis',
      data:{proName:this.props.proName},
      success:(result)=>{
        if(result.success){
          self.setState({data:result.data})
        }
      }
    })
  }

  hidden(){
    this.setState({edit:false,newApi:false,delApi:false,delPro:false})
  }
  newApi(){
    this.setState({edit:false,newApi:true})
  }
  reflesh(){
    var self = this
    $.ajax({
      type:'POST',
      url:'/getProApis',
      data:{proName:this.props.proName},
      success:(result)=>{
        if(result.success){
          self.setState({
            data:result.data,
            edit:false,
            newApi:false,
            delApi:false,
            delPro:false
          })
        }
      }
    })
  }
  delPro(){
    this.setState({
      delPro:true
    })
  }
  render() {
    return <div>
      <div className='right'>
        <Button type="danger" icon="delete" onClick={this.delPro.bind(this)} className='delPro'>删除此项目</Button>
        <Button type="primary" onClick={this.newApi.bind(this)} className='createApi'>新建接口</Button>
        <Table columns={this.columns} dataSource={this.state.data} pagination={false} scroll={{ y: 500 }} />
      </div>
      {
        this.state.edit
        ? <div className='editModal'>
            <EditCon proName={this.props.proName} apiPath={this.currentEditApiPath} hidden={this.hidden.bind(this)} reflesh={this.reflesh.bind(this)}/>
          </div>
        : this.state.newApi
        ? <div className='editModal'>
            <CreateApi proName={this.props.proName} hidden={this.hidden.bind(this)} reflesh={this.reflesh.bind(this)}/>
          </div>
        : this.state.delApi
        ? <div className='editModal'>
            <DelApi proName={this.props.proName} apiPath={this.currentEditApiPath} hidden={this.hidden.bind(this)} reflesh={this.reflesh.bind(this)}/>
          </div>
        : this.state.delPro
        ? <div className='editModal'>
            <DelPro proName={this.props.proName} hidden={this.hidden.bind(this)} reflesh={()=>{this.props.renderLeftList()}}/>
          </div>
        : null
      }
    </div>
  }
}
