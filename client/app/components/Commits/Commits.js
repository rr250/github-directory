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


class Commits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      commits: []
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

  onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      // this.search();
    }
  };

  init() {
    fetch('/api/commits/user/' + this.props.match.params.login + '/repo/' + this.props.match.params.repo)
      .then(res => res.json())
      .then(result => {
        this.setState({
          commits: result
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
                      <h3>{this.props.match.params.repo}'s commits</h3>
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
                        <td>sha</td>
                        <td>commiter</td>
                        <td>message</td>
                        <td>date</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.commits.filter(commit => this.state.searchText !== '' ? commit.login.includes(this.state.searchText) : true).map((commit, index) =>
                        <tr>
                          <td>{commit?.sha}</td>
                          <td>{commit?.commit.committer.name}</td>
                          <td>{commit?.commit.message}</td>
                          <td>{commit?.commit.committer.date}</td>
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

export default Commits;
