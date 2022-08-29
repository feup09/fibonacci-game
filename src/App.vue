<template>
  <div class="screen">
    <div class="board">
      <div class="game-name">EnergyWorx Fibonacci</div>
      <div class="game-button">
        <button @click="resetScore(); restartGame()" v-if="!restart">Restart</button>
      </div>
      <div class="game-score" :class="gameScoreClass">Score: {{ score }}</div>
      <div class="game-explanation">Complete a sequence of 5 Fibonacci numbers in a row to earn points
      </div>
    </div>
    <FibonacciGrid></FibonacciGrid>
  </div>

</template>

<script>
import FibonacciGrid from './components/FibonacciGrid.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    FibonacciGrid
  },
  data() {
    return {
      buttonText: 'Start Game',
      gameScoreClass: ''
    }
  },
  computed: {
    ...mapGetters('game', ['score', 'restart'])
  },
  watch: {
    score(newValue, oldValue) {
      if (newValue > oldValue) {
        this.gameScoreClass = 'shake text-green'
        setTimeout(() => {
          this.gameScoreClass = ''
        }, 2000)
      }
    }
  },
  methods: {
    ...mapMutations('game', ['resetScore', 'restartGame'])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');

#app {
  background-color: black;
  font-family: 'Black Ops One', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.5rem;
  color: white;
  cursor: pointer;
  height: 100vh;
  overflow-y: auto;
  padding: 1rem;
}



.screen {
  display: block;
}



.board {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.board * {
  width: 50%;
}

.game-name {
  font-size: 1rem;
  text-align: center;
}

.game-score {
  font-size: 2rem;
  text-align: center;
}

.game-button button {
  background-color: #4d7c0f;
  border-radius: 9999px;
  border: 0;
  height: 2rem;
  width: 10rem;
  color: white;
  font-weight: 600;
}

.game-explanation {
  font-size: 0.5rem;
  text-align: center;
}


.text-green {
  color: #4d7c0f;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

@media screen and (min-width: 1024px) {
  .screen {
    display: flex;
  }

  .game-name {
    font-size: 2rem;
  }

  .game-score {
    font-size: 3rem;
  }

  .game-explanation {
    font-size: 1rem;
  }

  .board {
    flex-wrap: nowrap;
    flex-direction: column;

  }

  .board * {
    width: 100%;
  }
}
</style>
