<!-- StatisticWidget component
     2024 © Atlaspad Launchpad
     Yigid BALABAN <fyb@fybx.dev
-->
<script>
    // expects a dictionary of objects in the form of
    // { 
    //    "statTitle": string,
    //    "statValue": string
    // }
    export let stats;
</script>

<div>
    <hr />
    {#each stats as stat}
        <div>
            <h1>{stat.statValue}</h1>
            <h2>{stat.statTitle}</h2>
        </div>
    {/each}
    <hr />
</div>

<style lang="scss">
    div {
        div {
            h1, h2 {
                font: 400 1.5rem 'Ubuntu', sans-serif;
            }

            h1 {
                font-weight: 700;
            }
        }
    }
</style>