export class ParseForm {
  private form: HTMLFormElement;

  constructor(form: HTMLElement) {
    this.form = form as HTMLFormElement;
  }

  public getValues() {
    const formData = new FormData(this.form);
    return formData.entries();
  }

  public getData() {
    // eslint-disable-next-line no-undef
    const result: Record<string, FormDataEntryValue> = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of this.getValues()) {
      result[key] = value;
    }

    return result;
  }
}
