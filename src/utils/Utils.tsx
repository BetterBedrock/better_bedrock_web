class Utils {
  static timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
}

export default Utils;
