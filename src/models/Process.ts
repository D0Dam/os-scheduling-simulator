export class Process {
  readonly name: string;

  readonly at: number;

  readonly bt: number;

  public tt: number;

  constructor(props: { name: string; at: number; bt: number }) {
    this.name = props.name;
    this.at = props.at;
    this.bt = props.bt;
    this.tt = 0;
  }

  get wt(): number {
    return this.tt - this.bt;
  }

  get ntt(): number {
    return this.tt / this.bt;
  }
}

export const processCompare = (a: Process, b: Process): number => {
  if (a.at !== b.at) return a.at - b.at;
  if (a.bt !== b.bt) return a.bt - b.bt;
  return a.name.localeCompare(b.name);
};
