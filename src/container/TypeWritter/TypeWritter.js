import React,{Component} from 'react';
import classes from './TypeWritter.module.css';

//import of other components
import Cursor from '../../component/Cursor/Cursor'

class TypeWriter extends Component {
    state = {
      completeSentence: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        typingSentence:[],
        timeToTypeCharacter:100,
        timeToWaitAfterComplete:1000,
        isTyped:false,
        isLooped:true,
    };


    // function to type the sentence
    writeSentence = () => {
        setTimeout(() => {
            this.setState({
                ...this.state,
                typingSentence:
                    this.state.typingSentence.concat(this.state.completeSentence.charAt(this.state.typingSentence.length)),
                isTyped:(this.state.typingSentence.length)+1 === this.state.completeSentence.length
            });
        },100);
    };

    // function to clear the sentence after type. (if looped is true)
    clearSentence = () => {
        setTimeout(() => {
            let typedArray = [...this.state.typingSentence];
            let updatedTypedArray = [];
            for (let i=0;i<typedArray.length-1;i++) {
                updatedTypedArray.push(typedArray[i]);
            }
            this.setState({
               ...this.state,
                typingSentence:updatedTypedArray,
                isTyped:!(updatedTypedArray.length === 0)
            });
        },100);
    };

    componentDidMount() {
        if (this.state.completeSentence.length > 0 && this.state.typingSentence.length === 0 && !(this.state.isTyped)) {
            this.writeSentence();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.typingSentence.length !== this.state.completeSentence.length && !(this.state.isTyped)){
            this.writeSentence();
        } else if (this.state.isTyped && this.state.isLooped) {
            this.clearSentence();
        }
    }

    render() {
        return(
            <div>{this.state.typingSentence}<Cursor/></div>
        )
    }
}

export default TypeWriter;
