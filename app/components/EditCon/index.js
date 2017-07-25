import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { message, Button, Input } from 'antd';
require('./index.css')

export default class EditCon extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    var self = this
    $.get('/static/jsonlist/'+this.props.apiPath+'.json', (result)=>{
      self.name = self.apiName = result.name
      self.apiInfo = result.apiInfo
      self.data = JSON.stringify(result.data)
      jQuery('#test').JSONView(self.data)
      self.forceUpdate()
    })
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
    this.data = $('textarea').val()
    this.forceUpdate()
  }

  sure(){
    var self = this
    var params = {
      proName:this.props.proName,
      oldName : this.name,
      newName : $('.apiName').val(),
      apiInfo:$('.apiInfo').val(),
      data:$('textarea').val()
    }
    $.ajax({
      type: 'POST',
      url:'/changeApi',
      dataType: 'json',
      data:params,
      success:(result)=>{
        message.success('成功编辑接口')
        self.props.reflesh()
      }
    })
  }
  changeApiName(){
    this.apiName = $('.apiName').val()
    this.forceUpdate()
  }
  changeApiInfo(){
    this.apiInfo = $('.apiInfo').val()
    this.forceUpdate()
  }
  render() {
    return <div className="edit">
      <div className='item'>接口名字:
        <Input className='apiName' autoFocus value={this.apiName} onChange={this.changeApiName.bind(this)} />
        <span style={{color:'silver'}}>字母数字下划线组成</span>
      </div>
      <div className='item'>接口说明:
        <Input className='apiInfo' value={this.apiInfo} onChange={this.changeApiInfo.bind(this)} />
      </div>
      <div className='item'><span style={{float:'left'}}>返回数据:</span>
        <textarea value={this.data} onChange={this.changeData.bind(this)}/>
        <div id="test"></div>
      </div>
      <Button type="primary" className='sure' onClick={this.sure.bind(this)}>确定</Button>
      <Button className='cancel' onClick={()=>{this.props.hidden()}}>取消</Button>
    </div>
  }
}
