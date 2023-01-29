import getCardType from './validator';

export default class InnFormWidget {
  constructor(container) {
    this.container = container;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  bindToDOM() {
    this.submit = this.container.querySelector('#submitform');
    this.input = this.container.querySelector('.form-control');
    this.form = this.container.querySelector('.form-inline');
    this.successImg = this.container.querySelector('.succses-img');
    this.tooltip = this.container.querySelector('.tooltip');
    this.tooltipInner = this.tooltip.querySelector('.tooltip-inner');

    this.form.addEventListener('submit', this.onSubmit);
    this.form.addEventListener('input', this.onInput);
  }

  iconToggle(value) {
    this.container.querySelectorAll('.card').forEach((e) => {
      if (!e.classList.contains(value)) {
        e.classList.add('cdisabled');
      } else {
        e.classList.remove('cdisabled');
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.input.value;
    const response = getCardType(value, true);

    if (response.success) {
      this.successImg.classList.remove('hidden');
      this.iconToggle(response.type);
      const width = this.form.clientWidth;
      this.successImg.style = `left:${1 * width + 15}px;`;
      this.input.classList.add('form-control_valid');
    } else if (response.success === false) {
      this.input.classList.add('form-control_unvalid');
      this.tooltipInner.textContent = response.message;
      const height = this.input.clientHeight;
      const width = this.input.clientWidth;
      this.tooltip.style = `top:${1.1 * height}px; width:${width}px `;
      this.tooltip.classList.remove('hidden');
    }
  }

  onInput(e) {
    e.preventDefault();
    this.tooltip.classList.add('hidden');
    this.successImg.classList.add('hidden');
    this.input.classList.remove('form-control_valid');
    this.input.classList.remove('form-control_unvalid');
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    const value = this.input.value;

    this.timeout = setTimeout(() => this.iconToggle(getCardType(value, false)), 300);
  }
}
