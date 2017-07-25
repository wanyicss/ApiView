import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { message, Button } from 'antd';
require('./index.css')

export default class DelApi extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
  }

  sure(){
    var self = this
    $.ajax({
      type: 'POST',
      url:'/delApi',
      dataType: 'json',
      data:{
        apiPath:this.props.apiPath
      },
      success:(result)=>{
        message.success('成功编辑接口')
        self.props.reflesh()
      }
    })
  }

  render() {
    return <div className="delCon">
      <div className='item'>确定删除此接口？</div>
      <Button type="primary" className='sure' onClick={this.sure.bind(this)}>确定</Button>
      <Button className='cancel' onClick={()=>{this.props.hidden()}}>取消</Button>
    </div>
  }
}
