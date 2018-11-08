describe('Basic math', () => {
  it('sums two numbers correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('multiplies by zero corectly', () => {
    expect(8 * 0).toBe(0);
  });
});

describe('Promise resolving', () => {
  it('resolves with correct result - constructor', (done) => {
    const myPromise = new Promise((resolve, reject) => {
      resolve(42);
    });

    myPromise.then(result => {
      expect(result).toBe(42);
      done();
    });
  });

  it('resolves with correct result - shorthand syntax', (done) => {
    Promise.resolve(42)
      .then((result) => {
        expect(result).toBe(42);
        done();
      });
  });
});

describe('Promise rejection', () => {
  it('rejects with error - constructor', (done) => {
    const myPromise = new Promise((resolve, reject) => {
      reject('Ooops...');
    });

    myPromise
      .then(result => {
        fail('This should never happen. Catch block should be called immediately')
      })
      .catch(error => {
        expect(error).toBe('Ooops...');
        done();
      });
  });

  it('rejects with error - shorthand syntax', (done) => {
    Promise.reject('Ooops...')
      .then(result => {
        fail('This should never happen. Catch block should be called immediately')
      })
      .catch(error => {
        expect(error).toBe('Ooops...');
        done();
      });
  });

  it('throws and error falls to catch block', (done) => {
    const chainedPromise = new Promise((resolve, reject) => {
      resolve(-1);
    }).then(result => {
      // if result is negative, throw => first chained catch block will be called all inbetween thens will be ignored
      if (result < 0) {
        throw new Error(`${result} is less than zero`);
      }

      // otherwise pass the result to next then
      resolve(result);
    });

    chainedPromise
      .then(result => {
        console.log('Then block', result);
        fail('Then block should not be called');
      })
      .catch(error => {
        expect(error.toString().indexOf('-1') > -1).toBeTruthy();
        done();
      });
  });
});
