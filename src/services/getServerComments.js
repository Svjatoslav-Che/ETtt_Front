export async function getServerComments() {
  return fetch('http://localhost:3001/comments', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
    .then(response => response.json());
}
