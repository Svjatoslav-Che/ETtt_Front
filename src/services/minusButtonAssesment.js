export async function minusButtonAssesment(idNum) {
  fetch('http://178.62.45.138:3001/comments/' + idNum + '/negative', {
    method: 'POST',
  });
}

