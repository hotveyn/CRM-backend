export interface IExecutable<T = any> {
  execute(...args: any[]): T;
}
