export class Process {
  readonly name: string;

  readonly at: number;

  readonly bt: number;

  readonly color: string;

  public tt: number;

  public rt: number;

  public bursted: number;

  public start: number;

  constructor(props: { name: string; at: number; bt: number; color: string }) {
    this.name = props.name;
    this.at = props.at;
    this.bt = props.bt;
    this.color = props.color;
    this.tt = 0;
    this.rt = 0;
    this.bursted = 0;
    this.start = 0;
  }

  get wt(): number {
    return this.tt - this.bursted;
  }

  get ntt(): number {
    return this.tt / this.bt;
  }

  get end(): number {
    return this.at + this.tt;
  }

  setStart(time: number): void {
    this.start = time;
  }

  updateTT() {
    this.tt += 1;
  }

  isEnd(): boolean {
    return this.tt - this.wt >= this.bt;
  }

  updateBurseted(wps: number): void {
    this.bursted += Math.min(wps, this.bt - this.bursted);
  }

  compare(other: Process): number {
    if (this.at !== other.bt) return this.at - other.at;
    if (this.bt !== other.bt) return this.bt - other.bt;
    return this.name.localeCompare(other.name);
  }
}
