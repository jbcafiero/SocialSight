import React, {useState, useEffect, useContext} from 'react'
import database from '.././database.js'
import GroupElement from './groupElement.js'
import plusButton from '../images/plus-button.png'
import MainProvider from '.././globalState.js'
import '.././App.css'

const Groups = (props) => {

    const [didMount, setDidMount] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [groupSearch, setGroupSearch] = useState([]);
    const [noSearchMessage, setNoSearchMessage] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if(!didMount) {
            database.collection("Groups").get().then((docs) => {
                let dataCollector = [];
                docs.forEach((doc) => {
                    dataCollector.push({
                    name: doc.data().name,
                    desc: doc.data().description,
                    id: doc.id
                    });
                });
                return (dataCollector)
            }).then((data) => {
            setGroupList(data);
            setGroupSearch(data);
            })
            setDidMount(true);
        }
    })

    const handleSearchItems = (str) => {
        let manipulatedStr = str
        manipulatedStr = manipulatedStr.replace(/\s+/g, '')
        manipulatedStr = manipulatedStr.replace(/-+/g, '')
        manipulatedStr = manipulatedStr.toLowerCase()
        return manipulatedStr
    }

    const search = (e) => {
        let collectData = []
        groupList.map((group)=>{
            let groupName = handleSearchItems(group.name)
            let searchName = handleSearchItems(e.target.value)
            console.log(searchName)
            if (groupName.includes(searchName)) {
                collectData.push(group)
            }
        })
        if(collectData.length==0) {
            setNoSearchMessage(true)
        }
        else {
            setNoSearchMessage(false)
        }
        setSearchInput(e.target.value)
        setGroupSearch(collectData);
    }

    const noResults = (condition, search) => {
        if(condition) {
            return(
                <div style={{color: '#c6acff', width: '70%', margin: '0 15% 0 15%',
                    display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <p style={{textAlign: 'center', alignSelf: 'center', fontSize: '25px'}}>No group named {search}. Create a petition for a group named {search}?</p>
                    <div className="plussButton"style={{ alignSelf: 'center',width: '45px', content: `url(${plusButton})`}} onClick={()=>{}}></div>
                </div>
            )
        }
    }

    return (
        <div>
            <div style={{margin: '27px  15% 53px', }}>
                <div style={{margin: '0 0 50px 0 px', paddingBottom: '50px', borderBottom: '3px solid #c6acff'}}>
                    <p style={{margin: '0px', padding: '0px', fontWeight: 'bold', fontSize: '50px',
                    color: '#c6acff',}}>Groups
                    </p>
                    <div style={{float: 'right', display: 'flex', marginTop: '-50px'}}>
                        <input maxLength='24' className="searchBar" type="text" onChange={search}
                        style={{height: '15px', width: '175px', margin: '0 0 0 0', padding: '12.5px',
                         fontSize: '25px', justifySelf: 'center'}} placeholder="search"></input>
                    </div>
                </div>
            </div>
            {/* {checkInitial(!didMount)} */}
{            groupSearch.map((group) => {
                return(
                    <GroupElement
                    name = {group.name}
                    desc = {group.desc}
                    id = {group.id.name}
                    />
                )
            })}
            {noResults(noSearchMessage, searchInput)}

            {console.log(groupSearch)}
        </div>
    )
}

export default Groups
