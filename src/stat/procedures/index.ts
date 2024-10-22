import { GetDepartmentsStatProcedure } from './get-departments-stat.procedure';
import { GetEmployeesStatProcedure } from './get-employees-stat.procedure';
import { GetPaymentStatProcedure } from './get-payment-stat.procedure';
import { GetReclamationOrdersStatProcedure } from './get-reclamation-orders-stat.procedure';
import { GetUsersStatProcedure } from './get-users-stat.procedure';
import { GetStoppedOrdersStatProcedure } from './get-stopped-orders-stat.procedure';
import { GetUserDetailedStatProcedure } from './get-user-detailed-stat.procedure';

export const statProcedures = [
  GetUserDetailedStatProcedure,
  GetUsersStatProcedure,
  GetDepartmentsStatProcedure,
  GetEmployeesStatProcedure,
  GetPaymentStatProcedure,
  GetStoppedOrdersStatProcedure,
  GetReclamationOrdersStatProcedure,
];
