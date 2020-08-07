<template>
    <v-card
        class="d-flex align-center sortContainer justify-center"
        flat
        tile
        height="400px"
    >
        <div 
            v-for="(value, i) in values"
            :key="i"
            :class="[
                value.min ? 'warning' :
                value.pivot ? 'deep-purple' :
                value.active ? 'red' :
                value.sorted ? 'success' : 'primary',
                'bar'
            ]"
            :style="`height: ${value.value}%`"
        ></div>
    </v-card>
</template>
<style scoped>
.bar {
    width: 5px;
}
</style>
<script>
import { mapState } from 'vuex'
import { bus } from '../main'

export default {
    data: () => {
        return {
            values: []
        }
    },
    computed: {
        ...mapState([
            'numberOfValues',
            'speed',
            'instant',
            'selected',
            'sorting',
            'shuffle',
            'refresh',
            'cancel'
        ])
    },
    watch: {
        numberOfValues: {
            handler: 'initializeNewValues',
            immediate: true
        }
    },
    methods: {
        initializeNewValues () {
            let newValues = []
            let randint;
            for (let i = 0;i < this.numberOfValues; i++) {
                randint = ((Math.random()*100)+5)%100
                randint-= randint%0.1
                newValues.push(randint)
            }
            this.values=[]
            for (let i=0;i<newValues.length;i++) {
                this.values.push({id:i,value:newValues[i], active:false, sorted:false, min:false, pivot:false})
            }
        },
        reset () {
            this.values.forEach(x => {
                x.sorted = x.pivot = x.active = false
            })
        },
        switchValues (index1, index2) {
            [this.values[index1].value, this.values[index2].value] = [this.values[index2].value, this.values[index1].value];
        },
        //sets 2 elements at index i1 and i2 in the array to active and sets a timeout based on this.speed
        async setActiveAndTimeout (i1, i2) {
            this.values[i1].active=true
            this.values[i2].active=true
            await this.sleep(Math.floor(2000/this.speed))
        },
        async setInctiveAndTimeout (i1, i2) {
            this.values[i1].active=false
            this.values[i2].active=false
            await this.sleep(Math.floor(2000/this.speed))
        },
        async sortEndAnimation() {
            let delay = 0
            for (let i = 0, len = this.values.length; i < len; i++) {

                if (this.cancel) return 

                setTimeout(() => {
                    this.values[i].sorted = false
                    this.values[i].active = true
                },delay)
                setTimeout(() => {
                    this.values[i].active = false
                },delay+300)
                delay+=10
            }
        },
        //Durstenfeld shuffle
        shuffleValues () {
            this.reset()
            this.$nextTick(function(){
                for (let i = this.values.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1))
                    this.switchValues(i, j)
                }
            })
        },
        isSorted() {
            for (let i = 0, len = this.values.length; i < len - 1; i++) {
                if (this.values[i].value > this.values[i+1].value) return false
            }
            return true
        },
        async sort() {
            this.disable()
            if (this.instant) {
                this.instantSort()
                this.enable()
                return
            }
            let algorithms = {
                'Bubble Sort': this.bubbleSort,
                'Insertion Sort': this.insertionSort,
                'Selection Sort': this.selectionSort,
                'Cocktail Shaker Sort': this.cocktailSort,
                'Bogo Sort': this.bogoSort,
                'Merge Sort': this.mergeSort,
                'Quick Sort': this.quickSort,
            }
            await algorithms[this.selected]()
            await this.sortEndAnimation()
            this.$store.commit('SET_CANCEL', false)
            this.reset()
            this.enable()
        },
        disable() {
            this.$store.commit('SET_SORTING', true)
        },
        enable() {
            this.$store.commit('SET_SORTING', false)
        },
        instantSort() {
            let self = this
            function quicksort(arr, low, hi) {
                if (low < hi) {
                    const p = partition(arr, low, hi)
                    quicksort(arr, low, p-1)
                    quicksort(arr, p+1, hi)
                }
            }
            function partition(arr, low, hi) {
                let pivot = arr[hi].value
                let i = low
                for (let j = low; j < hi; j++) {
                    if (arr[j].value < pivot) {
                        self.switchValues(i, j)
                        i++
                    }
                }
                self.switchValues(i, hi);
                return i
            }
            quicksort(this.values, 0, this.values.length - 1)
        },
        async bubbleSort() {
            for (let i = this.values.length - 1; i > 0; i--) {
                for (let j = 0; j < i; j++) {

                    if (this.cancel) return

                    await this.setActiveAndTimeout(j, j+1)
                    if (this.values[j].value > this.values[j+1].value) {
                        this.switchValues(j, j+1)
                        await this.sleep(Math.floor(2000/this.speed))
                    }
                    await this.setInctiveAndTimeout(j, j+1)
                }
                this.values[i].sorted= true
            }
        },
        async insertionSort () {
            let i = 1
            let j
            while (i < this.values.length) {
                j = i
                while (j > 0 && this.values[j-1].value > this.values[j].value) {

                    if (this.cancel) return

                    await this.setActiveAndTimeout(j, j-1)
                    this.switchValues(j - 1, j)
                    await this.sleep(Math.floor(2000/this.speed))
                    await this.setInctiveAndTimeout(j, j-1)
                    j--
                }
                i++
            }
        },
        async cocktailSort (){
            let counter = 0
            let swapped
            do {
                swapped = false
                for (let i = 0, len = this.values.length; i < len - 1; i++) {

                    if (this.cancel) return

                    await this.setActiveAndTimeout(i, i+1)
                    if (this.values[i].value > this.values[i + 1].value){
                        this.switchValues(i, i+1)
                        await this.sleep(Math.floor(2000/this.speed))
                        swapped = true
                    }
                    await this.setInctiveAndTimeout(i, i+1)
                    if (i+1 == this.values.length - counter - 1) this.values[i+1].sorted = true
                }
                if (!swapped) break

                for (let i = this.values.length - 2; i >= 0; i--) {

                    if (this.cancel) return

                    await this.setActiveAndTimeout(i, i+1)
                    if (this.values[i].value > this.values[i+1].value) {
                        this.switchValues(i, i + 1)
                        await this.sleep(Math.floor(2000/this.sleep))
                        swapped = true
                    }
                    await this.setInctiveAndTimeout(i, i+1)
                    if ( i == counter ) this.values[i].sorted = true
                }
                counter++
            } while (swapped)
        },
        async selectionSort () {
            for (let i= 0; i < this.values.length; i++) {
                let minJ = i
                this.values[i].min = true
                for (let j= i+1; j < this.values.length; j++) {

                    if (this.cancel) return

                    this.values[j].active = true
                    await this.sleep(Math.floor(2000/this.speed))
                    if (this.values[j].value < this.values[minJ].value) {
                        this.values[minJ].min =false
                        this.values[j].min = true;
                        minJ = j
                        await this.sleep(Math.floor(1000/this.speed))
                    }
                    this.values[j].active=false
                    await this.sleep(Math.floor(2000/this.speed))
                }
                if (minJ != i) {
                    this.switchValues(minJ, i)
                    await this.sleep(Math.floor(1000/this.speed))
                }
                this.values[minJ].min = false
                this.values[i].sorted = true
            }
        },
        async bogoSort () {
            while (!this.isSorted()) {
                if (this.cancel) return
                this.shuffleValues()
                await this.sleep(Math.floor(5000/this.speed))
            }
        },
        async mergeSort () {
            var self = this
            async function merge(arr, start, mid, end) {
                let start2 = mid + 1
                if (arr[mid].value <= arr[start2].value) {
                    return
                }
                while (start <= mid && start2 <= end) {

                    if (self.cancel) return

                    if (arr[start].value <= arr[start2].value) {
                        start++
                    } else {
                        let val = arr[start2].value
                        let index= start2
                        while (index != start) {
                            self.switchValues(index, index-1)
                            await self.sleep(Math.floor(1000/self.speed))
                            index--
                        }
                        arr[start].value = val
                        start++
                        mid++
                        start2++
                    }
                }
            }
            async function mergesortReal(arr, l, r) {
                if (l < r) {
                    let m = l + Math.floor((r - l) / 2)

                    if (self.cancel) return

                    await mergesortReal(arr, l, m)
                    await self.sleep(Math.floor(5000/self.speed))
                    await mergesortReal(arr, m + 1, r)
                    await self.sleep(Math.floor(5000/self.speed))
                    await merge(arr, l, m, r)
                    await self.sleep(Math.floor(5000/self.speed))
                }
            }
            await mergesortReal(this.values, 0, this.values.length - 1)

            if (this.cancel) return

        },
        async quickSort () {
            var self = this
            async function quicksortReal(arr, low, hi) {
                if (low < hi) {
                    const p = await partition(arr, low, hi)
                    await quicksortReal(arr, low, p-1)
                    await quicksortReal(arr, p+1, hi)
                }
            }
            async function partition(arr, low, hi) {
                let pivot = arr[hi].value
                self.values[hi].pivot=true
                let i = low
                for (let j = low; j < hi; j++) {

                    if (self.cancel) return

                    self.values[j].active=true
                    await self.sleep(Math.floor(2000/self.speed))
                    if (arr[j].value < pivot) {
                        self.switchValues(i, j)
                        await self.sleep(Math.floor(2000/self.sleep))
                        i++
                    }
                    self.values[j].active=false
                    await self.sleep(Math.floor(2000/self.speed))
                }
                self.values[hi].pivot=false
                self.switchValues(i, hi)
                await self.sleep(Math.floor(2000/self.speed))
                return i;
            }
            await quicksortReal(this.values, 0, this.values.length - 1)
        },
        sleep (ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
    },
    created () {
        bus.$on('shuffle', () => {
            this.shuffleValues()
        }),
        bus.$on('refresh', () => {
            this.initializeNewValues()
        }),
        bus.$on('sort', () => {
            this.sort()
        })
    }
}
</script>