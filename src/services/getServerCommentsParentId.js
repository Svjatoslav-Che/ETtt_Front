export async function getServerCommentsParentId(inId) {
  return fetch('http://178.62.45.138:3001/comments/' + inId, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
    .then(response => response.json());
}
