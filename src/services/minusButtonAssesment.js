export async function minusButtonAssesment(idNum) {
  fetch('http://localhost:3001/comments/' + idNum + '/negative', {
    method: 'POST',
  });
}

