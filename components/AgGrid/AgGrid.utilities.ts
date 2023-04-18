// @ts-nocheck
import { formatDate, getLocalDate, getLocalDatetime } from "@/utils/date";
import { formatCurrency, isNumeric } from "@/utils/number";
import { ValueSetterParams } from "ag-grid-community";
import { formatDistanceToNowStrict } from "date-fns";

// constants for setting consistent widths in column definitions
export const gridConstants = {
  BOOLEAN_FIELD_WIDTH: 50,
  ADDRESS_FIELD_WIDTH: 300,
  DATE_FIELD_WIDTH: 175,
};

// functions to use for select inputs
export const extractValues = (mapping) => Object.keys(mapping);
export const lookupValue = (mapping, key) => mapping[key];
export const lookupKey = (mapping, name) => {
  for (const key in mapping) {
    if (mapping.hasOwnProperty(key)) {
      if (name === mapping[key]) {
        return key;
      }
    }
  }
};

export const gridStyleClasses = {
  headerCentered: "ag-grid-cell-centered",
};

export const cellClasses = {
  editable: "ag-grid-inline-editable",
  invalidValue: "ag-grid-invalid-price",
  updatedValues: "ag-grid-updated-values-cell",
  updatedValuesInvalid: "ag-grid-updated-values-invalid-cell",
};

function datetimeComparator(filterLocalDateAtMidnight, cellValue) {
  const dateAsString = getLocalDate(cellValue);

  if (dateAsString == null) {
    return 0;
  }

  const cellDate = new Date(dateAsString);

  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  }

  if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }

  return 0;
}

function dateComparator(filterLocalDateAtMidnight, cellValue) {
  const dateAsString = formatDate(cellValue, "M/dd/yy");

  if (dateAsString == null) {
    return 0;
  }

  const cellDate = new Date(dateAsString);

  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  }

  if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }

  return 0;
}

export const valueFormatters = {
  address: ({ value }) => {
    if (!value) {
      return "";
    }
    return `${value.addressLine1} ${value.addressLine2 || ""} ${value.city}, ${
      value.state
    } ${value.zip}`;
  },
  age: ({ value }) => {
    if (!value) {
      return "";
    }
    return formatDistanceToNowStrict(new Date(getLocalDatetime(value)));
  },
  currency: ({ value }) => {
    if (!value) {
      return "";
    }
    return formatCurrency(value);
  },
  date: ({ value }) => {
    if (!value) {
      return "";
    }

    return formatDate(value, "M/dd/yy");
  },
  datetime: ({ value }) => {
    if (!value) {
      return "";
    }
    return getLocalDatetime(value);
  },
  localeNumber: ({ value }) => {
    if (!isNumeric(value)) {
      return "";
    }

    return Number(value).toLocaleString();
  },
};

export const filters = {
  date: "agDateColumnFilter",
  number: "agNumberColumnFilter",
  text: "agTextColumnFilter",
  set: "agSetColumnFilter",
  boolean: "agSetColumnFilter",
};

export const filterParams = {
  date: {
    inRangeInclusive: true,
    comparator: dateComparator,
  },
  datetime: {
    inRangeInclusive: true,
    comparator: datetimeComparator,
  },
  number: {
    inRangeInclusive: true,
  },
  text: {
    //
  },
  set: {
    //
  },
  boolean: {
    //
  },
};

export const defaultColumnDefOptions = {
  boolean: {
    filter: filters.boolean,
    cellRenderer: "boolean",
    filterParams: filterParams.boolean,
    menuTabs: ["filterMenuTab"],
  },
  currency: {
    filter: filters.number,
    filterParams: filterParams.number,
    valueFormatter: valueFormatters.currency,
    menuTabs: ["filterMenuTab"],
  },
  date: {
    filter: filters.date,
    filterParams: filterParams.date,
    valueFormatter: valueFormatters.date,
    menuTabs: ["filterMenuTab"],
  },
  dateFieldDate: {
    filter: filters.date,
    filterParams: filterParams.dateFieldDate,
    valueFormatter: valueFormatters.date,
    menuTabs: ["filterMenuTab"],
  },
  datetime: {
    filter: filters.date,
    filterParams: filterParams.datetime,
    valueFormatter: valueFormatters.datetime,
    menuTabs: ["filterMenuTab"],
  },
  number: {
    filter: filters.number,
    filterParams: filterParams.number,
    menuTabs: ["filterMenuTab"],
  },
  text: {
    filter: filters.text,
    filterParams: filterParams.text,
    menuTabs: ["filterMenuTab"],
  },
  set: {
    filter: filters.set,
    filterParams: filterParams.set,
    menuTabs: ["filterMenuTab"],
  },
};

