import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { message, Button } from 'antd';

require('./index.css')

export default class Create extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
  }

  sure(){
    var self = this
    $.get('/static/projects.json', (data)=>{
      var proName = $('.proName').val()
      if(data.hasOwnProperty(proName)){
        message.error('项目已存在')
      }else{
        $.ajax({
          type:'POST',
          url:'/createPro',
          data:{proName:proName},
          success:(result)=>{
            if(result.success){
              message.success('添加项目成功')
              self.props.renderLeftList()
            }
          }
        })
      }
    })
  }

  render() {
    return <div className="create">
      请输入项目英文名：<input autoFocus className='proName' />
      <Button type="primary" onClick={this.sure.bind(this)}>确定</Button>
    </div>
  }
}
