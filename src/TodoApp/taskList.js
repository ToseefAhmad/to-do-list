import React from 'react';

const TaskList = (props) =>{
    const {
        item,
        onDelete,
        onUpdate,
        editFiled,
        tempId,
        setTempId
    } = props;

    const itemId = item.id;
    return (
        <>
            <div>
                {
                    itemId === tempId ? 
                    <div>
                        <form>
                            <h2>Tilte : {item.title}</h2>
                            <input  type='text' id='des' name='des' defaultValue={item.description} onChange={editFiled}/>
                            <button type='button' onClick={()=> onUpdate(item.title)}>Submit</button>
                        </form>
                    </div> : <div>
                        <h2>
                            Tilte : {item.title}
                        </h2>
                        <h1>
                            Task Descstiption : 
                        </h1>
                        <p>
                            {item.description}
                        </p>
                        <button onClick={() => setTempId(itemId)}> Update Task</button>
                        <button onClick={() => onDelete(itemId)}> Delete </button>
                    </div>
                }
            </div>
        </>
    )
};

export default TaskList;