export function fetchOrders(){
    return function(dispatch){
        fetch("http://bestlab.us:8080/orders")
        .then((res)=>
            {return res.json()})
        .then((data)=>{
            dispatch({
                type: 'FETCH_ORDER_SUCCESS',
                orders: data
            })
        })   
    }
}

export function saveOrder(order){
    return function(dispatch){
        fetch(`http://bestlab.us:8080/orders`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            method: 'post', 
            body: JSON.stringify(order)
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            dispatch({type:'ADD_ORDER_SUCCESS', order: data})
        })
    }
}

export function updateOrder(order){
    

    return function(dispatch){
        console.log(order)

        fetch(`http://bestlab.us:8080/orders/`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            method: 'put', 
            body: JSON.stringify(order)
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            dispatch(fetchOrders())
        })
    }
}

export function deleteOrder(id){
        return function(dispatch){
            console.log(id)
            fetch(`http://bestlab.us:8080/orders/${id}`, {
                method: 'delete', 
            })
            .then((res)=>
                {return res.json()})
            .then((data)=>{
                console.log(data)
                dispatch({type: 'DELETE_ORDER', id: id})
            })   
    }
}

export function editOrder(id){
        return function(dispatch){
            fetch(`http://bestlab.us:8080/orders/${id}`, {
                method: 'GET', 
            })
            .then((res)=>
                {return res.json()})
            .then((data)=>{
                dispatch({type: 'EDIT_ORDER_SUCCESS', editedOrder: data})
            })   
    }
}


