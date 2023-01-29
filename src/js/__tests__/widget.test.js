/**
 * @jest-environment jsdom
 */
import InnFormWidget from '../widget';

const containerMarkup = `<div class="widget-container">
   <h3>Проверка номера карты</h3>
   <ul class="cards list-unstyled">
       <li><span class="card visa" title="Visa">Visa</span></li>
       <li><span class="card master" title="Mastercard">Mastercard</span></li>
       <li><span class="card amex" title="American Express">American Express</span></li>
       <li><span class="card discover" title="Discover">Discover</span></li>
       <li><span class="card jcb" title="JCB">JCB</span></li>
       <li><span class="card diners_club" title="Diners Club">Diners Club</span></li>
       <li><span class="card mir" title="Diners Club">Мир</span></li>
       <li class="succses-img hidden"><img class="" src="https://free-png.ru/wp-content/uploads/2021/06/free-png.ru-39.png" alt="">
       </li>
   </ul>
   <form id="form" class="form-inline" novalidate="novalidate">
       <div class="form-group">
           <input class="form-control" id="card_number" name="card_number" type="number" placeholder="Номер карты">
           <div class="tooltip hidden">
               <div class="tooltip-arrow" style="left: 50%;"></div>
               <div class="tooltip-inner"></div>
           </div>
           <button id="submitform" class="btn btn-success">Проверка</button>
       </div>
   </form>
</div>`;

test('widget should binded to DOM', () => {
  document.body.innerHTML = containerMarkup;

  const container = document.querySelector('.widget-container');

  const widget = new InnFormWidget(container);
  widget.bindToDOM();

  expect(document.body.innerHTML).toBe(containerMarkup);
});

test('should widget render', () => {
  document.body.innerHTML = containerMarkup;

  const container = document.querySelector('.widget-container');

  const widget = new InnFormWidget(container);
  widget.bindToDOM();

  expect(document.body.innerHTML).toBe(containerMarkup);
});

test('should valid class add', () => {
  document.body.innerHTML = containerMarkup;

  const container = document.querySelector('.widget-container');

  const widget = new InnFormWidget(container);
  widget.bindToDOM();

  widget.input.value = '4024007111746516';
  widget.submit.click();

  expect(widget.input.classList.contains('form-control_valid')).toEqual(true);
});

test('should valid class add', () => {
  document.body.innerHTML = containerMarkup;

  const container = document.querySelector('.widget-container');

  const widget = new InnFormWidget(container);
  widget.bindToDOM();

  widget.input.value = '402400711174651';
  widget.submit.click();

  expect(widget.input.classList.contains('form-control_unvalid')).toEqual(true);
});
