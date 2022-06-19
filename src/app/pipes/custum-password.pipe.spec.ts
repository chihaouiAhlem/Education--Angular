import { CustumPasswordPipe } from './custum-password.pipe';

describe('CustumPasswordPipe', () => {
  it('create an instance', () => {
    const pipe = new CustumPasswordPipe();
    expect(pipe).toBeTruthy();
  });
});
