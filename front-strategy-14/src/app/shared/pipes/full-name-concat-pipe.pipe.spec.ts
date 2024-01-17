import { FullNameConcatPipe } from './full-name-concat-pipe.pipe';

describe('fullNameConcatPipe', () => {
  it('create an instance', () => {
    const pipe = new FullNameConcatPipe();
    expect(pipe).toBeTruthy();
  });
});
