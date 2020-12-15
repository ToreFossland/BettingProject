import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { loadBookies, loadExchanges, loadWallets } from '../redux/actions/bankActions';
import { IBankList, IBankReduxProps, IExistingBookie, IExistingExchange, IExistingWallet } from "../types/interfaces"
import { connect, useSelector } from 'react-redux';
import { RootState } from "../redux/reducers"

const TAX_RATE = 0.07;

/* const rows: RowsProp = [
  {
    id: "",
  },

];
 */
const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

function ccyFormat(num: any) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: any, unit: any) {
  return qty * unit;
}

function createRow(desc: any, qty: any, unit: any) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items: any) {
  return items.map(({ price }: any) => price).reduce((sum: any, i: any) => sum + i, 0);
}


const SpanningTable = () => {

  const classes = useStyles();

  const { bookies } = useSelector((state: RootState) => state.bank);
  const { wallets } = useSelector((state: RootState) => state.bank);;
  const { exchanges } = useSelector((state: RootState) => state.bank);

  const totBookieBalance = bookies.map((el: IExistingBookie) => el.balance).reduce((a: number, b: number) => a.valueOf() + b.valueOf(), 0).valueOf()
  const totExchangeBalance = exchanges.map((el: IExistingExchange) => el.balance).reduce((a: number, b: number) => a.valueOf() + b.valueOf(), 0).valueOf()
  const totWalletBalance = wallets.map((el: IExistingWallet) => el.balance).reduce((a: number, b: number) => a.valueOf() + b.valueOf(), 0).valueOf()

  const rows = [
    createRow('Bookies', totBookieBalance, 1.15), 
    createRow('Exchanges', totExchangeBalance, 45.99),
    createRow('E-Wallets', totWalletBalance, 17.99),
  ];

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer style={{ width: 600, height: 400 }} component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Balance
            </TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Deposits </TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Withdrawals</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state: IBankReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  bank: state.bank
});

export default connect(mapStateToProps, { loadBookies, loadExchanges, loadWallets })(SpanningTable);
