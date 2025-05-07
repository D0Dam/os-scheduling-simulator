export class Process {
  readonly name: string;

  readonly at: number;

  readonly bt: number;

  readonly color: string;

  public wt: number;

  public tt: number;

  #progress: number;

  public start: number;

  constructor(props: { name: string; at: number; bt: number; color: string }) {
    this.name = props.name;
    this.at = props.at;
    this.bt = props.bt;
    this.color = props.color;
    this.wt = 0;
    this.tt = 0;
    this.#progress = 0;
    this.start = 0;
  }

  get ntt(): number {
    return this.tt / this.bt;
  }

  get end(): number {
    return this.at + this.tt;
  }

  isEnd(): boolean {
    return this.#progress >= this.bt;
  }

  get responseRatio(): number {
    return (this.wt + this.bt) / this.bt;
  }

  get remainProgress(): number {
    return this.bt - this.#progress;
  }

  updateProgress(wps: number): void {
    this.#progress += Math.min(wps, this.bt - this.#progress);
  }

  updateWT(): void {
    this.wt += 1;
  }

  updateTT() {
    this.tt += 1;
  }

  compare(other: Process): number {
    if (this.at !== other.bt) return this.at - other.at;
    if (this.bt !== other.bt) return this.bt - other.bt;
    return this.name.localeCompare(other.name);
  }
}
