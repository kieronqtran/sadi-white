// generate answer for each question
import React from 'react';

const answerForm = ({ input, key, nameQues, label, type, value, meta: { touched, error } }) => (
  <tr>
    <td>
      <input type="radio" id={key} name={nameQues} value={key}/>
      <label for={key}></label>
    </td>
    <td>
      <h6>{label}</h6>
    </td>
  </tr>

);

export default answerForm;
