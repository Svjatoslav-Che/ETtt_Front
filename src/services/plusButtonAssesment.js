export async function plusButtonAssesment(idNum) {
  fetch('http://localhost:3001/comments/' + idNum + '/positive', {
    method: 'POST',
  });
}

