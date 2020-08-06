<template>
    <v-row class="px-2">
        <v-col
            class="d-flex pr-4 py-0"
            :cols="12"
        >   
            <v-spacer></v-spacer>
            <v-btn
                icon
                x-large
                @click="$emit('drawer')"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-col>
        <v-col
            :cols="12"
            class="pt-0"
        >
            <v-select
                :disabled="$store.state.sorting"
                label="Sorting Algorithm"
                :items="choices"
                v-model="selected"
            ></v-select>
            <v-divider></v-divider>
        </v-col>
        <v-col
            :cols="12"
            class="pt-0"
        >
            <div>Speed: {{ speed }}</div>
            <v-slider
                class="ml-0"
                hide-details
                v-model="speed"
                :min="5"
                :max="500"
            >
            </v-slider>
            <v-divider></v-divider>
        </v-col>
        <v-col
            :cols="12"
            class="pt-0"
        >
            <div>Number of Values: {{ numberOfValues }}</div>
            <v-slider
                :disabled="$store.state.sorting"
                class="ml-0"
                hide-details
                v-model="numberOfValues"
                :min="5"
                :max="200"
            ></v-slider>
            <v-divider></v-divider>
        </v-col>
        <v-col
            :cols="12"
        >
            <v-checkbox
                v-model="instant"
                label="Instant Sort (No Animations)"
            ></v-checkbox>
        </v-col>
    </v-row>
</template>
<style>
.v-slider--horizontal {
    margin-left: 0;
}
</style>
<script>
export default {
    name: 'SortControls',
    computed: {
        choices() {
            return this.$store.state.choices
        },
        selected: {
            get() {
                return this.$store.state.selected
            },
            set(value) {
                this.$store.commit('SET_SELECTED', value)
            }
        },
        speed: {
            get() {
                return this.$store.state.speed
            },
            set(value) {
                return this.$store.commit('SET_SPEED', value)
            }
        },
        numberOfValues: {
            get() {
                return this.$store.state.numberOfValues
            },
            set(value) {
                this.$store.commit('SET_NUMBER_OF_VALUES', value)
            }
        },
        instant: {
            get() {
                return this.$store.state.instant
            },
            set(value) {
                this.$store.commit('SET_INSTANT', value)
            }
        }
    }
}
</script>