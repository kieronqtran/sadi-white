// generate answer for each question
import React from 'react';

const answerForm = ({ input, key, nameQues, label, type, value, quesId, setNewResult, meta: { touched, error } }) => (
  <tr>
    <td>
      <input type="radio" id={key} name={nameQues} value={key} onChange={setNewResult(0, 1)}/>
      <label for={key}></label>
    </td>
    <td>
      <h6 className="text-info">{label}</h6>
    </td>
  </tr>

);

export default answerForm;
