export async function putCommentToServer(inUserName, inUserToken, inCommentText) {
  fetch('http://localhost:3001/comments', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userName: inUserName,
      userToken: inUserToken,
      commentText: inCommentText,
    }),
  });
}
