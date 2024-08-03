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
    let currentLetter = ref('');
    let mouseDown = ref(false)
    let mousePos = ref(0)
    let button = ref(null as any as HTMLButtonElement);

    return {
      spellingDiv,
      currentLetter,
      mouseDown,
      mousePos,
      button
    };
  },
  mounted() {
    this.spellingDiv = this.$refs.spellingDiv as HTMLElement;

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
    for (let i = 0; i < word.length; i++) {
      letters.push(word[i]);

      const letter = word[i];
      var parentDiv = document.createElement('button');
      parentDiv.classList.add('btn');
      parentDiv.classList.add('btn-link');
      parentDiv.type = 'button';

      parentDiv.style.position = 'absolute';
      parentDiv.style.left = (i * 12) + 'vmin';
      parentDiv.style.top = '0vmin';

      parentDiv.onfocus = (e: FocusEvent) => {
        this.currentLetter = document.activeElement!.innerHTML;
      }
      parentDiv.onkeydown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          if (parseFloat((e.target as HTMLButtonElement)!.style.top) >= -parseFloat((e.target as HTMLButtonElement)!.style.height) + 8.6 * 3
          ) {
            (e.target as HTMLButtonElement)!.style.top = (parseFloat((e.target as HTMLButtonElement)!.style.top) - 8.6) + 'vmin';
          }
          e.stopPropagation()
          e.preventDefault();
        }
        if (e.key === 'ArrowUp') {
          if (parseFloat((e.target as HTMLButtonElement)!.style.top) <= 0) {
            (e.target as HTMLButtonElement)!.style.top = (parseFloat((e.target as HTMLButtonElement)!.style.top) + 8.6) + 'vmin';
          }
          e.stopPropagation()
          e.preventDefault();
        }
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
        if (this.mouseDown && Math.abs(e.clientY - this.mousePos) > 10) {
          var diff = 100 * (e.clientY - this.mousePos) / window.innerHeight;
          document.title = diff.toString();
          this.mousePos = e.clientY;
          if (diff > 0 && parseFloat((this.button as HTMLButtonElement)!.style.top) <= 0
          ) {
            this.button.style.top = parseFloat(this.button.style.top) +  8.6 + 'vmin';
          }
          if (diff < 0 && parseFloat((this.button as HTMLButtonElement)!.style.top) >= -parseFloat((this.button as HTMLButtonElement)!.style.height) + 8.6 * 3) {
            this.button.style.top = parseFloat(this.button.style.top) -  8.6 + 'vmin';
          }
        }
      }

      //if mouse wheel down, move the button down
      parentDiv.onwheel = (e: WheelEvent) => {
        var el = e.target as HTMLButtonElement;
        if (el.tagName != 'BUTTON') {
          el = el.parentElement as HTMLButtonElement;
        }
        if (e.deltaY > 0) {
          if (parseFloat((el as HTMLButtonElement)!.style.top) >= -parseFloat((el as HTMLButtonElement)!.style.height) + 8.6 * 3
          ) {
            (el as HTMLButtonElement)!.style.top = (parseFloat((el as HTMLButtonElement)!.style.top) - 8.6) + 'vmin';
          }
          e.stopPropagation()
          e.preventDefault();
        }
        else {
          if (parseFloat((el as HTMLButtonElement)!.style.top) <= 0) {
            (el as HTMLButtonElement)!.style.top = (parseFloat((el as HTMLButtonElement)!.style.top) + 8.6) + 'vmin';
          }
          e.stopPropagation()
          e.preventDefault();
        }
      }

      this.spellingDiv.appendChild(parentDiv);

      parentDiv.style.height = letters.length * 8.6 + 'vmin';

      for (const arr of letters) {

        var letterDiv = document.createElement('div');
        parentDiv.appendChild(letterDiv);

        letterDiv.style.width = '8vmin';
        letterDiv.style.height = '8vmin';
        letterDiv.style.fontSize = '5vmin';
        letterDiv.style.textAlign = 'center';
        letterDiv.style.color = 'black';
        letterDiv.style.backgroundColor = 'white';
        letterDiv.style.border = '.1vmin solid black';
        letterDiv.style.borderRadius = '.5vmin';
        letterDiv.style.marginBottom = '.6vmin';
        letterDiv.innerHTML = arr;



      }
    }
  },

  methods: {
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
  <div class="view" style="display: flex;justify-items: center;height: 100%;flex-direction: column;align-items: center;">

    <div id="spellingDiv" ref="spellingDiv"
      style="top:40vmin;overflow: hidden; height: 30vmin; position: relative;width:100%;">
      <div style="height:8.7vmin;width:100%;border:.1vmin solid black;margin-top:9.8vmin;">
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped></style>