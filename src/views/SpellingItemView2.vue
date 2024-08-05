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
    const spellingDiv = ref(null as any as HTMLElement);
    const footerDiv = ref(null as any as HTMLElement);

    let mouseDown = ref(false)
    let footerMouseDown = ref(false)

    let mousePos = ref(0)
    let footerMousePos = ref(0)
    let button = ref(null as any as HTMLButtonElement);
    let selectedChars = ref(new Array<string>());

    return {
      spellingDiv,
      mouseDown,
      mousePos,
      button,
      selectedChars,
      footerDiv,
      footerMouseDown,
      footerMousePos
    };
  },
  mounted() {
    this.spellingDiv = this.$refs.spellingDiv as HTMLElement;
    this.footerDiv = this.$refs.footerDiv as HTMLElement;

    var items = awesum.currentDatabaseItems;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      var footerButton = document.createElement('BUTTON');
      footerButton.innerHTML = item.order.toString();
      this.footerDiv.appendChild(footerButton);
    }

    for (let i = 0; i < 100; i++) {
      var footerButton = document.createElement('BUTTON');
      footerButton.innerHTML = i.toString();
      this.footerDiv.appendChild(footerButton);
    }

    this.footerDiv.onmousedown = (e: MouseEvent) => {
      this.footerMouseDown = true;
      this.footerMousePos = e.clientX;
    }

    var letters = new Array<string>();
    var lettersTemp = awesum.currentDatabaseItem.letters.split('\n');

    for (const iterator of lettersTemp) {
      for (const letter of iterator) {
        if (letter != ',')
          letters.push(letter);
      }
    }

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

    var word = awesum.currentDatabaseItem.text;

    this.spellingDiv.style.width = (word.length * 7.5 + 1) + 'vmin';

    for (let i = 0; i < word.length; i++) {
      letters.push(word[i]);

      const letter = word[i];
      var parentDiv = document.createElement('button');
      parentDiv.classList.add('btn');
      parentDiv.classList.add('btn-link');
      parentDiv.type = 'button';

      parentDiv.style.position = 'absolute';
      parentDiv.style.left = (i * 7.5) + 'vmin';
      parentDiv.style.top = '0vmin';

      parentDiv.onkeydown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          if (parseFloat((e.target as HTMLButtonElement)!.style.top) > -parseFloat((e.target as HTMLButtonElement)!.style.height) + 7.6 * 2
          ) {
            (e.target as HTMLButtonElement)!.style.top = (parseFloat((e.target as HTMLButtonElement)!.style.top) - 7.6) + 'vmin';
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else if (e.key === 'ArrowUp') {
          if (parseFloat((e.target as HTMLButtonElement)!.style.top) <= -7.6) {

            (e.target as HTMLButtonElement)!.style.top = (parseFloat((e.target as HTMLButtonElement)!.style.top) + 7.6) + 'vmin';
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else if (e.key === 'ArrowRight') {
          var next = e.target.nextElementSibling;
          if (next) {
            next.focus();
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else if (e.key === 'ArrowLeft') {
          var prev = e.target.previousElementSibling;
          if (prev) {
            prev.focus();
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else if (e.key === 'Enter') {
          var next = e.target.nextElementSibling;
          if (next) {
            next.focus();
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else if (e.key === 'Backspace') {
          var prev = e.target.previousElementSibling;
          if (prev) {
            prev.focus();
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else if (e.key === 'Delete') {
          var next = e.target.nextElementSibling;
          if (next) {
            next.focus();
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else if (e.key === ' ') {
          var next = e.target.nextElementSibling;
          if (next) {
            next.focus();
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else {
          var chars = e.target.childNodes;
          var letterTop = 0;
          for (let i = 0; i < chars.length; i++) {
            if (chars[i].innerHTML == e.key) {

              (e.target as HTMLButtonElement)!.style.top = -(letterTop - 7.6) + 'vmin';
              break;
            }

            letterTop += 7.6;
          }

        }
        this.sliderChanged(e.target);
      }

      parentDiv.onmousedown = (e: MouseEvent) => {
        this.mouseDown = true;
        this.mousePos = e.clientY;
        this.button = e.target as HTMLButtonElement;
        while (this.button.tagName != 'BUTTON') {
          this.button = this.button.parentElement as HTMLButtonElement;
        }
      }

      window.onmouseup = (e: MouseEvent) => {
        this.mouseDown = false;
      }

      window.onmousemove = (e: MouseEvent) => {
        if (this.footerMouseDown && Math.abs(e.clientX - this.footerMousePos) > 200) {

          var diff = 100 * (e.clientX - this.footerMousePos);
          if (diff > 0 && parseFloat((this.footerDiv as HTMLButtonElement)!.style.left) <= -7.6
          ) {

            this.footerDiv.style.top = parseFloat(this.footerDiv.style.top) + 7.6 + 'vmin';
          }
          if (diff < 0 && parseFloat((this.footerDiv as HTMLButtonElement)!.style.left) > -parseFloat((this.footerDiv as HTMLButtonElement)!.style.height) + 7.6 * 2) {

            this.footerDiv.style.top = parseFloat(this.footerDiv.style.top) - 7.6 + 'vmin';
          }

          this.footerMousePos = e.clientX;

        }

        if (this.mouseDown && Math.abs(e.clientY - this.mousePos) > 200) {
          var diff = 100 * (e.clientY - this.mousePos);
          if (diff > 0 && parseFloat((this.button as HTMLButtonElement)!.style.top) <= -7.6
          ) {

            this.button.style.top = parseFloat(this.button.style.top) + 7.6 + 'vmin';
          }
          if (diff < 0 && parseFloat((this.button as HTMLButtonElement)!.style.top) > -parseFloat((this.button as HTMLButtonElement)!.style.height) + 7.6 * 2) {

            this.button.style.top = parseFloat(this.button.style.top) - 7.6 + 'vmin';
          }

          this.sliderChanged(this.button);
          this.mousePos = e.clientY;
        }
      }

      //if mouse wheel down, move the button down
      parentDiv.onwheel = (e: WheelEvent) => {
        var el = e.target as HTMLButtonElement;
        if (el.tagName != 'BUTTON') {
          el = el.parentElement as HTMLButtonElement;
        }
        if (e.deltaY > 0) {
          if (parseFloat((el as HTMLButtonElement)!.style.top) > -parseFloat((el as HTMLButtonElement)!.style.height) + 7.6 * 2
          ) {

            (el as HTMLButtonElement)!.style.top = (parseFloat((el as HTMLButtonElement)!.style.top) - 7.6) + 'vmin';
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else {
          if (parseFloat((el as HTMLButtonElement)!.style.top) <= -7.6) {

            (el as HTMLButtonElement)!.style.top = (parseFloat((el as HTMLButtonElement)!.style.top) + 7.6) + 'vmin';
          }
          e.stopPropagation()
          e.preventDefault();
        }

        this.sliderChanged(el);
      }

      this.spellingDiv.appendChild(parentDiv);

      if (i == 0) {
        parentDiv.focus();
      }

      parentDiv.style.height = (letters.length + 1) * 7.6 + 'vmin';
      parentDiv.style.paddingLeft = '.5vmin';
      parentDiv.style.paddingRight = '.5vmin';
      parentDiv.style.top = '-7.6vmin';


      var letterDiv = document.createElement('div');
      parentDiv.appendChild(letterDiv);

      letterDiv.style.width = '7vmin';
      letterDiv.style.height = '7vmin';
      letterDiv.style.borderRadius = '.5vmin';
      letterDiv.style.marginBottom = '.6vmin';
      letterDiv.innerHTML = '&nbsp;';
      letterDiv.style.visibility = 'hidden';

      for (const arr of letters) {

        var letterDiv = document.createElement('div');
        parentDiv.appendChild(letterDiv);

        letterDiv.style.width = '7vmin';
        letterDiv.style.height = '7vmin';
        letterDiv.style.fontSize = '4vmin';
        letterDiv.style.textAlign = 'center';
        letterDiv.style.color = 'black';
        letterDiv.style.backgroundColor = 'white';
        letterDiv.style.border = '.1vmin solid black';
        letterDiv.style.borderRadius = '.5vmin';
        letterDiv.style.marginBottom = '.6vmin';
        letterDiv.innerHTML = arr;



      }

      this.sliderChanged(parentDiv);

    }
  },

  methods: {
    sliderChanged(el: HTMLElement) {
      var charIndex = Array.from(el.parentElement!.children).indexOf(el);
      var chars = el.childNodes;
      var letterTop = 0;
      for (let i = 0; i < chars.length; i++) {
        if (Math.abs(-parseFloat(el.style.top) - letterTop + 7.6) < 1) {
          chars[i].style.backgroundColor = 'white';
          this.selectedChars[charIndex] = chars[i].innerHtml;
        }
        else {
          chars[i].style.backgroundColor = 'red';
        }

        letterTop += 7.6;
      }
    },

    shuffleArray(array: Array<any>) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
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
  }
}
</script>

<template>
  <div class="view"
    style="display: flex;justify-items: center;height: 100%;flex-direction: column;align-items: center;position:relative;">

    <div ref="imageAndSound" style="position:relative;height:30vmin;width:100%;border-bottom:.25vmin solid black;">
      <img :src="awesum.currentDatabaseItem.image" v-if="awesum.currentDatabaseItem.image"
        style="position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;height:100%" />
      <button
        style="position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;width:10vmin;height:10vmin;border:none;background: none;">
        <FaVolumeHigh v-if="awesum.currentDatabaseItem.sound" />
      </button>
    </div>

    <div id="spellingDiv" ref="spellingDiv" style="overflow: hidden; height: 49vmin; position: relative;">
      <div style="height:8.7vmin;width:100%;border:.1vmin solid black;margin-top:9.8vmin;">
      </div>
    </div>

    <button @click="awesum.goBack" id="backButton" class="backButton" style="position:absolute;left:1vmin;top:20vmin;">
      <FaBackward />
    </button>
    <button id="forwardButton" class="forwardButton" style="position:absolute;right:1vmin;top:20vmin;"
      @click="awesum.goForward" v-if="awesum.canGoForward()">
      <FaForward />
    </button>

    <div style="margin-top:10vmin;overflow:hidden;white-space: nowrap;width:90vmin;">
      <div ref="footerDiv" style="position:relative">
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped></style>