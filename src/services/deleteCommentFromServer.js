export async function deleteCommentFromServer(idNum) {
  fetch('http://localhost:3001/comments', {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: idNum,
    }),
  });
}
