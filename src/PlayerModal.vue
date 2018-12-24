<template>
  <div class="player-modal">
    <div class="player-modal__background" v-show="backgroundVisible" :style="backgroundStyle"></div>
    <div class="player-modal__content" ref="modal">
      <div class="player-modal__semi"
           @touchstart.passive="onTouchStart"
           @touchmove.prevent="onTouchMove"
           @touchend="onTouchEnd"
           @touchcancel="onTouchEnd"
           @click.stop="open(true)">
        <div class="player-modal__image" :style="imageStyle">
          <div class="player-modal__close" v-show="state === 'open'" @click.stop="semiopen(false)">
            <v-ons-icon icon="fa-arrow-down"></v-ons-icon>
          </div>
        </div>
        <div class="player-modal__semi-other" v-show="!dragging && state === 'semiopen'">
          <div class="player-modal__semi-content">
            <div class="player-modal__semi-title">{{ data.title }}</div>
            <div class="player-modal__semi-author">{{ data.author }}</div>
          </div>
          <div class="player-modal__semi-action">
            <div style="font-size: 22px;padding-top: 3px;" @click.stop="play">
              <v-ons-icon v-show="playing" icon="fa-pause"></v-ons-icon>
              <v-ons-icon v-show="!playing" icon="fa-play"></v-ons-icon>
            </div>
            <div style="font-size: 26px;" @click.stop="close"><v-ons-icon icon="fa-times"></v-ons-icon></div>
          </div>
        </div>
      </div>
      <div class="player-modal__main" :style="mainStyle">
        <div class="player-modal__main-title">{{ data.title }}</div>
        <div class="player-modal__main-author">{{ data.author }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import dynamics from 'dynamics.js';

  const SEMIMODAL_HEIGHT = 64;
  const OPEN_OR_SEMIOPEN_RATIO = 0.25;

  export const playerModalEvent = new Vue();

  export default {
    props: ['modalState'],
    data() {
      return {
        pageTop: 0,
        startY: 0,
        startPageTop: 0,
        windowHeight: null,
        windowWidth: null,
        swipeRatio: 1,
        state: 'close',
        prevState: null,
        backgroundVisible: false,
        playing: false,
        data: {
          title: 'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
          author: '作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者'
        }
      };
    },
    created() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.pageTop = this.windowHeight;
    },
    mounted() {
      this.$refs.modal.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${this.pageTop}, 0, 1)`;
      playerModalEvent.$on('open', this.open);
    },
    destroyed() {
      playerModalEvent.$off('open', this.open);
    },
    computed: {
      backgroundStyle() {
        return {
          opacity: this.swipeRatio * 0.8,
          transition: this.dragging ? undefined : 'all 300ms'
        };
      },
      imageStyle() {
        const scale = this.imageSize / this.windowWidth;
        return {
          transition: this.dragging ? undefined : 'transform 300ms',
          transform: `scale(${scale})`,
          position: this.state !== 'semiopen' ? undefined : 'absolute'
        };
      },
      mainStyle() {
        const y = this.dragging ? -(this.windowWidth - this.imageSize) : 0;
        return {
          opacity: this.swipeRatio,
          transform: `translateY(${y}px)`,
        };
      },
      imageSize() {
        const size = this.windowWidth*this.swipeRatio;
        return size >= SEMIMODAL_HEIGHT ? size : SEMIMODAL_HEIGHT;
      },
      dragging() {
        return this.state === 'dragging';
      }
    },
    methods: {
      open(reopen) {
        this.pageTop = 0;
        this.swipeRatio = 1;
        this.state = 'open';
        if (!reopen) this.playing = true;
        this.startSpringNoneAnimation();
      },
      semiopen(animation = true) {
        this.pageTop = this.windowHeight - SEMIMODAL_HEIGHT;
        this.swipeRatio = 0;
        this.state = 'semiopen';
        if (animation) {
          this.startSpringAnimation();
        } else {
          this.startSpringNoneAnimation();
        }
      },
      close() {
        this.pageTop = this.windowHeight;
        this.swipeRatio = 0;
        this.state = 'close';
        this.emitState();
        this.startSpringNoneAnimation();
      },
      play() {
        this.playing = !this.playing;
      },
      onTouchStart(e) {
        this.startY = e.changedTouches[0].clientY;
        this.startPageTop = this.pageTop;
        this.prevState = this.state;
      },
      onTouchMove(e) {
        if (this.state !== 'dragging') {
          this.state = 'dragging';
          this.emitState();
        }
        this.backgroundVisible = true;
        const pageTop = this.startPageTop + e.changedTouches[0].clientY - this.startY;
        if (pageTop >= 0 && pageTop <= this.windowHeight - SEMIMODAL_HEIGHT) {
          this.pageTop = pageTop;
          this.$refs.modal.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${this.pageTop}, 0, 1)`;
          this.swipeRatio = 1 - (pageTop / (this.windowHeight - SEMIMODAL_HEIGHT));
        }
      },
      onTouchEnd(e) {
        if (this.state === 'dragging') {
          e.preventDefault();
        }
        if ((this.prevState === 'open' && this.pageTop > this.windowHeight*OPEN_OR_SEMIOPEN_RATIO)
          || (this.prevState !== 'open' && this.pageTop > this.windowHeight*(1-OPEN_OR_SEMIOPEN_RATIO))) {
          this.semiopen();
        } else {
          this.open();
        }
      },
      onTransitionEnd() {
        this.backgroundVisible = this.state === 'open';
      },
      startSpringAnimation() {
        dynamics.animate(this.$refs.modal, {
          translateY: this.pageTop
        }, {
          type: dynamics.spring,
          frequency: 150,
          friction: 350,
          duration: 1000,
          delay: 0,
          complete: () => {
            this.emitState();
            this.onTransitionEnd();
          }
        });
      },
      startSpringNoneAnimation() {
        dynamics.animate(this.$refs.modal, {
          translateY: this.pageTop
        }, {
          type: dynamics.spring,
          frequency: 0,
          friction: 300,
          duration: 600,
          delay: 0,
          complete: () => {
            this.emitState();
            this.onTransitionEnd();
          }
        });
      },
      emitState() {
        this.$emit('update:modalState', this.state);
      }
    }
  }
</script>

<style scoped>
.player-modal {
  font-family: -apple-system,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
}
.player-modal__background {
  background-color: black;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
}
.player-modal__content {
  z-index: 11;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  color: #333;
  background-color: white;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.player-modal__semi {
  display: flex;
}
.player-modal__close {
  color: white;
  width: 56px;
  height: 56px;
  text-align: center;
  line-height: 56px;
  font-size: 24px;
}
.player-modal__image {
  background-image: url('./assets/image.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: zoom-in;
  width: 100vw;
  height: 100vw;
  transform-origin: left top;
}
.player-modal__semi-other {
  display: flex;
  flex-grow: 1;
  align-items: center;
  overflow: hidden;
  width: calc(100% - 64px);
  margin-left: 64px;
}
.player-modal__semi-content {
  text-align: left;
  flex-grow: 1;
  padding: 8px 0 8px 8px;
  overflow: hidden;
}
.player-modal__semi-content > div {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.player-modal__semi-title {
}
.player-modal__semi-author {
  color: #999;
}
.player-modal__semi-action {
  display: flex;
  align-items: center;
  line-height: 44px;
}
.player-modal__semi-action > div {
  width: 44px;
  height: 44px;
  text-align: center;
}
.player-modal__main {
}
.player-modal__main-title {
  width: 100%;
  text-align: center;
  font-size: 21px;
}
.player-modal__main-author {
  width: 100%;
}
</style>
