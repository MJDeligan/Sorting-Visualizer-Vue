<template>
    <div>
        <v-dialog
            v-model="d1"
            max-width="512px"
        >
            <v-card
                tile
            >
                <v-card-title>Welcome</v-card-title>
                <v-card-text class="text-body-1">This is a Sorting Visualizer built with Vue</v-card-text>
                <v-card-text class="text-body-1">
                    You can skip this introduction by pressing the <span class="red--text">Skip</span> Button
                </v-card-text>
                <v-card-text class="text-body-1">
                    For the code behind this visit 
                    <span>
                        <a href="https://github.com/MJDeligan/Sorting-Visualizer-Vue" class="text-decoration-none success--text">
                        this Github Repository 
                            <v-icon color="black">mdi-github</v-icon>
                        </a>
                    </span>
                </v-card-text>
                <div class="d-flex mt-auto pa-6">
                    <v-btn
                        color="red"
                        @click="d1 = false"
                    >Skip</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="success"
                        @click="d1Tod2"
                    >Next</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="d2"
            max-width="512px"
        >
            <v-card
                tile
            >
                <v-card-title class="pb-0">Basics</v-card-title>
                <ul class="px-6 py-2 secondary--text">
                    <li><v-icon>mdi-sort-variant</v-icon> Sort to start sorting</li>
                    <li><v-icon>mdi-cancel</v-icon> Cancel to cancel sorting</li>
                    <li> <v-icon>mdi-refresh</v-icon> Refresh to generate new Values</li>
                    <li><v-icon>mdi-shuffle-variant</v-icon> Shuffle to shuffle the current values</li>
                    <li><v-icon>mdi-tune</v-icon> Controls to open the controls menu</li>
                </ul>
                <div class="d-flex pa-6 mt-auto">
                    <v-btn
                        @click="d2 = false"
                        color="red"
                    >Skip</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="d2Tod3"
                        color="success"
                    >Next</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="d3"
            max-width="512px"
        >
            <v-card
                tile
            >
                <v-card-title>Controls</v-card-title>
                <v-card-text
                    class="font-weight-bold text-decoration-underline pb-0"
                >Algorithm:</v-card-text>
                <v-card-text>Choose the Algorithm you want to see visualized</v-card-text>
                <v-card-text
                    class="font-weight-bold text-decoration-underline pb-0"
                >Speed:</v-card-text>
                <v-card-text>Choose the speed at which the visualization runs. (Higher means faster)</v-card-text>
                <v-card-text 
                    class="font-weight-bold text-decoration-underline pb-0"
                >Number of Values</v-card-text>
                <v-card-text>Choose the number of values to be sorted</v-card-text>
                <v-card-text
                    class="font-weight-bold text-decoration-underline pb-0"
                >Instant Animations</v-card-text>
                <v-card-text>Choose whether the sorting happens with or without animations</v-card-text>
                <div class="d-flex pa-6 mt-auto">
                    <v-btn
                        @click="d3 = false"
                        color="red"
                    >Skip
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="d3Tod4"
                        color="success"
                    >Next</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="d4"
            max-width="512px"
        >
            <v-card>
                <v-card-title>Enjoy</v-card-title>
                <v-card-text class="text-body-1">For Contact</v-card-text>
                <v-card-text class="text-decoration-underline font-weight-bold pb-0">Via Email:</v-card-text>
                <v-card-text><a href="mailto:marco.razor@hotmail.com">marco.razor@hotmail.com</a></v-card-text>
                <div class="d-flex pa-6 mt-auto">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="success"
                        @click="d4 = false"
                    >Close</v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<style scoped>
ul {
    list-style: none;
}
ul > li {
    padding: 8px 0;
}
</style>

<script>
export default {
    name: 'Instructions',
    data () {
        return {
            d1: true,
            d2: false,
            d3: false,
            d4: false
        }
    },
    methods: {
        d1Tod2 () {
            this.d1 = false
            this.d2 = true
        },
        d2Tod3 () {
            this.d2 = false
            this.d3 = true
        },
        d3Tod4 () {
            this.d3 = false
            this.d4 = true
        }
    }
}
</script>
