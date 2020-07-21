import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RefreshToDo } from '../actions/ToDoAction';

class ListItems extends PureComponent {
  state = { TopicId: "", value: "" }

  componentDidMount() {
    this.setState({ TopicId: this.props.id })
  }
  handleChange = (id, e) => {
    let buttonId = id + id;
    this.setState({ value: e.target.value })
    document.getElementById(buttonId).className = "btn btn-success";

  }

  handleClick = () => {
    let id = this.state.TopicId;
    let buttonId = id + id;
    this.props.UpdateDetails(this.state.TopicId, this.state.value);
    document.getElementById(buttonId).className = "d-none";


  }
  render() {
    return (
      <div className="my-3 ">
        <h1 className="list-group-item w-50 text-center" style={{ width: "20%" }}>{this.props.data}
        </h1>
        <textarea defaultValue={this.props.details} onChange={this.handleChange.bind(this, this.state.TopicId)} class="form-control my-2 w-50 d-inline" id={this.state.TopicId} rows="5"></textarea>
        <button type="button" id={this.state.TopicId + this.state.TopicId}
          class="btn btn-success d-none" onClick={this.handleClick}>save</button>
        <div>
          <button className="btn btn-success d-inline" style={{ width: "10%" }} onClick={this.props.EditItem.bind(this, this.state.TopicId, this.props.data)} >edit</button>
          <button className="btn btn-danger d-inline" onClick={this.props.DeleteItem.bind(this, this.state.TopicId)} style={{ width: "10%" }}>delete</button>
        </div>

      </div>

    );
  }
}


function mapActionToProps(dispatch) {
  return {

    UpdateDetails: function (id, value) {

      let x = JSON.parse(localStorage.getItem("user"));
      let y = x.token;
      let data = { Topic_id: id, token: y, Topic_Details: value }
      //UpdateDetails
      fetch('/add/UpdateDetails', {

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'put',
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(x => dispatch(RefreshToDo(x)))

    },
    DeleteItem: function (id) {
      let x = JSON.parse(localStorage.getItem("user"));
      let y = x.token;
      let data = { Topic_id: id, token: y }
      //DeleteTopics
      fetch('/delete/DeleteTopics', {

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'delete',
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(x => dispatch(RefreshToDo(x)))

    },
    EditItem: function (id, data) {
      var person = prompt("Please Enter Topic name", data);

      if (person !== "") {

        let x = JSON.parse(localStorage.getItem("user"));
        let y = x.token;
        let data = { "id": id, "New_Name": person, "token": y }

        fetch('/update/UpdateTopics', {

          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'put',
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(x => dispatch(RefreshToDo(x)))


      }
      else {

      }
    }
  }
}

export default connect(null, mapActionToProps)(ListItems);
