export interface TypingData {
  elm: string;
  changeCallback?: (text: string)=>{};
  strings: string | string[];
  startDelaySpeed?: number;
  deleteSpeed?: number;
  shouldDelete?: boolean;
  sleepTime?: number;
}