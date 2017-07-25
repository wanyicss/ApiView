import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import Apis from '../components/Apis'
import Create from '../components/Create'

require('./home.css')

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      key: 'create',
      projects: []
    }
  }

  componentDidMount(){
    var self = this
    $.get('/static/projects.json', (data)=>{
      self.data = data
      self.setState({
        projects:Object.keys(data)
      })
    })
  }

  handleClick(e){
    this.currenPro = e.key
    this.currenProApis = this.data[e.key]
    this.setState({
      key:e.key
    })
  } 
  renderLeftList(){
    var self = this
    $.get('/static/projects.json', (data)=>{
      self.data = data
      self.setState({
        key:'create',
        projects:Object.keys(data)
      })
    })
  }
  render() {
    const subMenu = this.state.projects.map((item, index)=>{
      return <Menu.Item key={item}>{item}</Menu.Item>
    })
    return <div>
      <div className='navbar'>Apiview</div>
      <div className='proList'>
        <Menu
          mode="inline"
          style={{ width: 240 }}
          selectedKeys={[this.state.key]}
          onClick={this.handleClick.bind(this)}
        >
          <Menu.Item key="create"><span><Icon type="edit" /></span>创建项目</Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="appstore-o" /><span>项目列表</span></span>}>
            {subMenu}
          </SubMenu>
        </Menu>
      </div>
      <div className='container'>
        {
          this.state.key == 'create'
          ? <Create renderLeftList={this.renderLeftList.bind(this)}/>
          : <Apis renderLeftList={this.renderLeftList.bind(this)} proName={this.currenPro} apis={this.currenProApis} key={Math.random()}/>
        }
      </div>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))