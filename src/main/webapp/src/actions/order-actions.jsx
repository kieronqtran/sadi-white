export function signUP(info){
    return function(dispatch){
        fetch(`/api/signup`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(info)
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            dispatch({
                type:'SIGN_UP',
                user: data
            })
        })
    }
}


