export {}

declare global {
   interface String {
      lc(that: string): boolean;
   }
}

String.prototype.lc = function (that: string): boolean {
   return this.toLowerCase() == that.toLowerCase();
};