import React, { Component } from 'react';
import PersonCard from '../PersonCard/PersonCard';
import './Home.css';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      page: this.props.page
    }
  }

  componentDidMount() {
    fetch(`https://swapi.dev/api/people/?page=${this.state.page}`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
        this.setState((prevState, props) => {
          return {
            people: data.results
          };
        });
      } else {
        this.setState((prevState, props) => {
          return {
            people: []
          };
        });
      }
      })
      .catch(error => console.log(error));
  };

  next = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    }, this.componentDidMount);
  }

  previous = () => {
    this.setState((prevState) => {
      return { page: prevState.page - 1 };
    }, this.componentDidMount);
  }

  getPrevButton() {
    return (
      <button onClick={this.previous}>Previous</button>
    );
  }

  getNextButton() {
    return (
      <button onClick={this.next}>Next</button>
    );
  }

  render() {
    const people = this.state.people;
    return (
      <div className="home">
        <section className="page-content">
          {people.map((people, idx) => {
            return <PersonCard key={idx} people={people} />;
          })}
        </section>
        <div className="pagination">
          {this.state.page > 1 ? this.getPrevButton() : null}
          {this.state.page < 9 ? this.getNextButton() : null}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  page: PropTypes.number.isRequired
};

export default Home;
