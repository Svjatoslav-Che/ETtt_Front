export async function getServerComments() {
  return fetch('http://178.62.45.138:3001/comments', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
    .then(response => response.json());
}
