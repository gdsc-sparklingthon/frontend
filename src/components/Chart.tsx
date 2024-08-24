import ApexCharts from 'react-apexcharts';

const Chart = () => {
  return (
    <div>
      <ApexCharts
        type="area"
        series={[
          { data: [19, 26, 20, 9] },
          //   { name: '내일의 기온', data: [30, 26, 34, 10] },
        ]}
        options={{
          chart: {
            height: 500,
            width: 500,
          },
          colors: ['#FFA943'],
        }}
      ></ApexCharts>
    </div>
  );
};

export default Chart;
