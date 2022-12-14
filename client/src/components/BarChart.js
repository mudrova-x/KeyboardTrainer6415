import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
   responsive: true,
   plugins: {
     legend: {
       display: false,
     },
     title: {
       display: true,
       text: 'Количество ошибок %',
     },
   }
 };

const labels = ['Exercise 1', 'Exercise 2', 'Exercise 3', 'Exercise 4', 'Exercise 5', 'Exercise 6', 'Exercise 7'];

export const data = {
  labels,
  datasets: [
    {
      data: [1, 2, 3, 4, 5, 6, 7],//labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgb(0, 0, 0)',
    }
  ],
};

const formData = () => {
  console.log('data form!')
}


export const BarChart = () => {
  formData();
  return (
      <div>
         <Bar options={options} data={data} />;
      </div>
   )
}