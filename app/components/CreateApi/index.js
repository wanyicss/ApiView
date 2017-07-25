import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { message, Button } from 'antd';
require('./index.css')

export default class EditCon extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data:''
    }
  }

  componentDidMount(){
  }

  changeData(){
    var data;
    var flag=false
    try{
      data = JSON.parse($('textarea').val())
    }catch(err){
      if(err) flag=true
    }finally{
      if(!flag){
        jQuery('#test').JSONView(data)
      }else{
      }
    }
    this.setState({
      data:$('textarea').val()
    })
  }

  sure(){
    var self = this
    $.ajax({
      type: 'POST',
      url:'/newApi',
      dataType: 'json',
      data:{
        proName:this.props.proName,
        apiName:$('.apiName').val(),
        apiInfo:$('.apiInfo').val(),
        apiData:$('textarea').val()
      },
      success:(result)=>{
        message.success('添加接口成功')
        self.props.reflesh()
      }
    })
  }

  render() {
    return <div className="createCon">
      <div className='item'>接口名字:<input className='apiName' autoFocus /><span style={{color:'silver'}}>字母数字下划线组成</span></div>
      <div className='item'>接口说明:<input className='apiInfo'/></div>
      <div className='item'><span style={{float:'left'}}>返回数据:</span>
        <textarea value={this.state.data} onChange={this.changeData.bind(this)}/>
        <div id="test"></div>
      </div>
      <Button type="primary" className='sure' onClick={this.sure.bind(this)}>确定</Button>
      <Button className='cancel' onClick={()=>{this.props.hidden()}}>取消</Button>
    </div>
  }
}
