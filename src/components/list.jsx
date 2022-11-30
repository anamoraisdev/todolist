import React, { useState, useEffect } from "react";

const List= () => {
    const [tarefa, setTarefa] = useState("");
    const [itemsList, setItemsList] = useState([]);

    const capturarInput = (e) => {
        const inputTarefa = e.target.value;
        setTarefa(inputTarefa);
    }

    const addItemsList = (e) => {
        e.preventDefault(); 
        setItemsList([...itemsList, { texto: tarefa, concluido: false }]);
        localStorage.setItem("tarefas", JSON.stringify([...itemsList, { texto: tarefa, concluido: false }]))
        setTarefa("");
    }

    const removeItemsList = (index) => {
        const newItems = [...itemsList]
        newItems.splice(index, 1)
        setItemsList(newItems)
        localStorage.setItem("tarefas", JSON.stringify(newItems))
    }
    const checkItem = (valorConcluido, index) => {
        const newItems = [...itemsList]
        newItems[index].concluido = valorConcluido
        setItemsList(newItems)
        localStorage.setItem("tarefas", JSON.stringify(newItems))
    }
   return(
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 w-screen h-screen flex justify-center items-center flex-col">
            <form onSubmit={addItemsList} className="bg-gray-100 w-[65%]">
                <input type="text" placeholder="Adicione uma tarefa" onChange={capturarInput} value={tarefa} className="w-[75%] h-[40%] rounded-xl m-7  text-gray-500 outline-none shadow-md px-4"/>
                <button type="submit" className="w-[100px] h-[35px] shadow-md rounded-md text-gray-100 bg-gradient-to-r from-gray-900 to-gray-700 ">ADD</button>
            </form>

            <ul className="bg-gray-100 w-[65%] divide-y divide-slate-200 text-gray-500 "  >
                {itemsList.map((item, index) => ( 
  	            <li className="mx-7 h-[40px] flex items-center justify-between" key={index}>
                    <div id={`tarefa-${index}`} className="flex gap-6 ">
                        <input type="checkbox" checked={item.concluido} onChange={(evento) => checkItem(evento.target.checked, index)}/>
                        <p className={`${item.concluido && 'line-through' }`} onClick={() => mudarParaInput(item.texto, index)}>{item.texto}</p>
                    </div>
                    <button onClick={() => removeItemsList(index)}>delete</button>
                </li> 
	            ))}

            </ul>
       </div>
   )
}
export default List;