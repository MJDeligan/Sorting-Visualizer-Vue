<template>
    <v-container>
        <SortVisualization
         />
    </v-container>
</template>

<script>
import SortVisualization from './SortVisualization'


export default {
    name: 'SortWrapper',
    components: {
        SortVisualization
    },
    data: () => {
        return {
        }
    }
}
</script>