import React from 'react';

const Dropdown = ({selectedId, items, defaultMessage, noItemsMessage, onChange}) => {

    const onClick = (id) => {
        return () => {
            onChange(id);
        }
    }

    const getItems = () => {
        if(items.length) {
            return items.map(item => (<div className="dropdown-item" key={item.id} onClick={onClick(item.id)}>{item.text}</div>));
        }

        return (<div className="dropdown-item">{noItemsMessage}</div>)
    }

    return (
        <div className="dropdown">
            <button className="btn dropdown-toggle bg-white border-2 border-dark" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {selectedId ? items.find(item => item.id === selectedId).text : defaultMessage}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {getItems()}
            </div>
        </div>
    );
};

export default Dropdown;
