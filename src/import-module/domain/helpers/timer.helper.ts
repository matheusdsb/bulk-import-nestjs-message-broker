export class TimerHelper {
  static sleep(miliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
  }
}
