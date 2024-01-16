<script lang="ts">
import { Balloons } from '@/Balloons';
import { awesum } from '@/awesum';
import type { ServerDatabaseItem } from '@/serverClasses/ServerDatabaseItem';
import { ItemLevel } from '@/itemLevel';
import Fireworks from 'fireworks-js';
import JSConfetti from 'js-confetti';
import { ref } from 'vue';
//@ts-ignore
import * as ConfettiGenerator from "confetti-js"

export default {
  setup() {
    const pos = { top: 0, left: 0, x: 0, y: 0 };
    let isDragging = ref(false);
    const footer = ref(null as any as HTMLElement);
    const spellingDiv = ref(null as any as HTMLElement);
    const imageAndSound = ref(null as any as HTMLElement);
    const forwardButton = ref(null as any as HTMLElement);
    const backButton = ref(null as any as HTMLElement);

    return {
      pos,
      isDragging,
      footer,
      spellingDiv,
      imageAndSound,
      forwardButton,
      backButton
    };
  },
  onMounted() {
    debugger;
    this.footer = document.getElementById('footer') as HTMLElement;
    this.spellingDiv = document.getElementById('spellingDiv') as HTMLElement;
    this.imageAndSound = document.getElementById('imageAndSound') as HTMLElement;
    this.forwardButton = document.getElementById('forwardButton') as HTMLElement;
    this.backButton = document.getElementById('backButton') as HTMLElement;
    this.reset();
  },

  methods: {
    async lettersChanged() {
      var sliders = document.getElementsByClassName('slider');
      var currentWord = "";
      for (const ltr of sliders) {
        var selectedElement = (ltr as any).selectedElement;
        selectedElement.classList.remove('transparentLetter');
        selectedElement.classList.add('opaqueLetter');
        currentWord += selectedElement.innerText;
      }
      if (
        (currentWord as any).trimEnd().toLowerCase() ==
        awesum.currentDatabaseItem.text.toLowerCase()
      ) {

        for (const ltr of sliders) {
          for (let child of ltr.children as HTMLCollectionOf<HTMLElement>) {
            if (child != (ltr as any).selectedElement) {
              child.style.color = 'yellow';
            }
          }
          ltr.removeEventListener('mousedown', this.mouseDown);
          ltr.removeEventListener('touchstart', this.mouseDown);
        }

        // window.removeEventListener("mousemove", mouseMove);
        // window.removeEventListener("mouseup", mouseUp);

        // window.removeEventListener("touchmove", mouseMove);
        // window.removeEventListener("touchend", mouseUp);

        let confettiCanvas = document.getElementById('confettiCanvas') as HTMLCanvasElement
        let emojiCanvas = document.getElementById('emojiCanvas') as HTMLCanvasElement
        let fireworksCanvas = document.getElementById('fireworksCanvas') as HTMLCanvasElement
        let spellingDiv = document.getElementById("spellingDiv") as HTMLDivElement;
        if (emojiCanvas != null && fireworksCanvas != null && confettiCanvas != null) {

          const jsConfetti = new JSConfetti({ canvas: emojiCanvas });

          (spellingDiv as any).jsConfetti = jsConfetti;

          const showConfetti = () => {
            jsConfetti.addConfetti({
              emojis: awesum.getPropertyValue('emojis',ItemLevel.databaseItem)?.value,
              emojiSize: awesum.getPropertyValue('emojiSize',ItemLevel.databaseItem)?.value,
              confettiNumber: awesum.getPropertyValue('confettiNumber',ItemLevel.databaseItem)?.value
            });
          }

          var successSound = await awesum.getPropertyValue('successSound',ItemLevel.databaseItem)?.value;

          (spellingDiv as any).balloons = new Balloons(document.getElementById('balloonCanvas') as HTMLElement);
          (spellingDiv as any).balloons.createBalloons(30);

          const fireworks = new Fireworks(fireworksCanvas, { /* options */ })
          fireworks.start();
          (spellingDiv as any).fireworks = fireworks;

          showConfetti();
          (spellingDiv as any).confettiHandle = setInterval(() => {
            showConfetti();
          }, 2000);

          var confettiSettings = { target: confettiCanvas };
          (spellingDiv as any).confetti = new ConfettiGenerator.default(confettiSettings);
          (spellingDiv as any).confetti.render();

          await awesum.playAudioOrSpeech(successSound);
        }
        if (awesum.canGoForward()) {
          var currentIndex = awesum.currentDatabaseItem.order
          setTimeout(() => {
            // if (awesum.currentDatabaseItem.videoReward) {
            //   this.appStore.player.loadVideoByUrl(awesum.currentDatabaseItem.videoReward);
            // }

            if (awesum.currentDatabaseItem.order == currentIndex) {
              awesum.goForward();
            }
          }, 2000);
        }
      }
    },
    generateSimilarLetters(letter: string) {
      letter = letter.toLocaleUpperCase();
      const consonants = "BCDFGHJKLMNPQRSTVWXZ";
      const vowels = "AEIOUY";
      let similarLetters = new Array<string>();

      if (consonants.includes(letter)) {
        // generate a random list of other consonants
        while (similarLetters.length < 5) {
          let randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
          if (randomConsonant !== letter && !similarLetters.includes(randomConsonant)) {
            similarLetters.push(randomConsonant);
          }
        }
      } else if (vowels.includes(letter)) {
        // generate a random list of other vowels
        while (similarLetters.length < 5) {
          let randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
          if (randomVowel !== letter && !similarLetters.includes(randomVowel)) {
            similarLetters.push(randomVowel);
          }
        }
      }

      return similarLetters;
    },
    shuffleArray(array: Array<any>) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    },
    reset() {
      debugger;
      var viewDiv = document.querySelector('.view') as HTMLElement;
      viewDiv.style.display = 'flex';
      const sizeChanged = function () {

        let correctTop = document.querySelector('.sliderPlaceholder')?.getBoundingClientRect().top;
        var sliders = document.getElementsByClassName('slider');
        for (const ltr of sliders as HTMLCollectionOf<HTMLElement>) {
          var selectedElement = (ltr as any).selectedElement;

          ltr.style.top = -selectedElement.getBoundingClientRect().height * (Array.prototype.indexOf.call(ltr.children, selectedElement) - 1) + 'px';
        }
      }

      window.addEventListener('resize', sizeChanged);

      let spellingDiv = document.getElementById("spellingDiv") as HTMLDivElement;

      if (!spellingDiv) {

        return;
      }

      if ((spellingDiv as any).jsConfetti) {
        (spellingDiv as any).jsConfetti.clearCanvas();
      }

      if ((spellingDiv as any).confettiHandle) {
        clearInterval((spellingDiv as any).confettiHandle)
      }

      if ((spellingDiv as any).fireworks) {
        (spellingDiv as any).fireworks.stop();
      }

      if ((spellingDiv as any).fireworks) {
        (spellingDiv as any).fireworks.stop();
      }


      if ((spellingDiv as any).balloons) {
        (spellingDiv as any).balloons.removeBalloons();
      }

      if ((spellingDiv as any).confetti) {
        (spellingDiv as any).confetti.clear();
      }


      spellingDiv.innerHTML = '';
      let topMarginDivParentDiv = document.createElement('div');
      topMarginDivParentDiv.style.position = 'absolute';
      topMarginDivParentDiv.style.fontSize = '9vmin';
      spellingDiv?.appendChild(topMarginDivParentDiv);

      var topMarginDiv = document.createElement('div');
      topMarginDiv.innerHTML = '<div class="sliderPlaceholder" data-v-55943314>&nbsp;</div>'
      topMarginDivParentDiv.appendChild(topMarginDiv);
      var placeholderDiv = document.createElement('div');
      placeholderDiv.setAttribute('data-v-55943314', '');
      placeholderDiv.style.cssText = 'border:.5vmin solid black;width:auto;display:inline-block;background:white;';
      placeholderDiv.classList.add('sliderPlaceholder');
      topMarginDivParentDiv.appendChild(placeholderDiv);
      var innerHtml = '';

      var letters = awesum.currentDatabaseItem.letters.split('');

      if (letters.length == 0) {
        var word = awesum.currentDatabaseItem.text;
        for (let i = 0; i < word.length; i++) {
          const letter = word[i];
          const childArray = [letter];
          // generate a random list of 6 similar letters
          const similarLetters = this.generateSimilarLetters(letter);
          for (let j = 0; j < similarLetters.length; j++) {
            childArray.push(similarLetters[j]);
          }
          // shuffle the child array

          this.shuffleArray(childArray);

          letters.push(...childArray);
        }
      }

      for (const arr of letters) {
        innerHtml += '<div class="sliderPlaceholder" data-v-55943314 >&nbsp;</div>';
      }
      placeholderDiv.innerHTML = innerHtml;

      var letterPosition = 0;
      var builtWord = [];
      for (const arr of letters) {
        let sliderOuterDiv = document.createElement("div");
        sliderOuterDiv.style.cssText = 'overflow:hidden;height:42vmin;'
        sliderOuterDiv.classList.add('spellingDivChild');
        spellingDiv.appendChild(sliderOuterDiv);

        let sliderDiv = document.createElement("div");
        sliderDiv.addEventListener('mousedown', this.mouseDown);
        sliderDiv.addEventListener('touchstart', this.mouseDown, { passive: false });
        (sliderDiv as any).elementsToShowWhenFullyScrolled = 2;
        (sliderDiv as any).selectedElementOffset = 1;

        sliderDiv.classList.add('slider');
        sliderDiv.setAttribute('data-v-55943314', '');
        sliderDiv.style.top = '0vmin';

        sliderOuterDiv.appendChild(sliderDiv);

        let sliderLetter = document.createElement("div");
        sliderDiv.appendChild(sliderLetter);
        sliderLetter.innerHTML = "&nbsp;";
        sliderLetter.style.cursor = 'initial';

        builtWord[letterPosition] = arr[0];

        var first = true;
        for (const ltr of arr) {
          sliderLetter = document.createElement("div");
          sliderDiv.appendChild(sliderLetter);
          sliderLetter.innerHTML = ltr.replace(' ', '&nbsp;').toLocaleLowerCase();
          if (first) {
            first = false;
            sliderLetter.classList.add('opaqueLetter');
          }
          else {
            sliderLetter.classList.add('transparentLetter');
          }
        }

        (sliderDiv as any).selectedElement = sliderDiv.children[1];

        ++letterPosition;
      }

      var footer = this.footer;
      var elementToScrollTo = document.getElementsByClassName('currentFooterButton')[0];

      var footerWidth = footer.getBoundingClientRect().width;
      var footerLeft = footer.scrollLeft;

      var firstLeft = footer.children[0].getBoundingClientRect().left;
      var currentLeft = elementToScrollTo.getBoundingClientRect().left;

      document.getElementById('footer')?.scrollTo(currentLeft - firstLeft - footerWidth / 2, 0);
    },
    mouseDown(e: any) {



      this.toggleGrabbing(true);

      e.preventDefault();

      if (e.touches && e.touches.length > 0) {
        e = e.touches[0]
      }

      let el = e.target.parentElement;
      if (el.animation) {
        el.animationWasCanceled = true;
        console.log('canceling previous animation')
      }

      var transparentChildren = el.getElementsByClassName('transparentLetter');
      for (let i = transparentChildren.length - 1; i >= 0; --i) {
        const child = transparentChildren[i];
        child.classList.remove('transparentLetter');
        child.classList.add('opaqueLetter');
      }

      el.initialClickTop = e.clientY;
      el.initialElementTop = parseFloat(el.style.top);

      el.minTop = -(
        el.clientHeight -
        el.elementsToShowWhenFullyScrolled * el.lastElementChild.clientHeight
      );

      let mouseMove = (e: any) => {
        e.preventDefault();
        if (e.touches && e.touches.length > 0) {
          e = e.touches[0]
        }

        var newTop = el.initialElementTop + (e.clientY - el.initialClickTop);
        if (newTop > 0) {
          newTop = newTop / 20;
          if (newTop > 20) {
            newTop = 20;
          }
        }

        if (newTop < el.minTop) {
          newTop = el.minTop + (e.clientY - el.initialClickTop) / 20;
          if (newTop < el.minTop - 20) {
            newTop = el.minTop - 20;
          }
        }

        el.style.top = newTop + "px";
      };

      let mouseUp = async (e: any) => {

        this.toggleGrabbing(false);

        e.preventDefault();
        if (e.touches && e.touches.length > 0) {
          e = e.touches[0]
        }

        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);

        window.removeEventListener("touchmove", mouseMove);
        window.removeEventListener("touchend", mouseUp);

        if (parseFloat(el.style.top) > 0) {
          el.selectedElement = el.firstElementChild;

          let offsetCount = el.selectedElementOffset;
          while (
            offsetCount > 0 &&
            el.selectedElement !=
            (el.selectedElementOffset > 0
              ? el.lastElementChild
              : el.firstElementChild)
          ) {
            el.selectedElement =
              el.selectedElementOffset > 0
                ? el.selectedElement.nextElementSibling
                : el.selectedElement.previousElementSibling;
            --offsetCount;
          }

          el.animation = el.animate(
            [{ transform: "translateY(-" + parseFloat(el.style.top) + "px)" }],
            {
              duration: 100,
              iterations: 1,
            }
          );
          el.animation.onfinish = function () {
            if (!el.animationWasCanceled) {
              el.style.top = "0vmin";
            }
            el.animationWasCanceled = false;
            el.animation = null;
          };
        } else if (parseFloat(el.style.top) < el.minTop) {
          el.selectedElement = el.lastElementChild;

          let offsetCount = el.selectedElementOffset;
          while (
            offsetCount > 0 &&
            el.selectedElement !=
            (el.selectedElementOffset > 0
              ? el.lastElementChild
              : el.firstElementChild)
          ) {
            el.selectedElement =
              el.selectedElementOffset > 0
                ? el.selectedElement.nextElementSibling
                : el.selectedElement.previousElementSibling;
            --offsetCount;
          }

          el.animation = el.animate(
            [
              {
                transform:
                  "translateY(" + (el.minTop - parseFloat(el.style.top)) + "px)",
              },
            ],
            {
              duration: 100,
              iterations: 1,
            }
          );
          el.animation.onfinish = function () {
            if (!el.animationWasCanceled) {
              el.style.top = el.minTop + "px";
            }
            el.animationWasCanceled = false;
            el.animation = null;
          };
        } else {
          var minDistance = 9999999;
          var elAtMinDistance: any = null;
          for (const child of el.children) {
            let distance = Math.abs(
              child.getBoundingClientRect().top -
              el.parentElement.getBoundingClientRect().top
            );
            if (distance < minDistance) {
              minDistance = distance;
              elAtMinDistance = child;
            }
          }
          el.selectedElement = elAtMinDistance;
          let offsetCount = el.selectedElementOffset;
          while (
            offsetCount > 0 &&
            el.selectedElement !=
            (el.selectedElementOffset > 0
              ? el.lastElementChild
              : el.firstElementChild)
          ) {
            el.selectedElement =
              el.selectedElementOffset > 0
                ? el.selectedElement.nextElementSibling
                : el.selectedElement.previousElementSibling;
            --offsetCount;
          }

          var translateAmount = Math.round(
            elAtMinDistance.getBoundingClientRect().top -
              el.parentElement.getBoundingClientRect().top >
              0
              ? -(
                elAtMinDistance.getBoundingClientRect().top -
                el.parentElement.getBoundingClientRect().top
              )
              : elAtMinDistance.getBoundingClientRect().top -
              el.parentElement.getBoundingClientRect().top
          );

          var shouldGoDown =
            elAtMinDistance.getBoundingClientRect().top -
            el.parentElement.getBoundingClientRect().top >
            0;

          el.animation = el.animate(
            [
              {
                transform:
                  "translateY(" +
                  (shouldGoDown ? translateAmount : -translateAmount) +
                  "px)",
              },
            ],
            {
              duration: 100,
              iterations: 1,
            }
          );
          el.animation.onfinish = function () {
            if (!el.animationWasCanceled) {
              el.style.top =
                parseFloat(el.style.top) +
                (shouldGoDown ? translateAmount : -translateAmount) +
                "px";
              if (elAtMinDistance == el.firstElementChild) {
                el.style.top = "0vmin";
              }
              if (elAtMinDistance == el.lastElementChild) {
                el.style.top = el.minTop + "px";
              }
            }
            el.animationWasCanceled = false;
            el.animation = null;
          };
        }

        var sliders = document.getElementsByClassName('slider')

        var letters = el.getElementsByClassName('opaqueLetter');
        for (let index = letters.length - 1; index >= 0; --index) {
          const letter = letters[index];
          letter.classList.remove('opaqueLetter');
          letter.classList.add('transparentLetter');

        }

        this.lettersChanged();
      };

      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);

      window.addEventListener("touchmove", mouseMove, { passive: false });
      window.addEventListener("touchend", mouseUp, { passive: false });
    },
    mouseDownHandler(e: MouseEvent) {

      this.toggleGrabbing(true);

      const ele = this.footer;
      this.pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      window.addEventListener('mousemove', this.mouseMoveHandler);
      window.addEventListener('mouseup', this.mouseUpHandler);
    },
    mouseMoveHandler(e: MouseEvent) {
      this.isDragging = true;
      const ele = this.footer;

      // How far the mouse has been moved
      const dx = e.clientX - this.pos.x;
      const dy = e.clientY - this.pos.y;

      // Scroll the element
      ele.scrollTop = this.pos.top - dy;
      ele.scrollLeft = this.pos.left - dx;
    },
    mouseUpHandler() {

      this.toggleGrabbing(false);

      const ele = this.footer;
      window.removeEventListener('mousemove', this.mouseMoveHandler);
      window.removeEventListener('mouseup', this.mouseUpHandler);
    },
    toggleGrabbing(enabled: boolean) {
      if (enabled) {
        document.body.style.cursor = 'grabbing';
        this.footer.style.cursor = 'grabbing';
        this.spellingDiv.style.cursor = 'grabbing';
        this.imageAndSound.style.cursor = 'grabbing';
        //document.getElementById('homeButton').style.cursor = 'grabbing';
        var grabEl = this.forwardButton;
        if (grabEl) {
          grabEl.style.cursor = 'grabbing';
        }
        grabEl = this.backButton;
        if (grabEl) {
          grabEl.style.cursor = 'grabbing';
        }
      }
      else {
        document.body.style.removeProperty('cursor');
        this.footer.style.removeProperty('cursor');
        this.spellingDiv.style.removeProperty('cursor');
        this.imageAndSound.style.removeProperty('cursor');
        //document.getElementById('homeButton').style.removeProperty('cursor');
        var grabEl = this.forwardButton;
        if (grabEl) {
          grabEl.style.removeProperty('cursor');
        }
        grabEl = this.backButton;
        if (grabEl) {
          grabEl.style.removeProperty('cursor');
        }
      }
    },
    footerClicked2() {
      if (this.isDragging) {
        this.isDragging = false;
        event?.stopPropagation();
        event?.preventDefault();
        return false;
      }
    },
    footerClicked(item: ServerDatabaseItem) {
      awesum.goToItem(item.order);
    },
    applyHint() {
      var children = document.getElementsByClassName('spellingDivChild');
      var idx = 0;
      for (const ltr of children as any as Array<HTMLElement>) {
        var correctChar = awesum.currentDatabaseItem.text[idx++];
        if ((ltr.firstChild as any).selectedElement && (ltr.firstChild as any).selectedElement.innerText !== correctChar) {
          var allChildren = ltr.querySelectorAll('.slider > div');
          for (let index = allChildren.length - 1; index >= 0; --index) {
            const child = allChildren[index] as HTMLElement;
            if (index == 0) {
              continue;
            }

            if (child.innerText == correctChar) {
              (ltr.firstChild as any).selectedElement = child;
              child.classList.remove('transparentLetter');
              child.classList.add('opaqueLetter');
            }
            else {
              child.remove();
            }
          }
          (ltr.firstElementChild as HTMLElement).style.top = '0px';
          this.lettersChanged();
          return;
        }
        else {
          // var shouldReturn = false;
          // var allChildren = ltr.querySelectorAll('.slider > div');
          // for (let index = allChildren.length - 1; index >= 0; --index) {
          //   const child = allChildren[index];
          //   if (index == 0) {
          //     continue;
          //   }
          //   if (child != (ltr.firstChild as any).selectedElement) {
          //     shouldReturn = true;
          //     child.remove();
          //   }
          // }
          // if (shouldReturn) {
          //   ltr.firstChild.style.top = '0px';
          //   this.lettersChanged();
          //   return;
          // }
        }
      }
    },
  }
}
</script>

