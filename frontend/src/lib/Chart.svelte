<script>
    import { Line } from "svelte-chartjs";

    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    } from "chart.js";

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale
    );

    export let labels = [];
    export let data = [];
</script>

<Line
    data={{
        labels: labels,
        datasets: [
            {
                label: "Average heart rate",
                backgroundColor: "#f87979",
                data: data,
            },
        ],
    }}
    width={20}
    height={10}
    options={{ responsive: true }}
/>
