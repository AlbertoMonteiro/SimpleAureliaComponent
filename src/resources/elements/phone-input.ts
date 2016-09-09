import { bindable, bindingMode } from 'aurelia-framework';

const padrao = /(\d{2})(\d{4,5})(\d{4})/;

export class PhoneInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value: string;
  displayValue: string;
  isInvalid: boolean;
  @bindable hasFocus: boolean;

  attached() {
    this.applyMask();
  }

  valueChanged() {
    this.validate();
    this.applyMask();
  }

  hasFocusChanged() {
    if (this.hasFocus)
      this.displayValue = this.value;
    else {
      this.value = this.displayValue;
      this.valueChanged();
    }
  }

  private applyMask() {
    this.displayValue = padrao.test(this.value) ? this.value.replace(padrao, "($1) $2-$3") : this.value;
  }

  private validate() {
    this.isInvalid = this.value && !padrao.test(this.value);
  }
}
