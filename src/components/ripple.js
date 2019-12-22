export default class Ripple {
  constructor(el) {
    this.el = el;
    this.ripples = [];

    this.isClicked = false;
    this.timer = 0;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);

    // add touch events
    this.el.addEventListener('mousedown', this.onMouseDown);
    this.el.addEventListener('mouseup', this.onMouseUp);

    this.el.addEventListener('animationend', this.onAnimationEnd);
  }

  onMouseDown(e) {
    const coords = this.el.getBoundingClientRect();
    const baseSize = coords.width;
    const halfSize = baseSize / 2;

    this.ripple = this.createAndAppendRipple();

    this.ripple.style.width = baseSize + 'px';
    this.ripple.style.height = baseSize + 'px';

    this.ripple.style.top = -halfSize + (e.clientY - coords.top) + 'px';
    this.ripple.style.left = -halfSize + (e.clientX - coords.left) + 'px';

    this.ripple.classList.add('ripple-start');

    this.isClicked = true;
    this.timer = e.timeStamp;
  }

  onMouseUp(e) {
    this.isClicked = false;

    if ((e.timeStamp - this.timer) < 300) {
      this.isQuickRipple = true;
      this.timer = 0;
    } else {
      this.ripple.classList.remove('has-focused-ripple');
      this.ripple.classList.add('ripple-end');
    }
  }

  onAnimationEnd(e) {
    if (e.animationName === 'rippleStart' && this.isClicked) {
      // focused, pulsing animation
      console.log('focused, pulsing animation')
      this.ripple.classList.remove('ripple-start');
      this.ripple.classList.add('has-focused-ripple');
    } else if (e.animationName === 'rippleStart' && !this.isClicked) {
      // normal, quick animation
      console.log('normal, quick animation')
      e.target.classList.remove('ripple-start');
      e.target.classList.add('ripple-end');
    } else if (e.animationName === 'focusedRipple') {
      // this.ripple.classList.remove('has-focused-ripple');
      // this.ripple.classList.add('ripple-end');
    } else if (e.animationName === 'rippleEnd') {
      console.log(this.isQuickRipple)
      // console.log(this.ripple.classList)
      // this.ripple.classList.remove('ripple-end');
      e.target.classList.remove('ripple-end');
      this.timer = 0;
      this.removeRipple(e.target);
    }

    // // normal, quick animation
    // if (e.animationName === 'rippleStart') {
    //   console.log('normal, quick animation')
    //   e.target.classList.remove('ripple-start');
    //   e.target.classList.add('ripple-end');
    // }

    // if (e.animationName === 'rippleEnd') {
    // }
  }

  createAndAppendRipple() {
    // set background too
    const ripple = document.createElement('div');
    ripple.className = 'ripple';

    return this.el.appendChild(ripple);
  }

  removeRipple(el) {
    el.remove();
  }
}
