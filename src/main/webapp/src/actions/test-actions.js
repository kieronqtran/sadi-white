export const GET_LIST_TEST = "RECEIVED_LIST_TEST";
export const GET_LIST_TEST_ERROR = "FAILED_TO_RECEIVE_LIST_TEST";

function setCookie(cname,cvalue,extime){
  var d = new Date();
  d.setTime(d.getTime()+(extime*1000));
  var expire = "expires=" + d.toUTCString();
  document.cookie = cname +"=" + cvalue + ";" + expire + ";path=/";
}

function getCookie(cname){
  var name = cname + "=";
  var decodedCookie= decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i=0; i<ca.length; i++){
    var c = ca[i];
    while (c.charAt(0) == ''){
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0){
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname){
  setCookie(cname,"",-1);
}

export function getListTest(){
	return async dispatch => {
    const token = sessionStorage.getItem('token')
    const res = await fetch('/api/testings',{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    try {
      dispatch({ type: GET_LIST_TEST, testList: data })
    } catch (error) {
      dispatch({ type: GET_LIST_TEST_ERROR, error: error.message })
    }
  }
}
