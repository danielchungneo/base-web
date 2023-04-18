// @ts-nocheck
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import clsx from "clsx";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsFunnel, BsLayoutThreeColumns, BsPlus } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import {
  clearSelectedRows,
  defaultColumnDefinition,
  defaultRowClassRules,
  defaultSideBar,
  defaultStatusBar,
  filterParams,
  filters as colDefFilters,
  sizeColumnsBasedOnSpaceAvailability,
} from "./AgGrid.utilities";
import Button from "../Buttons/Button/Button";
import TextField from "../Inputs/Text/TextField";
import Label from "../Label";
import { ENV } from "@/constants/config";
import _ from "lodash";

const GLOBAL_SEARCH_DEBOUNCE_TIME = 500; // Delay for onChange in the search box

const AgGrid = (props: any) => {
  const {
    results,
    loading,
    columnDefs,
    gridOptions,
    gridTheme,
    enableCreate,
    onCreate,
    enableCellClick,
    onCellClicked,
    onCellEditingStopped,
    defaultColDef,
    sideBar,
    statusBar,
    floatingFilter,
    rowClassRules,
    editOnClick,
    suppressDragLeaveHidesColumns,
    extraGridProps,
    title,
    onGridReady,
    fetchData,
    idField,
    getRowNodeId,
    frameworkComponents,
    height,
    noRowsText,
    loadingText,
    minHeight,
    customHeaderContent,
    showHeader,
    onRowSelected,
    onSelectionChanged,
    autoHeight,
    showSearchBar,
    defaultFilters,
    onBodyScroll,
    id,
    createButtonText,
    suppressScrollOnNewData,
  } = props;

  const router = useRouter();
  const mainContainerRef = useRef(null);
  const gridKey = `env=${ENV}&pathname=${router.pathname
    .split("/")
    .map((breadcrumb) => (Number(breadcrumb) ? "detail" : breadcrumb)) // Replace numbers with "detail" so gridKey can be shared between grids on detail pages
    .join("/")}${title ? `&title=${title}` : ""}`; // Added title for when a page has multiple grids, could probably use something better

  const defaultSavedFilters = {};
  const defaultSavedColumns = {};
  const defaultSavedSort = [];
  const [savedFilters, setSavedFilters] = useLocalStorage(
    `AG_GRID_FILTERS: ${gridKey}`,
    defaultSavedFilters
  );
  const [savedColumns, setSavedColumns] = useLocalStorage(
    `AG_GRID_COLUMNS: ${gridKey}`,
    defaultSavedColumns
  );
  const [savedSort, setSavedSort] = useLocalStorage(
    `AG_GRID_SORT: ${gridKey}`,
    defaultSavedSort
  );
  const [globalSearchTerm, setGlobalSearchTerm] = useLocalStorage(
    `AG_GRID_GLOBAL_SEARCH_TERM: ${gridKey}`,
    ""
  );

  /**
   * CONSTANTS FOR FILTERING AND CELL RENDERING
   */
  const cellRenderers = {
    date: (params: any, callerIsExport: any) => {
      let d = null;

      if (callerIsExport) {
        const { data, field } = params;
        d = data[field];
      } else {
        d = params.value;
      }

      if (d) {
        const date = new Date(d);
        return `${
          date.getUTCMonth() + 1
        }/${date.getUTCDate()}/${date.getUTCFullYear()}`;
      }
      return "-";
    },

    select: (params: any, callerIsExport: any) => {
      const { value } = params;
      return value;
    },
  };

  const valueFormatters = {
    percentage: (params: any, callerIsExport: any) => {
      const { value } = params;
      return (value * 100).toFixed(2);
    },
  };

  const defaultOpts = {
    datasource: null,
    overlayNoRowsTemplate: noRowsText,
    overlayLoadingTemplate: loadingText,
    frameworkComponents: {
      ...frameworkComponents,
    },
  };

  // instantiate all of the private variables
  const _gridTheme = gridTheme;
  const _defaultColDef = Object.assign(
    {},
    defaultColumnDefinition,
    defaultColDef
  );
  const _floatingFilter = floatingFilter;
  const _sideBar = sideBar || defaultSideBar;
  const _rowClassRules = Object.assign({}, defaultRowClassRules, rowClassRules);
  const _suppressDragLeaveHidesColumn = suppressDragLeaveHidesColumns;
  const _statusBar = !statusBar
    ? defaultStatusBar
    : typeof statusBar === "object"
    ? Object.assign({}, defaultStatusBar, statusBar)
    : statusBar;
  const _onCellClicked = (evt: any) => {
    const { colDef } = evt;

    /**
     * only use the callback when:
     * - the cell does not have a checkbox in it
     * - there is not already a handler for a new selection change
     * - the cell is not editable (don't wanna fire while typing or focusing)
     * - the cell click event is enabled
     */

    if (
      !colDef.checkboxSelection &&
      !onSelectionChanged &&
      !colDef.editable &&
      !colDef.cellRenderer && // disable clicks on cell renderer components
      enableCellClick
    ) {
      // ignore the click event if there is a checkbox in this cell
      onCellClicked
        ? onCellClicked(evt) // user defined
        : router.push(`${window.location.pathname}/${evt.data[idField]}`); // default event using the data row ID
    }
  };
  const _onCellEditingStopped = onCellEditingStopped;

  const _onCreate = onCreate;
  const _enableCreate = enableCreate;
  const _enableCellClick = enableCellClick;
  const _editOnClick = editOnClick;
  const _extraGridProps = extraGridProps;
  const _gridOptions = Object.assign({}, defaultOpts, gridOptions);
  const defaultFilterParams = {
    clearButton: true,
    newRowsAction: "keep",
  };

  // config short names are 'date', 'number', etc while filter names are agDateColumnFilter, etc...
  // so create a reverse lookup to find the short name of the filter in order to locate other config properties by the short name
  const reverseFilterNameLookup = Object.keys(colDefFilters).reduce(
    (acc: any, cur: any) => {
      acc[colDefFilters[cur]] = cur;
      return acc;
    },
    {}
  );

  const _columnDefs = columnDefs
    .map((cd: any) => {
      // replace any cell renderers so the data is shown correctly
      if (
        typeof cd.cellRenderer === "string" &&
        cellRenderers[cd.cellRenderer]
      ) {
        cd.cellRenderer = cellRenderers[cd.cellRenderer];
      }

      if (
        typeof cd.valueFormatter === "string" &&
        valueFormatters[cd.valueFormatter]
      ) {
        cd.valueFormatter = valueFormatters[cd.valueFormatter];
      }

      const shortFilterName = reverseFilterNameLookup[cd.filter];

      // lookup default filter params for certain filter types (e.g. date filters should get the appropriate date comparator passed automatically)
      if (filterParams[shortFilterName]) {
        cd.filterParams = {
          // auto-inject default use-case filterParams
          ...filterParams[shortFilterName],

          // override with any available filterParams passed into the column config
          ...cd.filterParams,
        };
      }

      cd.filterParams = Object.assign({}, defaultFilterParams, cd.filterParams);

      return cd;
    })
    .filter((x) => x);

  const [gridApi, setGridApi] = useState(null);

  // ref for the container, so the child can have a set height and AG grid can fill the height
  const gridContainerRef = useRef(null);

  // toggle the loading spinner in the status bar
  const updateOverlay = () => {
    // make sure the gridApi is available
    if (!gridApi) {
      return;
    }

    if (loading) {
      gridApi.showLoadingOverlay();
    } else if (!results.length) {
      gridApi.showNoRowsOverlay();
    } else {
      gridApi.hideOverlay();
    }
  };

  /**
   * setting the loading indicator when the grid is fetching
   */
  useEffect(() => {
    updateOverlay();
  }, [results, loading, gridApi]);

  /**
   * @func saveFilters
   * @desc Save the current filters to local storage
   */
  const saveFilters = (evt) => {
    setSavedFilters(evt.api.getFilterModel());
  };

  /**
   * @func restoreFilters
   * @desc Restore the saved filters from local storage
   */
  const restoreFilters = (api) => {
    api.setFilterModel(savedFilters);
  };

  /**
   * @func saveColumns
   * @desc Save the current column configuration to local storage
   */
  const saveColumns = (evt) => {
    if (
      !evt.column ||
      ["sizeColumnsToFit", "autosizeColumns"].includes(evt.source)
    ) {
      return;
    }

    const columnsToSave = { ...savedColumns };
    const {
      type,
      column: { colId, actualWidth, visible, pinned, sort },
      toIndex,
    } = evt;

    // Check if colId exists
    if (!columnsToSave[colId]) {
      columnsToSave[colId] = {};
    }

    // Update values
    columnsToSave[colId].actualWidth = actualWidth;
    columnsToSave[colId].visible = visible;
    columnsToSave[colId].pinned = pinned;
    columnsToSave[colId].sort = sort;

    // toIndex only exists when moving a column
    if (type === "columnMoved") {
      columnsToSave[colId].toIndex = toIndex;
    }

    // Save changes
    setSavedColumns(columnsToSave);
  };

  /**
   * @func restoreColumns
   * @desc Restore the saved column configuration from local storage
   */
  const restoreColumns = (api) => {
    Object.keys(savedColumns).forEach((colId) => {
      const { actualWidth, pinned, visible, toIndex } = savedColumns[colId];

      if (actualWidth) {
        api.columnController.columnApi.setColumnWidth(colId, actualWidth);
      }

      if (pinned) {
        api.columnController.columnApi.setColumnPinned(colId, pinned);
      }

      if (Number.isInteger(toIndex)) {
        api.columnController.columnApi.moveColumn(colId, toIndex);
      }

      api.columnController.columnApi.setColumnVisible(colId, Boolean(visible));
    });
  };

  /**
   * @func saveSort
   * @desc Save the sort model to local storage
   */
  const saveSort = (evt) => {
    setSavedSort(evt.api.getSortModel());
  };

  /**
   * @func restoreSort
   * @desc Restore the saved sort model from local storage
   */
  const restoreSort = (api) => {
    if (savedSort?.length) {
      api.setSortModel(savedSort);
    }
  };

  /**
   * @func _onGridReady
   * @desc a callback to run when the grid is rendered and ready for data
   * @param params grid parameters including its own API
   */
  const _onGridReady = async (params: any) => {
    const { api } = params;

    await setGridApi(api);

    if (onGridReady) {
      onGridReady(api);
    }
  };

  /**
   * @func _onFirstDataRendered
   * @desc a callback to run when the grid's data is first rendered
   * @param params grid parameters including its own API
   */
  const _onFirstDataRendered = async (params: any) => {
    await sizeColumnsBasedOnSpaceAvailability(params, { defaultFilters });
    restoreColumns(params.api);
    restoreFilters(params.api);
    restoreSort(params.api);
  };

  /**
   * @func _onSortChanged
   * @desc fires when any sort method is set or modified
   * */
  const _onSortChanged = (evt: any) => {
    saveSort(evt);
  };

  /**
   * @func _onFilterChanged
   * @desc updates persistent filters when a filter is changed
   */
  const _onFilterChanged = (evt: any) => {
    clearSelectedRows(gridApi);
    saveFilters(evt);
  };

  /**
   * @func _onColumnChange
   * @desc fires when a column is moved, resized, hidden/shown, or pinned
   * */
  const _onColumnChange = (evt: any) => {
    saveColumns(evt);
  };

  const _runGlobalSearch = useCallback(
    debounce((searchTerm: string) => {
      gridApi?.setQuickFilter(searchTerm);
    }, GLOBAL_SEARCH_DEBOUNCE_TIME),
    [gridApi]
  );

  // Run on first load if we have a global search term in local storage
  useEffect(() => {
    if (globalSearchTerm && gridApi) {
      _runGlobalSearch(globalSearchTerm);
    }
  }, [gridApi]);

  /**
   *
   * @func _onGlobalSearch
   * @desc handles the global search bar at the top of the grid
   * @param { String } searchTerm
   */
  const _onGlobalSearch = (evt: any) => {
    const searchTerm = evt.target.value;
    setGlobalSearchTerm(searchTerm);

    _runGlobalSearch(searchTerm);
  };

  const _onGlobalSearchReset = () => {
    setGlobalSearchTerm("");
    gridApi?.setQuickFilter(null);
  };

  const _resetColumns = () => {
    if (!gridApi) {
      return;
    }

    gridApi.columnController.columnApi.resetColumnState();
    sizeColumnsBasedOnSpaceAvailability(
      { api: gridApi, columnApi: gridApi.columnController.columnApi },
      { defaultFilters }
    );
    setSavedColumns(defaultSavedColumns);
  };

  const _resetFilters = () => {
    if (!gridApi) {
      return;
    }

    _onGlobalSearchReset();
    gridApi.setFilterModel(null);
    gridApi.setSortModel(null);
    gridApi.deselectAll();
    setSavedSort(defaultSavedSort);
    setSavedFilters(defaultSavedFilters);
  };

  const _onRowSelected = (params: any) => {
    typeof onRowSelected === "function" && onRowSelected(params);
  };

  const _onSelectionChanged = (params: any) => {
    typeof onSelectionChanged === "function" && onSelectionChanged(params);
  };

  const _onBodyScroll = useCallback(
    debounce((params: any) => {
      typeof onBodyScroll === "function" && onBodyScroll(params);
    }, GLOBAL_SEARCH_DEBOUNCE_TIME),
    [gridApi, onBodyScroll]
  );

  const _onCellFocused = (e: any) => {
    // this will prevent row selection when clicking on a button inside any of the Actions cell renderers (e.g. PalletActions, PurchaseOrderActions, SerialNumberActions, etc)
    const shouldBlockRowSelection =
      e.column &&
      e.column.colDef.cellRenderer &&
      typeof e.column.colDef.cellRenderer === "string" &&
      e.column.colDef.cellRenderer.includes("Actions");

    if (shouldBlockRowSelection) {
      e.api.gridOptionsWrapper.gridOptions.suppressRowClickSelection = true;
    } else {
      e.api.gridOptionsWrapper.gridOptions.suppressRowClickSelection = false;
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        minHeight: autoHeight ? 0 : minHeight,
        height: autoHeight
          ? "auto"
          : height || mainContainerRef.current?.clientHeight,
      }}
      ref={mainContainerRef}
    >
      <div
        className="w-full mb-2"
        style={{
          display: showHeader ? "unset" : "none",
        }}
      >
        <div>
          <div className="flex flex-row flex-wrap">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                padding: 0,
              }}
            >
              {typeof title === "string" ? (
                <Label variant="h4" className="mr-4 whitespace-nowrap">
                  {title}
                </Label>
              ) : (
                title
              )}
              {customHeaderContent}
            </div>

            <div style={{ display: "flex", alignItems: "center", padding: 0 }}>
              {showSearchBar && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TextField
                    form={false}
                    name="search"
                    placeholder="Search"
                    value={globalSearchTerm}
                    onChange={_onGlobalSearch}
                    className="h-[38px]"
                    disabled={loading}
                  />
                </div>
              )}

              <Button
                title="Reset Columns"
                variant={_.isEmpty(savedColumns) ? "neutral" : "danger"}
                onClick={_resetColumns}
                className="ml-2"
                size="sm"
                disabled={loading}
              >
                <BsLayoutThreeColumns />
              </Button>

              <Button
                title="Reset Filters"
                variant={
                  _.isEmpty(savedFilters) &&
                  _.isEmpty(savedSort) &&
                  !globalSearchTerm
                    ? "neutral"
                    : "danger"
                }
                onClick={_resetFilters}
                className="ml-2"
                size="sm"
                disabled={loading}
              >
                <BsFunnel />
              </Button>

              {_enableCreate && (
                <Button
                  variant="primary"
                  onClick={_onCreate}
                  title="Reset Filters"
                  className="ml-2"
                  size="sm"
                  disabled={loading}
                >
                  <div className="mr-2 hidden sm:block">
                    {createButtonText || "Add New"}
                  </div>

                  <HiPlus className="d-inline d-sm-none" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={gridContainerRef}
        style={{
          flex: autoHeight ? null : "1 1 0",
          alignSelf: "stretch",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          id={id}
          className={clsx(
            "w-100 text-left",
            _gridTheme,
            _editOnClick && "ag-grid-cell-editable",
            _enableCellClick && "ag-grid-cell-clickable"
          )}
          style={{
            height: "100%",
          }}
        >
          <AgGridReact
            // Config
            columnDefs={_columnDefs}
            gridOptions={_gridOptions}
            defaultColDef={_defaultColDef}
            floatingFilter={_floatingFilter}
            sideBar={_sideBar}
            statusBar={_statusBar}
            rowClassRules={_rowClassRules}
            suppressDragLeaveHidesColumns={_suppressDragLeaveHidesColumn}
            suppressScrollOnNewData={!!fetchData || suppressScrollOnNewData}
            domLayout={autoHeight ? "autoHeight" : "normal"}
            animateRows
            suppressDragLeaveHidesColumns // disabled rows from disappearing and dragged and dropped off of the grid
            rememberGroupStateWhenNewData // keeps groups open/other stuff configured if new data comes in and re-renders part of the grid
            getRowNodeId={getRowNodeId}
            // Event Listeners
            onFilterChanged={_onFilterChanged}
            onSortChanged={_onSortChanged}
            onGridReady={_onGridReady}
            onCellClicked={_onCellClicked}
            onRowSelected={_onRowSelected}
            onSelectionChanged={_onSelectionChanged}
            onBodyScroll={_onBodyScroll}
            onCellEditingStopped={_onCellEditingStopped}
            onCellFocused={_onCellFocused}
            onColumnMoved={_onColumnChange}
            onColumnResized={_onColumnChange}
            onColumnPinned={_onColumnChange}
            onColumnVisible={_onColumnChange}
            onFirstDataRendered={_onFirstDataRendered}
            // Data
            rowData={results}
            // Misc
            {..._extraGridProps}
          />
        </div>
      </div>
    </div>
  );
};

AgGrid.propTypes = {
  columnDefs: PropTypes.arrayOf(PropTypes.object),
  results: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  offset: PropTypes.number,
  limit: PropTypes.number,
  searchTerm: PropTypes.string,
  sort: PropTypes.array,
  filters: PropTypes.array,
  total: PropTypes.number,
  errors: PropTypes.any,
  gridOptions: PropTypes.object,
  gridTheme: PropTypes.string,
  onSave: PropTypes.func,
  defaultColDef: PropTypes.object,
  sideBar: PropTypes.any,
  statusBar: PropTypes.any,
  floatingFilter: PropTypes.any,
  rowClassRules: PropTypes.object,
  editOnClick: PropTypes.bool,
  extraGridProps: PropTypes.object,
  onGridReady: PropTypes.func,
  useDatasource: PropTypes.bool,
  datasourceUrl: PropTypes.string,
  defaultFilters: PropTypes.object,
  allowServerExport: PropTypes.bool,
  fetchData: PropTypes.func,
  loading: PropTypes.bool,
  pageNumber: PropTypes.number,
  idField: PropTypes.string.isRequired,
  enableCreate: PropTypes.bool,
  enableEdit: PropTypes.bool,
  enableDelete: PropTypes.bool,
  onCreate: PropTypes.func,
  title: PropTypes.string,
  enableCellClick: PropTypes.bool,
  onCellClicked: PropTypes.func,
  frameworkComponents: PropTypes.object,
  height: PropTypes.number,
  noRowsText: PropTypes.string,
  loadingText: PropTypes.string,
  minHeight: PropTypes.number,
  customHeaderContent: PropTypes.any,
  showHeader: PropTypes.bool,
  onRowSelected: PropTypes.func,
  onSelectionChanged: PropTypes.func,
  autoHeight: PropTypes.bool,
  showSearchBar: PropTypes.bool,
  onBodyScroll: PropTypes.func,
  id: PropTypes.string,
  suppressScrollOnNewData: PropTypes.bool,
};

AgGrid.defaultProps = {
  columnDefs: [],
  results: [],
  errors: [],
  loading: false,
  offset: 0,
  limit: 0,
  sort: [],
  searchTerm: null,
  filters: [],
  total: 0,
  gridOptions: {},
  statusBar: {},
  gridTheme: "ag-theme-alpine", // balham, material, alpine, etc
  floatingFilter: false,
  editOnClick: false,
  extraGridProps: {},
  allowBulkEditMode: false,
  useDatasource: false,
  pageNumber: 0,
  idField: "id",
  enableCreate: false,
  enableEdit: false,
  enableDelete: false,
  onCreate: (evt) => (window.location = `${window.location.href}/create`),
  title: null,
  enableCellClick: false,
  onCellClicked: null, // will get modified in the component using the `idField` prop
  frameworkComponents: {},
  height: null,
  noRowsText: null, // '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
  loadingText: null, // '<span style="font-size: 26px">Loading...</span>'
  minHeight: 600,
  customHeaderContent: null,
  showHeader: true,
  autoHeight: false,
  showSearchBar: true,
  id: "data-grid",
  suppressScrollOnNewData: false,
};

export default AgGrid;
