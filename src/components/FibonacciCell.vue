<template>
    <div class="cell" :class="cellClass">
        {{ value > 0 ? value : '' }}
    </div>
</template>

<script>
export default {
    props: {
        cell: {
            type: Object,
            default: () => {
                return {
                    value: 0,
                    row: 0,
                    col: 0
                }
            }
        },

    },
    data() {
        return {
            value: 0,
            cellClass: 'bg-gray',
            animation: null
        }
    },

    watch: {
        //Watch the value
        'cell.value'(newValue, oldValue) {
            this.turnGray()
            clearTimeout(this.animation)
            this.animation = null
            //if the new value is 0 and the property started is true means that was done a Fibonacci so we turn the cell green
            if (newValue === 0 && oldValue > 0 && this.cell.started) {
                this.turnGreen()
                return
            }
            //if the new value is greater than the old value turns the cells yellow
            if (newValue === oldValue + 1) {
                this.turnYellow()
            }
            this.value = newValue



        }
    },
    methods: {
        turnGray() {
            this.cellClass = 'bg-gray'
        },
        turnYellow() {
            this.cellClass = 'bg-yellow '
            this.animation = setTimeout(() => {
                this.turnGray()
                this.$emit('cell-changed', this.cell)
            }, 1000)
        },
        turnGreen() {
            this.cellClass = 'bg-green shake'
            this.animation = setTimeout(() => {
                this.turnGray()
                this.value = 0
            }, 1000)
        },

    },
}
</script>

<style scoped>
.cell {
    text-align: center;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    vertical-align: middle;


}

.bg-gray {
    background-color: #374151;
}

.bg-yellow {
    background-color: #ca8a04;
}

.bg-green {
    background-color: #4d7c0f;
}
</style>