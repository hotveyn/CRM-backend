import { GetOrderStagesProcedure } from './get-order-stages.procedure';
import { GetOrdersProcedure } from './get-orders.procedure';
import { MarkOrderAsBreakProcedure } from './mark-as-break.procedure';

export const ordersProcedures = [
  GetOrdersProcedure,
  MarkOrderAsBreakProcedure,
  GetOrderStagesProcedure,
];
