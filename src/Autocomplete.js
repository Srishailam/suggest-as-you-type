import React, {useReducer, useRef, useState, useEffect} from 'react'

const Autocomplete = ({countries}) => {

  const [state, setState] = useState({
    activeItem: 0,
    filteredItems: [],
    displayItems: false,
    inputValue:''
  })
  const fieldRef = useRef();
  const [selected, dispatchSelected] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, {id: state.length, name: action.name}];
      case 'remove':
        return state.filter( (_, idx) => idx !== action.index)
      case 'empty':
        return [];
      default:
        return state;
    }
  }, []);
  const [itemsArray, setItemsArray] = useState([]);
  useEffect(
      () => {
          setItemsArray(selected.map(item => item.name.trim()))
      }, [selected]
  )
  function handleAddItems(e){
    dispatchSelected({
      type:'add',
      name:e
    })
  }
  const handleClick = (e) => {
    setState({
      activeItem: 0,
      filteredItems:[],
      displayItems: false,
      inputValue: e.currentTarget.innerText
    })
    fieldRef.current.value = ""; 
    handleAddItems(e.currentTarget.innerText); 
  }
  const handleChange = (e) =>{
    const inputValue = e.currentTarget.value;
    const filteredItems = countries.map( country => country.name).filter( 
      country => country.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
      setState({
        activeItem: 0,
        filteredItems,
        displayItems: true,
        inputValue
      })
  }
  const handleKeyDown = (e) => {
    const { activeItem, filteredItems} = state;
    if(e.keyCode === 13) {
      setState({
        activeItem:0,
        filteredItems: [],
        displayItems: false,
        inputValue: filteredItems[activeItem]
      })
      fieldRef.current.value = ""; 
      handleAddItems(filteredItems[activeItem]); 
    } else if (e.keyCode === 38) { 
      e.preventDefault();
      if (activeItem === 0) {
          return;
      }
      setState({
          activeItem: activeItem - 1,
          filteredItems,
          displayItems: true,
          inputValue: e.currentTarget.value
      });
    } else if (e.keyCode === 40) { 
        e.preventDefault();
        if ((filteredItems && activeItem === filteredItems.length - 1) || activeItem >= 9) {
            return;
        }
        setState({
            activeItem: activeItem + 1,
            filteredItems,
            displayItems: true,
            inputValue: e.currentTarget.value
        });
    }
  }
  const filteredList = state.filteredItems.map( country => 
    <li onClick={handleClick}>{country}</li>
    ).slice(0, 10);
  return (
    <div className="Autocomplete">
        <h1>Autocomplete</h1>
        <input 
          type="text"
          value={state.inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={fieldRef}
        />
        {
          state.displayItems && state.inputValue.length && state.filteredItems.length ? 
          <ul>{filteredList}</ul> 
        : null
        }
        <div className="tag-container">
        {itemsArray.map((item, index) => (
            <div key={`country_${index}`} className="icon-tags">
                <span
                    data-uk-icon="icon: close; ratio: 1.15"
                    onClick={() => dispatchSelected({ type: "remove", index })}>X</span>
                <p>{item}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Autocomplete
