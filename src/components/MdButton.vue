<template>
  <div class="debug">
    <div class="outer" ref="button">
      <!-- <div class="ripple"></div> -->
    </div>

    <button @click="clear">Clear</button>
  </div>
</template>

<script>
import Ripple from './ripple';

export default {
  name: 'md-button',
  mounted() {
    new Ripple(this.$refs.button);
  },
  methods: {
    clear() {
      while (this.$refs.button.firstChild) {
        this.$refs.button.removeChild(this.$refs.button.firstChild);
      }
      // this.$refs.button.innerHTML = '';
    }
  }
}
</script>

<style>
.outer {
  margin-left: 20px;
  margin-top: 20px;
  width: 200px;
  height: 100px;
  background: rgba(0, 0, 0, 0.1);
  background: tomato;
  position: relative;
  overflow: hidden;
}

.outer:before {
  position: absolute;
  left: 0;
  right: 0;
  content: '';
}

.ripple.has-focused-ripple {
  transform: scale(0.88);
  opacity: .5;

  animation: 1s focusedRipple;
  animation-play-state: running;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
}

.ripple.ripple-start {
  transform: scale(0);

  animation: .3s rippleStart;
  animation-timing-function: linear;
}

.ripple.ripple-end {
  transform: scale(.9);
  opacity: .5;

  animation: .3s rippleEnd;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.ripple {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 50%;

  transform: scale(0);

  background: #fff;
  opacity: 0.5;
}

@keyframes focusedRipple {
  100% {
    transform: scale(.9);
  }
}

@keyframes rippleStart {
  100% {
    opacity: .5;
    transform: scale(.9);
  }
}

@keyframes rippleEnd {
  100% {
    opacity: 0;
    transform: scale(2);
  }
}
</style>
