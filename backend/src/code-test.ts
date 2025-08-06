function normalFunction() {
  console.log('普通の関数です');
  return 123;
};

async function asyncFunction() {
  console.log('非同期関数です');
  throw new Error('エラーが発生しました。');
};

Promise.resolve(normalFunction())
  .then(result => {
    console.log('normalFunctionの実行結果', result);
  })
  .catch(error => {
    console.log('normalFunctionのエラー', error);
  });

Promise.resolve(asyncFunction())
  .then(result => {
    console.log('asyncFunctionの実行結果', result);
  })
  .catch(error => {
    console.log('asyncFunctionのエラー', error);
  })