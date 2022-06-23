
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


function CharacterDetail({character, onPartyAdd, onGoBack}){

   const spells=character.spellList
   const spellItems = spells.map((spell)=> <li>{spell}</li>)
   
   const profs=character.proficiencyList
   const profItems = profs.map((prof) => <li>{prof}</li>)

   const languages = character.languageList
   const languageitems = languages.map((language)=> <li>{language}</li>)

    return(
        <div className="characterDetail">
            <button onClick={(e) => onPartyAdd(e, character)}>Add To Party</button>
            <button onClick={onGoBack}>Go Back</button>
            <img className="detailImage" src={character.image} alt="character image"/>
            <div>
                <div className='characterDeetsTop'>
                    <h1>{character.name}</h1>
                    <b>Class: </b><a>{character.class}  </a><b>Race: </b><a>{character.race} </a>
                    <div></div>
                    <b>Health: </b><a>{character.health} </a>
                    <b>AC: </b> <a>  </a> <b>Iniative: </b><a>  </a>
                </div>
                <div className='characterDeets'>
                    <h3>Stats</h3>
                    <table className="statTable">
                        <tr>
                            <th >Strength   </th>
                            <th>Constitution </th>
                            <th>Dexterity </th>
                            <th>Intelligence</th>
                            <th>Wisdom</th>
                            <th>Charisma</th>
                        </tr>
                        <tr>
                            <td>{character.strength}</td>
                            <td>{character.constitution}</td>
                            <td>{character.dexterity} </td>
                            <td>{character.intelligence} </td>
                            <td>{character.wisdom}  </td>
                            <td>{character.charisma} </td>
                        </tr>
                        <tr>
                            <td>{Math.floor((character.strength - 10) / 2)}</td>
                            <td>{Math.floor((character.constitution - 10) / 2)}</td>
                            <td>{Math.floor((character.dexterity - 10) / 2)}</td>
                            <td>{Math.floor((character.intelligence - 10) / 2)}</td>
                            <td>{Math.floor((character.wisdom - 10) / 2)}</td>
                            <td>{Math.floor((character.charisma - 10) / 2)}</td>
                        </tr>
                    </table>
                </div>
                <hr></hr>
                <div className="characterContainer">
                    <Tabs>
                    <TabList className="bar">
                        <Tab >Spells</Tab>
                        <Tab >Skills</Tab>
                        <Tab >Proficiencies</Tab>
                        <Tab >Character Details</Tab>
                        <Tab>Backstory</Tab>
                    </TabList>
                        <TabPanel>
                        <div >
                            <h2>Spells</h2>
                            <div>{spellItems}</div>
                        </div>
                        </TabPanel>
                        <TabPanel>
                        <div >
                            <h2>Skills</h2>
                            <div>{character.proficiencyList}</div>
                        </div> 
                        </TabPanel>
                        <TabPanel>
                        <h2>Proficiencies</h2>
                            <div>{profItems}</div>
                        </TabPanel>
                        <TabPanel>
                        <h2>Character Details</h2>
                            <div className="row">
                                <div className="column">
                                    <p>Alignment: {character.alignment}</p>
                                    <p>Faith: {character.faith}</p>
                                    <p>Gender: {character.gender}</p>
                                    <p>Hair: {character.hair}</p>
                                    <p>Skin: {character.skin}</p>
                                </div>
                                <div className="column">
                                    <p>Eyes: {character.eyes}</p>
                                    <p>Height: {character.height}</p>
                                    <p>Weight: {character.weight}</p>
                                    <p>Background:{character.background}</p>
                                    <p>Languages: {languageitems}</p>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h3>Backstory: </h3>
                            <p>{character.backstory}</p>
                        </TabPanel>
                    
                    </Tabs>
                </div>
            </div>

            
            <hr></hr>
            
        </div>
    )
}

export default CharacterDetail



