import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table, Input, Container
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Repos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      repos: []
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
        // this.search()
      }
    });
  }

  init() {
    fetch('/api/repos/user/' + this.props.match.params.login)
      .then(res => res.json())
      .then(result => {
        this.setState({
          repos: result
        });
      })
      .catch((err) => alert(err));
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
                      <h5><Link to={`/`}>Home</Link></h5>
                    </Col>
                    <Col md={4}>
                      <h3>{this.props.match.params.login}'s repositories</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={4}>
                      <Input
                        id="searchText"
                        // onKeyPress={e => this.onKeyPressHandler(e)}
                        placeholder={"Search"}
                        onChange={e => this.handleChange(e)}
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>URL</td>
                        <td>LANGUAGE</td>
                        <td>STARS</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.repos.filter(repo => this.state.searchText !== '' ? repo.name.includes(this.state.searchText) : true).map((repo, index) =>
                        <tr>
                          <td><Link to={`/commits/${this.props.match.params.login}/${repo?.name}`}>{repo?.id}</Link></td>
                          <td>{repo?.name}</td>
                          <td><a href={repo?.html_url} target="_blank">url</a></td>
                          <td>{repo?.language}</td>
                          <td>{repo?.stargazers_count}</td>
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

export default Repos;
