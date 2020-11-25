import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


// import {
//     BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   } from 'recharts';



import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  
  import {Box} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name : any, calories : any, fat : any, carbs : any, protein: any) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const data = [
    {
      name: 'Page A', 2020: 4000, 2019: 2400, amt: 2400,
    },
    {
      name: 'Page B', 2020: 3000, 2019: 1398, amt: 2210,
    },
    {
      name: 'Page C', 2020: 2000, 2019: 9800, amt: 2290,
    },
    {
      name: 'Page D', 2020: 2780, 2019: 3908, amt: 2000,
    },
    {
      name: 'Page E', 2020: 1890, 2019: 4800, amt: 2181,
    },
    {
      name: 'Page F', 2020: 2390, 2019: 3800, amt: 2500,
    },
    {
      name: 'Page G', 2020: 3490, 2019: 4300, amt: 2100,
    },
  ];

export default function Test() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={5}> <h1> Resultat </h1> </TableCell>
            {/* Kan putte inn buttons for år her, husk å fjerne -1 colSpan for hver */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* <Box>
            <BarChart
            width={1000}
            height={700}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="2019" fill="white" />
            <Bar dataKey="2020" fill="#82ca9d" />
            </BarChart>
        </Box> */}
        <LineChart
        width={1000}
        height={700}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" strokeWidth = {5} dataKey="2019" stroke="#b51849" activeDot={{ r: 8 }} />
        <Line type="linear" strokeWidth = {5} dataKey="2020" stroke="#82ca9d" />
      </LineChart>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
