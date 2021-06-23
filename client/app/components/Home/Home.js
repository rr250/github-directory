import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table, Button, Input, Container
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      users: []
    };
  }

  componentDidMount() {
    this.init()
  }

  handleChange(e) {
    e.preventDefault()
    let type = e.target.type
    this.setState({
      [e.target.id]: e.target.value
    }, () => {
      if (type === "select-one") {
        this.search()
      }
    });
  }

  onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  init() {
    fetch('/api/users')
      .then(res => res.json())
      .then(result => {
        this.setState({
          users: result
        });
      })
      .catch((err) => alert(err));
  }

  search = () => {
    fetch('/api/users/' + this.state.searchText)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.message === undefined)
          this.setState({
            users: [...this.state.users, result]
          })
        // this.init()
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state)
    return (
      <>
        <Container fluid className="customContainer">
          <div className="animated fadeIn">
            <Col xl={12}>
              <Card style={{ border: "0px" }}>
                <CardHeader>
                  <Row>
                    <Col md={4}>
                      {/* <h3><Link to={`/`}>Home</Link></h3> */}
                    </Col>
                    <Col md={4}>
                      <h3>Github Directory</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={4}>
                      <Input
                        id="searchText"
                        onKeyPress={e => this.onKeyPressHandler(e)}
                        placeholder={"Search"}
                        onChange={e => this.handleChange(e)}
                      />
                    </Col>
                    <Col md={4}>
                      <Button onClick={this.search}>Search</Button>
                    </Col>
                  </Row>
                  <br></br>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>USERNAME</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>URL</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.filter(user => this.state.searchText !== '' ? user.login.includes(this.state.searchText) : true).map((user, index) =>
                        <tr>
                          <td><Link to={`/repos/${user?.login}`}>{user?.id}</Link></td>
                          <td>{user?.login}</td>
                          <td>{user?.name}</td>
                          <td>{user?.email}</td>
                          <td><a href={user?.html_url} target="_blank">url</a></td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </div>
        </Container>
      </>
    );
  }
}

export default Home;
