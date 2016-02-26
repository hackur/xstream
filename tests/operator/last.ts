import xs from '../../src/index';
import * as assert from 'assert';

describe('Stream.prototype.last', () => {
  it('should emit only the last value from a stream', (done) => {
    const expected = [50];
    const stream = xs.from([10, 20, 30, 40, 50]).last();
    let observer = {
      next: (x: number) => {
        assert.equal(x, expected.shift());
      },
      error: done.fail,
      complete: () => {
        assert.equal(expected.length, 0);
        stream.unsubscribe(observer);
        done();
      },
    };
    stream.subscribe(observer);
  });
});