<template>
  <div class="view">

    <div @click="awesum.playAudioOrSpeech()" id="imageAndSound">
      <img :src="awesum.currentDatabaseItem.image" class="img" v-if="awesum.currentDatabaseItem.image" />
      <FaVolumeHigh v-if="awesum.currentDatabaseItem.sound" />
    </div>


    <div id="spellingDiv"></div>
    <BsCalendar4Range />
    <FaWandMagicSparkles @click="applyHint()" class="hintButton" />

    <FaBackward @click="awesum.goBack" v-if="awesum.canGoBack()" id="backButton" class="backButton" />
    <FaForward @click="awesum.goForward" v-if="awesum.canGoForward()" id="forwardButton" class="forwardButton" />

    <div id="footer" class="footer" style="height: 6vmin; overflow: auto; " v-on:mousedown="mouseDownHandler">
      <div v-for="item in awesum.currentDatabaseItems" @click="footerClicked(item)" @click.capture="footerClicked2()"
        :class="item == awesum.currentDatabaseItem
          ? 'footerButton currentFooterButton'
          : 'footerButton'
          ">
        {{
          item.text.toLocaleLowerCase()
            /*awesum.currentDatabaseItems.indexOf(item)*/
        }}
      </div>
    </div>


  </div>
</template>

<style lang="scss" scoped>
.forwardButton {
  position: absolute;
  right: 2vmin;
  top: 30vmin;
  height: 8vmin;
  padding: 1vmin;
  border: .5vmin solid black;
  cursor: pointer;
}

