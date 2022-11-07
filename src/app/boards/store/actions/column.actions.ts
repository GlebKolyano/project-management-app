import { createAction, props } from '@ngrx/store';
import { IColumn } from '../../models/boards.models';
import {
  ColumnActions,
  CreateColumnProps,
  DeleteColumnProps,
  UpdateColumnProps,
} from '../models/column.models';

const getColumns = createAction(ColumnActions.GET_COLUMNS, props<{ idBoard: string }>());
const getColumnsSuccess = createAction(
  ColumnActions.GET_COLUMNS_SUCCESS,
  props<{ columns: IColumn[] }>(),
);
const getColumnsError = createAction(ColumnActions.GET_COLUMNS_ERROR, props<{ error: string }>());

const createColumn = createAction(
  ColumnActions.CREATE_COLUMN,
  props<{ props: CreateColumnProps }>(),
);
const createColumnSuccess = createAction(
  ColumnActions.CREATE_COLUMN_SUCCESS,
  props<{ newColumn: IColumn }>(),
);
const createColumnError = createAction(
  ColumnActions.CREATE_COLUMN_ERROR,
  props<{ error: string }>(),
);

const deleteColumn = createAction(
  ColumnActions.DELETE_COLUMN,
  props<{ props: DeleteColumnProps }>(),
);
const deleteColumnSuccess = createAction(
  ColumnActions.DELETE_COLUMN_SUCCESS,
  props<{ idColumn: string }>(),
);
const deleteColumnError = createAction(
  ColumnActions.DELETE_COLUMN_ERROR,
  props<{ error: string }>(),
);

const updateColumn = createAction(
  ColumnActions.UPDATE_COLUMN,
  props<{ props: UpdateColumnProps }>(),
);
const updateColumnSuccess = createAction(
  ColumnActions.UPDATE_COLUMN_SUCCESS,
  props<{ updatedColumn: IColumn }>(),
);
const updateColumnError = createAction(
  ColumnActions.UPDATE_COLUMN_ERROR,
  props<{ error: string }>(),
);

export {
  getColumns,
  getColumnsSuccess,
  getColumnsError,
  createColumn,
  createColumnSuccess,
  createColumnError,
  deleteColumn,
  deleteColumnSuccess,
  deleteColumnError,
  updateColumn,
  updateColumnSuccess,
  updateColumnError,
};