export const valueGetters = {
  datetime: ({
    api,
    colDef,
    column,
    columnApi,
    context,
    data,
    getValue,
    node,
  }) => {
    if (!data) return;

    const value = data[colDef.field];

    if (!value) {
      return "";
    }
    return getLocalDatetime(value);
  },
  booleanYesNo: ({ colDef, data }) => {
    if (!data) return;

    const value = data[colDef.field];

    return value ? "Yes" : "No";
  },
};

export const valueSetters = {
  number: (params: ValueSetterParams) => {
    const {
      newValue,
      colDef: { field },
    } = params;
    const parsedValue = Number(newValue);

    if (Number.isNaN(parsedValue)) {
      return false;
    }

    params.data[field] = parsedValue;
    return true;
  },

  positiveNumber: (params: ValueSetterParams) => {
    const {
      newValue,
      colDef: { field },
    } = params;
    const parsedValue = Number(newValue);

    if (Number.isNaN(parsedValue) || parsedValue < 0) {
      return false;
    }

    params.data[field] = parsedValue;
    return true;
  },
};

// create default values (these values will be used with Object.assign() to add to any values passed in)
export const defaultColumnDefinition = {
  editable: false, // manually assign a column as editable to protect data
  sortable: true,
  filter: true,
  resizable: true,
  filter: "agTextColumnFilter",
  filterParams: {
    resetButton: true,
    debounceMs: 500,
  },
  enableRowGroup: false,
  enablePivot: false,
  pin: false,
  pinning: false,
  pinnable: false,
  enablePin: false,
  enablePinning: false,
  enablePinnable: false,
  headerCheckboxSelectionFilteredOnly: true,
  groupSelectsFiltered: true,
};

export const defaultSideBar = {
  toolPanels: [
    {
      id: "columns",
      labelDefault: "Columns",
      labelKey: "columns",
      iconKey: "columns",
      toolPanel: "agColumnsToolPanel",
      toolPanelParams: {
        suppressRowGroups: true,
        suppressValues: true,
        suppressPivots: true,
        suppressPivotMode: true,
        suppressSideButtons: true,
        suppressColumnFilter: true,
        suppressColumnSelectAll: true,
        suppressColumnExpandAll: true,
      },
    },
    {
      id: "filters",
      labelDefault: "Filters",
      labelKey: "filters",
      iconKey: "filter",
      toolPanel: "agFiltersToolPanel",
    },
  ],
  defaultToolPanel: "",
};

export const defaultRowClassRules = {
  "ag-grid-row-edited": (params) => params.data && params.data.edited,
};

export const defaultStatusBar = {
  // statusPanels,
  statusPanels: [
    {
      statusPanel: "agTotalRowCountComponent",
      align: "left",
    },
    { statusPanel: "agFilteredRowCountComponent" },
    { statusPanel: "agSelectedRowCountComponent" },
    { statusPanel: "agAggregationComponent" },
  ],
};

export const actionsPanelCellRendererColumnProps = {
  headerClass: gridStyleClasses.headerCentered,
  filter: false,
  sort: false,
  lockPinned: true,
  suppressSizeToFit: true,
};

export const clearGridFilters = (api) => {
  if (!api) return;

  api.setFilterModel(null);
  api.setSortModel(null);
};

export const getSelectedRowIds = (api, idField, idsOnly = false) => {
  if (!api) return;

  const nodes = api.getSelectedNodes();

  if (!idsOnly) {
    return nodes;
  }

  return nodes
    .map((node) => node.data[idField])
    .reduce((acc, cur) => {
      if (!acc.includes(cur)) acc.push(cur);
      return acc;
    }, []);
};

/**
 * @func clearCustomColumnConfig
 * @desc gets the following states and clears them:
 * active filters,
 * active sorts,
 * active column pinning, resizing, and moving,
 */
export const clearCustomColumnConfig = (api) => {
  if (!api) return;

  api.columnController.columnApi.resetColumnState();
};

export const setGridFilterModel = (api, filters) => {
  if (!api) return;

  api.setFilterModel(filters);
};

export const setGridSortModel = (api, model) => {
  if (!api) return;

  api.setSortModel(model);
};

export const clearSelectedRows = async (api) => {
  if (!api) return;

  api.deselectAll();
};

