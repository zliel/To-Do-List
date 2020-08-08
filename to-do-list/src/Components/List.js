import React from 'react'

/*THINGS TO DO:
-Add ALL functionality. Delete, edit, cross off as done, etc
-Add a login screen and database
-Add authentication
-Do CSS work
-Go all the way; maybe try for templates? (Recipe, budget, resume?, etc.)
-Maybe look into Redux?
*/

export default class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            toDo: ["Make a list of things to do"],
            newTask: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteAll = this.deleteAll.bind(this)
    }
    handleChange(e){
        this.setState({
            newTask: e.target.value
        }, () => {
            console.log(this.state)
        })
    }
    handleSubmit(e){
        if (!this.state.newTask) return 
        if (this.state.toDo[0] === "Make a list of things to do"){
            return this.setState({
                toDo: [this.state.newTask],
                newTask: ""
            })
        }
        this.setState({
            toDo: this.state.toDo.concat(this.state.newTask),
            newTask: ""
        })
    }
    handleDelete(e){
        //important bug: if two entries are the same and one is deleted, both get deleted
        let target = e.target.value
        let endList = [...this.state.toDo]
        
        endList = endList.filter(val => val !== target)
        this.setState({toDo: endList})
    }

    deleteAll(){
        this.setState({toDo: [], newTask: ""})
    }

    render(){
        let list = []
        list = this.state.toDo.map((val, i) => {
            return(
                <div>
                <li key={i}>{val}</li>
                <button key={i + 10} value={val} onClick={this.handleDelete}>Delete</button>
                </div>
            )
        })

        return(
            <div>
                <p>What do you need to do today?</p>
                <ol>
                    {list}
                </ol>
                
                    <input type="text" placeholder="What do you need to do?" onChange={this.handleChange} value={this.state.newTask}></input>
                    <button value={this.state.newTask} onClick={this.handleSubmit}>Submit</button>
                    <button onClick={this.deleteAll}>Delete All</button>
                
            </div>
        )
    }
}