.backButton {
  position: absolute;
  top: 30vmin;
  left: 2vmin;
  height: 8vmin;
  padding: 1vmin;
  border: .5vmin solid black;
  cursor: pointer;
}


.image {
  font-size: 0vmin;
  margin-top: 5vmin;
  padding: 0vmin;
  max-height: 33vmin;
  background: none;
  border: .5vmin solid black;
}

.sound {
  font-size: 10vmin;
  margin-top: 5vmin;
  padding: 4.2vmin;
  background: none;
  border: .5vmin solid black;
}

#imageAndSound {
  border: .5vmin solid black;
  height: 30vmin;
  width: 30vmin;
  cursor: pointer;
  position: relative;
}

#imageAndSound>svg {
  font-size: 7vmin;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  color: white;
  filter: drop-shadow(0px 0px 2px black)
}

.view {
  flex-direction: column;
  position: relative;
  align-items: center;
  height: 94vmin;
  width: 100%;
  display: none;
}

.footer::-webkit-scrollbar {
  display: none;
}

.footer {
  display: flex;
  flex-direction: row;
  border-right: .5vmin solid black;
  border-top: .5vmin solid black;
  border-left: .5vmin solid black;
  width: fit-content;
  max-width: 100vmin;

  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
  overflow: scroll;
  white-space: nowrap;
  cursor: pointer;
}

.img {
  height: 100%;
  width: 100%;
}

.footerButton {
  font-size: 3vmin;
  border: none;
  padding-left: 2vmin;
  padding-right: 2vmin;
  padding-top: 1.5vmin;
  color: gray;
}

.currentFooterButton {
  color: black;
}

.slider {
  width: 9vmin;
  font-size: 9vmin;
  position: relative;
  display: inline-block;
}

.sliderPlaceholder {
  @extend .slider;
}

#spellingDiv {
  margin-left: 5vmin;
  margin-right: 5vmin;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  text-shadow: 1px 1px 1px #878700;
  cursor: grab;
  margin-top: 4vmin;
}
</style>