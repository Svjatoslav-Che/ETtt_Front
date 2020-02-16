export async function plusButtonAssesment(idNum) {
  fetch('http://178.62.45.138:3001/comments/' + idNum + '/positive', {
    method: 'POST',
  });
}

