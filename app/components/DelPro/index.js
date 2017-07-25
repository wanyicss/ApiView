import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { message, Button } from 'antd';

require('./index.css')

export default class DelPro extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
  }

  sure(){
    var self = this
    $.ajax({
      type: 'POST',
      url:'/delPro',
      dataType: 'json',
      data:{
        proName:this.props.proName
      },
      success:(result)=>{
        message.success('成功删除项目')
        self.props.reflesh()
      }
    })
  }

  render() {
    return <div className="delCon">
      <div className='item'>确定删除此项目？</div>
      <Button type="primary" className='sure' onClick={this.sure.bind(this)}>确定</Button>
      <Button className='cancel' onClick={()=>{this.props.hidden()}}>取消</Button>
    </div>
  }
}
