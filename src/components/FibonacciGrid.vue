<template>
    <div>
        <div class="row" v-for="(row, rowIndex) in matrix" :key="rowIndex">
            <FibonacciCell :cell="cell" v-for="(cell, cellIndex) in row" :key="cellIndex"
                @click="handleClick(rowIndex, cellIndex)" @cell-changed="cellHadChanged($event)">
            </FibonacciCell>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import FibonacciCell from './FibonacciCell.vue'

export default {
    components: { FibonacciCell },
    data() {
        return {
            size: 50,
            matrix: []
        }
    },
    created() {
        this.initMatrix();
    },
    watch: {
        restart(value) {
            if (value) {
                this.initMatrix()
            }
        }
    },
    computed: {
        ...mapGetters('game', ['restart'])
    },

    methods: {
        ...mapMutations('game', ['incrementScore', 'resetRestart']),
        initMatrix() {
            this.matrix = []
            for (let i = 0; i < this.size; i++) {
                this.matrix.push([])
                for (let j = 0; j < this.size; j++) {
                    this.matrix[i].push({
                        value: 0,
                        started: false,
                        row: i,
                        col: j,
                    })
                }
            }
        },

        handleClick(row, col) {
            if (this.restart) {
                this.resetRestart()
            }
            this.incrementCells(row, col)
        },
        //Increments the cells in the same row and column than the clicked cell
        incrementCells(row, col) {
            for (let i = 0; i < this.size; i++) {
                this.incrementCell(row, i)

            }

            for (let i = 0; i < this.size; i++) {
                if (i !== row) {
                    this.incrementCell(i, col)

                }

            }
        },
        incrementCell(row, col) {
            this.matrix[row][col].value++
            this.matrix[row][col].started = true
        },
        //When a cell changes the component FibonacciCell fires a event that calls this method
        cellHadChanged(cell) {

            this.sliceSequences(cell)
        },
        //Get all the cell's sequences from when the cell is the last number to when the cell is the first number of the sequence
        sliceSequences(cell) {

            for (let i = cell.col - 4; i <= cell.col; i++) {
                if (i < 0 || i + 5 >= this.size) {
                    continue;
                }
                let sequence = this.matrix[cell.row].slice(i, i + 5)
                //If is a sequence increments the score and turns the value of the cells to 0
                if (this.isFibonacciSequence(sequence)) {
                    this.incrementScore()
                    sequence.forEach(element => {
                        this.matrix[element.row][element.col].value = 0
                    });
                }


            }
        },
        isFibonacciSequence(sequence) {
            /* 
            Is not a sequence if:
            The first and second value of the sequence are equal and the value of each are different than 1
            The first value is 0
            Isn't sorted
            */
            if ((sequence[0].value === sequence[1].value && sequence[0].value !== 1) || sequence[0].value === 0 || !this.isSorted(sequence)) {
                return false
            }
            /* 
            Is a sequence if:
            A number is the sum of the 2 previous numbers
            */
            return sequence[4].value === sequence[3].value + sequence[2].value && sequence[3].value === sequence[2].value + sequence[1].value && sequence[2].value === sequence[1].value + sequence[0].value
        },
        isSorted(sequence) {
            //Check if it's sorted
            return sequence.every((cell, i) => i === sequence.length - 1 || cell.value <= sequence[i + 1].value)
        }
    },
}
</script>

<style  scoped>
.row {
    display: flex;
    gap: 0.1rem;
    margin-bottom: 0.1rem;
}
</style>