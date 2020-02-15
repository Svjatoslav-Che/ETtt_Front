export function generateSubToken() {
  let subToken = '';
  const generationSymbols = 'abcdefghijklmnopqrstuvwxyz123456789';
  for (let i = 0; i < 20; i++)
    subToken += generationSymbols.charAt(Math.floor(Math.random() * generationSymbols.length));
  return subToken;
}
