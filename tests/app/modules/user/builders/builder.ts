export class Builder<K> {
  protected props: K;

  public constructor(props: K) {
    this.props = props;
  }

  protected with<T extends keyof K>(param: T, value: K[T]): this {
    this.props[param] = value as never;
    return this;
  }

  protected getProps(): K {
    return this.props;
  }
}