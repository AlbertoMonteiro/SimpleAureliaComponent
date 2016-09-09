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
    if (padrao.test(this.value))
      this.displayValue = this.value.replace(padrao, "($1) $2-$3");
    else
      this.displayValue = this.value
  }

  private validate() {
    this.isInvalid = this.value && !padrao.test(this.value);
  }
}
