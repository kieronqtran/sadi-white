export const POST_TEST_SUCCESSFUL = "RECEIVED_TEST";
export const POST_TEST_FAIL = "FAILED_TO_POST_TEST";

export function postTest(test){
  return function(dispatch) {
    return fetch('/testings',{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(test),
    })
      .then(res => {
        if(res.status === 201) {
          dispatch({
            type: POST_TEST_SUCCESSFUL,
          });
        }
        if(res.status === 500) {
          dispatch({
            type: POST_TEST_FAIL,
          })
        }
      });
  };
}
