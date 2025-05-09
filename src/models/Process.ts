export class Process {
  name: string;

  at: number;

  bt: number;

  color: string;

  wt: number;

  tt: number;

  progress: number;

  start: number;

  constructor(props: { name: string; at: number; bt: number; color: string }) {
    this.name = props.name;
    this.at = props.at;
    this.bt = props.bt;
    this.color = props.color;
    this.wt = 0;
    this.tt = 0;
    this.progress = 0;
    this.start = 0;
  }

  get ntt() {
    return this.tt / this.bt;
  }

  get end() {
    return this.at + this.tt;
  }

  isEnd() {
    return this.progress >= this.bt;
  }

  get responseRatio() {
    return (this.wt + this.bt) / this.bt;
  }

  get remainProgress() {
    return this.bt - this.progress;
  }

  updateProgress(wps: number) {
    this.progress += Math.min(wps, this.bt - this.progress);
  }

  updateWT() {
    this.wt += 1;
  }

  updateTT() {
    this.tt += 1;
  }

  compare(other: Process) {
    if (this.at !== other.at) return this.at - other.at;
    if (this.bt !== other.bt) return this.bt - other.bt;
    return this.name.localeCompare(other.name);
  }
}
