import React, {Component} from 'react';
import './App.css'
import {Button} from 'react-bootstrap'
import Gallery from './Gallery'
import {FormControl,FormGroup,InputGroup,Glyphicon} from 'react-bootstrap'

const MAX_CHILDS=20;

class App extends Component{

    constructor(props) {
        super(props);
        this.state={
            lastQuery:"",
            query:"",
            after:"",
            images:[]
        }
    }

    setResponseChildToMaxChilds(response){
        while (response.data.children.length>MAX_CHILDS) {
            response.data.children.pop();
        }
        let lastChildIndex=response.data.children.length-1;
        return response.data.children[lastChildIndex].data.name;

    }

    handleResponse(response){
        let after="";
        let images=[];
        let query=this.state.query;
        if (response.data!==undefined) {
            after = this.setResponseChildToMaxChilds(response);
            images = response.data.children.map(child => {
                let data = child.data;
                return {url: data.thumbnail, link: data.permalink, title: data.title};
            });
        }
        this.setState({after,images,query,lastQuery:this.state.query});
    }

    search=()=>{
        let currentAfter=this.state.query!==this.state.lastQuery? null : this.state.after;
        window.reddit.hot(this.state.query)
            .limit(MAX_CHILDS)
            .after(currentAfter)
            .fetch((response) =>{
               this.handleResponse(response);
            })
    }

    render(){
        return (
            <div className="app">
                <div className="app-title">Photo Gallery</div>
                <FormGroup className="search-bar">
                    <InputGroup bsSize="large">
                        <FormControl
                            type='text'
                            placeholder="Search for subrredit photos"
                            value={this.state.query}
                            onChange={(event) =>this.setState({query:event.target.value})}
                            onKeyPress={(event)=> event.key==="Enter"? this.search():''}
                        />
                        <InputGroup.Addon >
                            <Glyphicon className="search-icon" glyph='search'  onClick={this.search}/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <Gallery images={this.state.images}/>
                <Button className="button-next" bsStyle='primary' bsSize='large' disabled={this.state.images.length===0} onClick={this.search}> next </Button>
            </div>
        )
    }
}

export default App;