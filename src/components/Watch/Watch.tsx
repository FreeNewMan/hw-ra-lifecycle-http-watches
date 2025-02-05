import React, {Component} from 'react';
import moment from 'moment-timezone';
import './Watch.scss'

export default class Watch extends Component {
      constructor(props) {
      super();
      this.state = {
        curTime: undefined,
        curTz: undefined,
        city: props.city
      }

    }

    findTz = (city) => {
      let listTz = moment.tz.names();
      let srTZ = listTz.filter( item => item.toLowerCase().includes(`${city.toLowerCase()}`)); 
      console.log(listTz);
      console.log(srTZ[0]);
      return srTZ[0]
    }


     componentDidMount() {
         let curTz = this.findTz(this.state.city);
         console.log("Start Clock");
         if (curTz) {
          let curTime = moment().tz(curTz).format("H:mm:ss").toString()
          this.ticking = setInterval(() => 
            {
              console.log(this.ticking );
              this.setState({curTime: curTime })
             }

            , 1000)
         
         }
        }


     removeWatch = () => {
      console.log("Remove Clock");
      clearInterval(this.ticking);
      this.setState({curTime: ""})
     }    
         

    render() {
     // if (this.state.curTime) {
        return (
          <div className="watch-item">
             <div className="watch-name">{this.state.city}</div>
             <br/>
             <div className="bg-close" onClick={() => this.removeWatch()}></div>
             <div className="watch-content">
               <div className="watch-time">{this.state.curTime}</div>
             </div>
          </div>   
        );
      }
   // }
  }
  
