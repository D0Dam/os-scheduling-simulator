export class Process {
  readonly name: string;

  readonly at: number;

  readonly bt: number;

  public tt: number;

  public rt: number;

  public bursted: number;

  public start: number;

  constructor(props: { name: string; at: number; bt: number }) {
    this.name = props.name;
    this.at = props.at;
    this.bt = props.bt;
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
    this.setEnd(time);
  }

  setEnd(time: number) {
    this.tt = time - this.at;
  }

  isEnd(): boolean {
    return this.tt - this.wt === this.bt;
  }

  updateBurseted(): void {
    this.bursted += this.end - this.start;
  }

  compare(other: Process): number {
    if (this.at !== other.bt) return this.at - other.at;
    if (this.bt !== other.bt) return this.bt - other.bt;
    return this.name.localeCompare(other.name);
  }
}
