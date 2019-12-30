import React from 'react';
import './App.css';
import api from './api';

import PostView from './Components/PostView';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { IoIosChatboxes } from "react-icons/io";
import { TiSpanner } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { FaWifi } from "react-icons/fa";




class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  deletealert = (item) => {
    if (window.confirm('정말로 게시글을 삭제하시겠습니까?')){
      this.handlingDelete(item)
    } else {
      return false
    }
  }

  updatealert = (id, _title, _content) => {
    if (window.confirm('게시글을 수정하시겠습니까?')){
      if (_title === "" || _content === ""){
        window.alert("제목과 내용을 작성하세요!!")
      } else {
        this.handlingUpdate(id, _title, _content)
      }
    } else {
      return false
    }
  }

  handlingChange = (event) => {
    this.setState(
      {[event.target.name]: event.target.value}
    )
  }

  handlingSubmit = async (event) => {
    event.preventDefault()
    await api.createPost({title: this.state.title, content: this.state.content})
    this.setState({title:'', content:''})
    this.getPosts()
  }

  componentDidMount(){
    this.getPosts()
  }

  async getPosts(){
    const _results = await api.getAllPost()
    this.setState({results: _results.data})
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  handlingUpdate = async (id, _title, _content) => {
    await api.updatePost(id, _title, _content)
    this.setState({title:'', content:''})
    this.getPosts()
  }


  render(){
  return (
    <div className="App">
      <Container maxWidth="lg">
      <div className="PostSection">
      <Paper className="paper">
      <h2><IoIosChatboxes/> 야먹자의 잡담 숲<FaWifi className="right"/></h2>
      <form className="formPost" onSubmit={this.handlingSubmit}>
      <TextField name="title" value={this.state.title} onChange={this.handlingChange} id="outlined-basic" label="제목" variant="outlined" margin="normal" />
      <TextField
          id="outlined-textarea"
          label="내용"
          placeholder="예) 내용을 입력하세요!"
          multiline
          rows="4"
          variant="outlined"
          name="content"
          margin="normal"
          value={this.state.content}
          onChange={this.handlingChange}
        />
      <Button type="submit" variant="outlined" color="primary">
        <FiSave/>&nbsp;제출하기
      </Button>
      </form>
      </Paper>
      </div>

      

      <div className="GetSection">

      

        {
          this.state.results.map((post)=>
          <>
          <Card className={'card'}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <PostView key={post.id} title={post.title} content={post.content} updated={post.updated_at}/>
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="secondary" size="small" onClick={(event)=>this.deletealert(post.id)} ><MdDeleteForever/>&nbsp;삭제하기</Button>
              <Button color="primary" size="small" onClick={(event)=>this.updatealert(post.id, this.state.title, this.state.content)} ><TiSpanner/>&nbsp;수정하기</Button>
            </CardActions>
          </Card>
          </>
          )
        }
        
      </div>
      </Container>
    </div>
  );
}
}

export default App;
