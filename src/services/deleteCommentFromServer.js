export async function deleteCommentFromServer(idNum) {
  fetch('http://178.62.45.138:3001/comments', {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: idNum,
    }),
  });
}