export const toggleRowSelected = async (
  api,
  { selectedItem, rowKeyField, shouldBeSelected, clearAllSelected = false }
) => {
  if (!api) return;

  try {
    // if clearAllSelected, unselect all rows before selecting the new one
    if (clearAllSelected) {
      clearSelectedRows(api, rowKeyField);
    }

    // set the new row as selected
    await api
      .getRowNode(selectedItem[rowKeyField])
      .setSelected(shouldBeSelected);
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

export const getDisplayedColumns = async (api, ignoreFieldsList = []) => {
  if (!api) return;

  const requestedColumns = await api.columnController.allDisplayedColumns
    .map((col) => col.colDef.field)
    .filter((field) => !!field && !ignoreFieldsList.includes(field)); // filters out undefined (like a checkbox only column) and any fields the user specifies should not get returned

  return requestedColumns;
};

export const getAllGridNodes = (api) => {
  if (!api) return [];

  let rows = [];
  api.forEachNode((node) => (rows = rows.concat(node)));
  return rows;
};

export const customAggFunc = (colDefs = [], data = []) => {
  const dataGroupedByColDefField = colDefs.reduce((acc, cur) => {
    acc[cur.field] =
      typeof cur.aggFunc === "function"
        ? cur.aggFunc(data.map((d) => d[cur.field]))
        : null;
    return acc;
  }, {});

  return [dataGroupedByColDefField];
};

export const aggFuncs = {
  // sum: 'sum',
  sum: (values) => values.reduce((acc, cur) => acc + (Number(cur) || 0), 0),
  first: (values) => (values.length ? values[0] : null),
  last: (values) => (values.length ? values.slice(-1)[0] : null),
  makesAndModels: (values) => {
    const unique = Array.from(new Set(values)).filter(Boolean);

    return !unique.length
      ? "" // show nothing
      : unique.length === 1 // show the first no matter the length
      ? unique[0]
      : unique.join(",").length < 25 // show if the string isn't too long
      ? unique.join(",")
      : "Mixed"; // default
  },

  showIfSame: (values) => {
    const unique = Array.from(new Set(values));

    return unique.length !== 1 ? "" : unique[0];
  },
};

/**
 * @func
 * @desc handle resizing cell renderers on body scroll
 * @param {*} params
 * @param {*} actionKeys
 *
 * @instructions in order to use this, the following must be set:
 * - column definition:
 *    * suppressSizeToFit
 *    * getCellRendererWidthOnBodyScroll - callback to find the width of each individual cell renderer
 */
export const cellRendererBodyScrollSizingFunction = (params, columns = []) => {
  const { api, columnApi } = params;

  try {
    columns.forEach((column) => {
      const columnCellRenderers = api.getCellRendererInstances({
        columns: [column],
      });

      let maxWidth = Math.max(
        ...columnCellRenderers.map((x) =>
          column.colDef.cellRendererParams?.getCellRendererWidthOnBodyScroll(x)
        ),
        0
      );

      // if (!maxWidth) {
      //   maxWidth = Math.max(...columnCellRenderers.map(x => column.colDef.getCellRendererWidthOnBodyScroll(x)), 0);
      // }

      maxWidth = !!maxWidth ? maxWidth + 60 : 100; // set a min width of 100 for the column if nothing is rendered

      // set the new width on the column
      columnApi.setColumnWidth(column.colId, maxWidth);
    });

    // resize the remaining columns based on initial sizing
    sizeColumnsBasedOnSpaceAvailability(params);
  } catch (e) {
    console.log(e);
  }
};

export const sizeColumnsBasedOnSpaceAvailability = async (
  params,
  { defaultFilters } = {}
) => {
  // find columns to resize
  const columnKeysToResize =
    params.columnApi.columnController.allDisplayedColumns
      .filter((c) => !c.colDef.suppressAutoSize)
      .map((c) => c.colId)
      .filter((x) => x);

  params.columnApi.autoSizeColumns(columnKeysToResize);

  const { eFullWidthContainer } = params.api.gridPanel;

  const spaceTakenByColumns = params.columnApi
    .getAllColumns()
    .map((c) => c.actualWidth)
    .reduce((acc, cur) => acc + cur, 0);

  // if the space taken up by the columns is greater than the available space, then don't touch the columns
  // if the space taken up by the columns is less than the available space, fit them to the remaining space
  if (spaceTakenByColumns < eFullWidthContainer.clientWidth) {
    params.api.sizeColumnsToFit();
  }

  if (defaultFilters) {
    params.api.setFilterModel(defaultFilters);
  }
};

/**
 * @function
 * @desc find max width of the rendered actions panel cell renderers
 */
export const getMaxActionsPanelWidth = (cellRenderer) =>
  Array.from(
    cellRenderer.eParentElement.children[0].children[0].children
  ).reduce((acc, cur) => acc + cur.scrollWidth, 0);
