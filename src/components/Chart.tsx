import ApexCharts from 'react-apexcharts';

interface SeriesData {
  name: string;
  data: number[];
}

interface ChartProps {
  series: SeriesData[];
}

const Chart = ({ series }: ChartProps) => {
  return (
    <div>
      <ApexCharts
        type="area"
        series={series}
        options={{
          chart: {
            height: 300,
            width: 500,
          },
          colors: ['#FFA943'],
        }}
      ></ApexCharts>
    </div>
  );
};

export default Chart;
