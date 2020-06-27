import React, { PureComponent } from 'react';
import { LooutAction } from '../actions/LoginAction';
import { RefreshToDo, InitToDo } from '../actions/ToDoAction';
import { connect } from 'react-redux';
import ListItems from './ListItems';


class MainPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { inputValue: "", result: [] }
  }

  componentDidMount() {
    if (localStorage.getItem('user') === null) {

    }
    else {
      fetch('http://localhost:9000/AddUsers', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: localStorage.getItem('user')
      })
        .then(res => res.json())
        .then(x => (this.props.InitToDoData(x)))

    }
  }

  handleChange = () => {
    let input = document.getElementById("inputText").value;
    this.setState({ inputValue: input })
  }
  handleClick = () => {
    this.props.AddItem(this.state.inputValue);

  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      var userName = user.name;
    }
    else {

    }
    const myArray = this.props.item;
    let elements = [...myArray].reverse().map((item, index) =>
      <ListItems key={item.Topic_Id} id={item.Topic_Id} data={item.Topic_Name} details={item.Topic_Details} />);

    return (<div>
      <nav className="navbar navbar-light bg-light">
        <a href className="navbar-brand">ToDo App</a>
        <form className="form-inline">
          {userName ? <a href className="navbar-brand">Hello, {userName}</a> : ""}

          <button className="btn btn-danger ml-auto" onClick={this.props.doLogout}>Logout</button>
        </form>
      </nav>


      <div className="input-group mb-3 my-5 w-25" style={{ marginLeft: "35%" }}>
        <input type="text" id="inputText" onChange={this.handleChange} className="form-control" placeholder="Enter Topics" aria-label="Enter Topics" aria-describedby="button-addon2" />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={this.handleClick} type="button" id="button-addon2">Submit</button>
        </div>
      </div>
      <ul className="list-group" style={{ marginLeft: "30%" }}>
        {elements}
      </ul>

    </div>);
  }
}
function mapActionToProps(dispatch) {
  return {
    doLogout: function () {
      localStorage.removeItem('user');
      dispatch(LooutAction());
    },
    InitToDoData: function (x) {
      // localStorage.removeItem('user');
      dispatch(InitToDo(x));
    },
    AddItem: function (value) {
      if (value === "") {
        alert("Enter any Value")
      }
      else {

        let x = JSON.parse(localStorage.getItem("user"));
        let y = x.token;
        let id = Math.random();
        let data = JSON.stringify({
          Topic_Id: id,
          Topic_Name: value,
          token: y,
          Topic_Details: ""
        })
        fetch('http://localhost:9000/AddTopics', {

          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'post',
          body: data
        })
          .then(res => res.json())
          .then(x => dispatch(RefreshToDo(x)))

      }
    }
  }
}

function mapStateToProps(state) {
  return { item: state.ToDoReducer.item };
}

export default connect(mapStateToProps, mapActionToProps)(MainPage);