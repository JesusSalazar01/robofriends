import { render } from "@testing-library/react";
import React, { Component } from "react";
import CardList from "./CardList";
import Scroll from './Scroll'
import SearchBox from './SearchBox'
import ErrorBoundry from "./ErrorBoundry";




class App extends Component{
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users=> this.setState({robots: users}))
        
    }

    onSearChange = (event)=>{
        this.setState({searchfield: event.target.value})
        
    }

    render(){
        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if (this.state.robots.length === 0){
            return <h1>Loading</h1>
        }
        else {
            return(
                <div className="tc">
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                        

                    </Scroll>
                </div>
                
            )
        }
        
    }
    
}

export default App