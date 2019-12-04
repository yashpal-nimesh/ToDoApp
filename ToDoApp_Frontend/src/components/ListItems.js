import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { connect } from 'react-redux';
import {RefreshToDo } from '../actions/ToDoAction';



class ListItems extends PureComponent {
    state = {TopicId : "" }

componentDidMount(){
  this.setState({TopicId:this.props.id})
  console.log("listitem")
}
    render() { 
        return ( 
          <div className="my-3 ">
    <Link to="/details" id={this.state.TopicId} className="list-group-item w-50" style={{width:"20%"}}>{this.props.data}
     </Link>
         <button className="btn btn-success" id={this.state.TopicId+this.state.TopicId} style={{width:"10%"}} onClick={this.props.EditItem.bind(this,this.state.TopicId,this.props.data)} >edit</button>
         <button className="btn btn-danger" onClick={this.props.DeleteItem.bind(this,this.state.TopicId)} style={{width:"10%"}}>delete</button>

        
         </div>

    );
    }
}

  
 function mapActionToProps(dispatch) {
  return {
      DeleteItem: function(id) {
        console.log(id);
        let x=JSON.parse(localStorage.getItem("user"));
        let y=x.token;
          let data={Topic_id : id,token :y}
          fetch('http://localhost:9000/DeleteTopics', {

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'post',
  body:JSON.stringify(data)
 });

       
 fetch('http://localhost:9000/ShowTopics', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'post',
  body: localStorage.getItem('user')
 })
.then(res=>res.json())
.then(x=> dispatch(RefreshToDo(x)))


      },
      EditItem: function(id,data) {
  //  console.log(data)
      var person = prompt("Please Enter Topic name", data);

      // console.log(person)
      if (person != "") {
      // console.log("id"+ id,"old"+ data, "new"+person);

      let x=JSON.parse(localStorage.getItem("user"));
      let y=x.token;
      let data={"id" : id , "New_Name" : person , "token" : y}

      // console.log(data)



      fetch('http://localhost:9000/UpdateTopics', {
    
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: JSON.stringify(data)
       });

       fetch('http://localhost:9000/ShowTopics', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: localStorage.getItem('user')
       })
      .then(res=>res.json())
      .then(x=>  dispatch(RefreshToDo(x)))

      }
      else{

      }



      }
  }
}

// function mapStateToProps(state) {
//   return {item: state.ToDoReducer.item};
// }

export default connect(null, mapActionToProps)(ListItems);
