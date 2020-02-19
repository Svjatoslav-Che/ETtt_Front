export async function putCommentToServer(inUserName, inUserToken, inCommentText, inParentId) {
  fetch('http://178.62.45.138:3001/comments', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userName: inUserName,
      userToken: inUserToken,
      commentText: inCommentText,
      parentId: inParentId,
    }),
  });
}
