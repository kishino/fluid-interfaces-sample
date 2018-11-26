<template>
  <div>
    <div class="player-modal__background" v-show="background" :style="{
      opacity: swipeRatio,
      transition: dragging ? undefined : 'all 300ms'
    }"></div>
    <div class="player-modal" ref="modal"
         :style="{
         transform: 'translate3d(0, ' + pageTop + 'px, 0)',
         transition: dragging ? undefined : 'all 300ms'
       }">
      <div class="player-modal__semi"
           @touchstart.prevent="onTouchStart"
           @touchmove.prevent="onTouchMove"
           @touchend.prevent="onTouchEnd"
           @click.stop="show">
        <div class="player-modal__image" :style="{
        width: imageSize+'px',
        height: imageSize+'px',
        transition: dragging ? undefined : 'all 300ms'
      }">
          <div class="player-modal__close" v-show="state === 'open'" style="font-size: 24px;" @click.stop="close"><v-ons-icon icon="fa-arrow-down"></v-ons-icon></div>
        </div>
        <div class="player-modal__semi-other" v-show="!dragging && state === 'semiopen'">
          <div class="player-modal__semi-content">
            <div class="player-modal__semi-title">{{ data.title }}</div>
            <div class="player-modal__semi-author">{{ data.author }}</div>
          </div>
          <div class="player-modal__semi-action">
            <div style="font-size: 22px;padding-top: 3px;" @click.stop="play"><v-ons-icon icon="fa-play"></v-ons-icon></div>
            <div style="font-size: 26px;" @click.stop="close"><v-ons-icon icon="fa-times"></v-ons-icon></div>
          </div>
        </div>
      </div>
      <div class="player-modal__main" :style="{ opacity: swipeRatio }">
        <div class="player-modal__main-title">{{ data.title }}</div>
        <div class="player-modal__main-author">{{ data.author }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import playerModalEvent from './player-modal-event';

  const semimodalHeight = 64;

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
        background: false,
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
      this.$refs.modal.addEventListener('transitionend', this.onTransitionEnd);
      playerModalEvent.$on('show', this.show);
    },
    destroyed() {
      this.$refs.modal.removeEventListener('transitionend', this.onTransitionEnd);
      playerModalEvent.$off('show', this.show);
    },
    computed: {
      imageSize() {
        const size = this.windowWidth*this.swipeRatio;
        return size >= semimodalHeight ? size : semimodalHeight;
      },
      dragging() {
        return this.state === 'dragging';
      }
    },
    methods: {
      show() {
        this.pageTop = 0;
        this.swipeRatio = 1;
        this.state = 'open';
      },
      close() {
        this.pageTop = this.windowHeight;
        this.swipeRatio = 0;
        this.state = 'close';
      },
      play() {
        console.info('play!!');
      },
      onTouchStart(e) {
        this.startY = e.changedTouches[0].clientY;
        this.startPageTop = this.pageTop;
      },
      onTouchMove(e) {
        this.state = 'dragging';
        this.background = true;
        const pageTop = this.startPageTop + e.changedTouches[0].clientY - this.startY;
        if (pageTop >= 0 && pageTop <= this.windowHeight - semimodalHeight) {
          this.pageTop = pageTop;
          this.swipeRatio = 1 - (pageTop / this.windowHeight);
          e.preventDefault();
        }
      },
      onTouchEnd(e) {
        if (this.pageTop > this.windowHeight/2) {
          this.pageTop = this.windowHeight - semimodalHeight;
          this.swipeRatio = this.swipeRatio/this.windowWidth;
          this.state = 'semiopen';
        } else {
          this.pageTop = 0;
          this.swipeRatio = 1;
          this.state = 'open';
        }
      },
      onTransitionEnd() {
        this.background = this.state === 'open';
      }
    },
    watch: {
      state(newValue) {
        this.$emit('update:modalState', newValue);
      }
    }
  }
</script>

<style scoped>
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
.player-modal {
  width: 100vw;
  z-index: 11;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  color: #333;
  background-color: white;
  font-family: -apple-system,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
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
}
.player-modal__image {
  background-image: url('./assets/image.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: zoom-in;
  height: 100vw;
}
.player-modal__semi-other {
  display: flex;
  flex-grow: 1;
  align-items: center;
  overflow: hidden;
  width: calc(100% - 64px);
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
