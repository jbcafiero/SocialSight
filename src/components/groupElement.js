import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

const GroupElement = (props) => {

    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true)
    });

    const capitalize = (str) => {
        let spaceIndexes = [0]
        let currentIndex=0;
        let stringToReturn = str
        console.log(this)
        while (true) {
            const result = stringToReturn.indexOf("-", currentIndex+1)
            if(result==-1) {
                break
            }
            spaceIndexes.push(result)
            currentIndex = result
            console.log(spaceIndexes)
        }
        spaceIndexes.forEach((index) => {
            //index==0?0:index+1
            stringToReturn = stringToReturn.substring(0, index==0?0:index+1) +
            stringToReturn.charAt(index==0?0:index+1).toUpperCase() +
            stringToReturn.substring((index==0?0:index+1)+1)
            console.log(index+1)
        })
        console.log(stringToReturn)
        return stringToReturn.replace(/-+/g, ' ')
    }


    return (
        
        <div className="applyTrans" style={{color: 'black', opacity: isMounted ? '1' : '0'}}>
            <Link to={`/groups/${props.name}`} style={{textDecoration: 'none', color:'black'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '70%', margin: '50px 15% 50px 15%',
                    alignItems: 'center', background: '#c6acff', borderRadius: '3px'}}>
                    <div style={{borderBottom: '2px solid black'}}>
                        <h2 style={{margin: '0 0 0 0 px', padding: '0', fontWeight: 'bold', fontSize: '33px'}}>
                        {capitalize(props.name)}</h2>
                    </div>
                    <div>
                        <p style={{margin: '0', padding: '25px'}}>
                            {props.desc}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default GroupElement
