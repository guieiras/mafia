import ptBr from './pt-BR';

function t(key, params) {
  if (!key) { return null; }
  const translation = key.split('.').reduce((memo, k) => memo[k], ptBr);
  if (!translation) { return key; }
  return Object.keys(params || {}).reduce((memo, replaceToken) => {
    const replaceValue = params[replaceToken];
    switch (typeof replaceValue) {
      case 'string':
        return memo.replace(`{${replaceToken}}`, replaceValue);
      case 'object':
        return memo.replace(`{${replaceToken}}`, t(...replaceValue));
      default:
        return memo;
    }
  }, translation);
}


export default {
  ...ptBr,
  t,
};
